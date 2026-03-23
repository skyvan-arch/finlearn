"use server"

import { prisma } from "./db"
import { revalidatePath } from "next/cache"

// ── Streak ───────────────────────────────────────────────────────────────────

async function updateStreak() {
  const now = new Date()
  const todayStr = now.toISOString().slice(0, 10) // "YYYY-MM-DD"

  const streak = await prisma.userStreak.findUnique({ where: { id: 1 } })

  if (!streak) {
    await prisma.userStreak.create({ data: { id: 1, currentStreak: 1, longestStreak: 1, lastActivityDate: now } })
    return
  }

  const lastStr = streak.lastActivityDate ? streak.lastActivityDate.toISOString().slice(0, 10) : null

  if (lastStr === todayStr) return // already counted today

  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().slice(0, 10)

  const newStreak = lastStr === yesterdayStr ? streak.currentStreak + 1 : 1
  const longest = Math.max(newStreak, streak.longestStreak)

  await prisma.userStreak.update({
    where: { id: 1 },
    data: { currentStreak: newStreak, longestStreak: longest, lastActivityDate: now },
  })
}

// ── Progress ────────────────────────────────────────────────────────────────

export async function markLessonComplete(chapterId: number) {
  await prisma.chapterProgress.upsert({
    where: { chapterId },
    update: { lessonCompleted: true, lessonCompletedAt: new Date(), lastActivityAt: new Date() },
    create: { chapterId, lessonCompleted: true, lessonCompletedAt: new Date(), lastActivityAt: new Date() },
  })
  await updateStreak()
  revalidatePath("/")
  revalidatePath("/books/[bookSlug]", "page")
}

// ── Quiz ────────────────────────────────────────────────────────────────────

export async function submitQuizSession(
  chapterId: number,
  chapterSlug: string,
  answers: { questionId: number; userAnswer: string; isCorrect: boolean; timeSpentMs?: number }[]
) {
  const score = answers.filter((a) => a.isCorrect).length / answers.length

  const session = await prisma.quizSession.create({
    data: {
      chapterId,
      chapterSlug,
      completedAt: new Date(),
      score,
      totalQ: answers.length,
      answers: {
        create: answers.map((a) => ({
          questionId: a.questionId,
          userAnswer: a.userAnswer,
          isCorrect: a.isCorrect,
          timeSpentMs: a.timeSpentMs ?? null,
        })),
      },
    },
  })

  // Update chapter progress
  const existing = await prisma.chapterProgress.findUnique({ where: { chapterId } })
  const bestScore = existing?.quizBestScore
  await prisma.chapterProgress.upsert({
    where: { chapterId },
    update: {
      quizAttempts: { increment: 1 },
      quizBestScore: bestScore === null || bestScore === undefined || score > bestScore ? score : bestScore,
      lastActivityAt: new Date(),
    },
    create: {
      chapterId,
      quizAttempts: 1,
      quizBestScore: score,
      lastActivityAt: new Date(),
    },
  })

  await updateStreak()
  revalidatePath(`/books/[bookSlug]/chapters/${chapterSlug}`, "page")
  return { sessionId: session.id, score }
}

// ── Flashcards ───────────────────────────────────────────────────────────────

export async function updateFlashcardInterval(
  cardId: number,
  quality: 0 | 1 | 2 | 3 | 4 | 5 // SM-2 quality rating
) {
  const card = await prisma.flashcard.findUnique({ where: { id: cardId } })
  if (!card) return

  let { easeFactor, interval, repetitions } = card

  if (quality < 3) {
    // Failed: restart
    repetitions = 0
    interval = 0
  } else {
    // Passed
    if (repetitions === 0) interval = 1
    else if (repetitions === 1) interval = 6
    else interval = Math.round(interval * easeFactor)
    repetitions += 1
  }

  easeFactor = Math.max(1.3, easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  const nextReview = new Date()
  nextReview.setDate(nextReview.getDate() + interval)

  await prisma.flashcard.update({
    where: { id: cardId },
    data: { easeFactor, interval, repetitions, nextReview },
  })
  await updateStreak()
}

// ── Admin: Add Question ──────────────────────────────────────────────────────

export async function addQuestion(formData: FormData) {
  const chapterId = parseInt(formData.get("chapterId") as string)
  const questionType = formData.get("questionType") as string
  const difficulty = formData.get("difficulty") as string
  const stem = (formData.get("stem") as string).trim()
  const explanation = (formData.get("explanation") as string).trim()
  const sourceRef = (formData.get("sourceRef") as string | null) ?? undefined
  const tags = (formData.get("tags") as string | null)?.split(",").map((t) => t.trim()).filter(Boolean) ?? []

  let answerData: string
  if (questionType === "MCQ") {
    const choices = [
      formData.get("choice0"),
      formData.get("choice1"),
      formData.get("choice2"),
      formData.get("choice3"),
    ].filter(Boolean) as string[]
    const correctIndex = parseInt(formData.get("correctIndex") as string)
    answerData = JSON.stringify({ choices, correctIndex })
  } else if (questionType === "TRUE_FALSE") {
    const correct = formData.get("tfAnswer") === "true"
    answerData = JSON.stringify({ correct })
  } else {
    const accepted = (formData.get("accepted") as string).split("|").map((s) => s.trim())
    answerData = JSON.stringify({ accepted })
  }

  await prisma.question.create({
    data: {
      chapterId,
      questionType,
      difficulty,
      stem,
      explanation,
      answerData,
      sourceRef: sourceRef ?? null,
      tags: JSON.stringify(tags),
    },
  })

  revalidatePath("/admin")
}

// ── Admin: Add Flashcard ─────────────────────────────────────────────────────

export async function addFlashcard(formData: FormData) {
  const chapterId = parseInt(formData.get("chapterId") as string)
  const front = (formData.get("front") as string).trim()
  const back = (formData.get("back") as string).trim()
  const tags = (formData.get("tags") as string | null)?.split(",").map((t) => t.trim()).filter(Boolean) ?? []

  const count = await prisma.flashcard.count({ where: { chapterId } })
  await prisma.flashcard.create({
    data: { chapterId, front, back, tags: JSON.stringify(tags), sortOrder: count },
  })
  revalidatePath("/admin")
}
