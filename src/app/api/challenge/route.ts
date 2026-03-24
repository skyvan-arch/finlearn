import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(req: NextRequest) {
  const limit = req.nextUrl.searchParams.get("limit")

  const questions = await prisma.question.findMany({
    where: { isActive: true },
    include: { chapter: { include: { book: true } } },
  })

  const shuffled = questions.sort(() => Math.random() - 0.5)
  const slice = limit === "all" ? shuffled : shuffled.slice(0, 10)

  return NextResponse.json({
    questions: slice.map((q) => ({
      id: q.id,
      questionType: q.questionType,
      difficulty: q.difficulty,
      stem: q.stem,
      explanation: q.explanation,
      answerData: q.answerData,
      sourceRef: q.sourceRef,
      chapterTitle: q.chapter.title,
      chapterSlug: q.chapter.slug,
      bookTitle: q.chapter.book.shortTitle,
      bookSlug: q.chapter.book.slug,
      bookColor: q.chapter.book.coverColor,
    })),
  })
}
