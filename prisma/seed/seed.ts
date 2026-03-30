import { PrismaClient } from "@prisma/client"
import { books } from "./books"
import { hullChapters } from "./chapters-hull"
import { rebonatoChapters } from "./chapters-rebonato"
import { tuckmanChapters } from "./chapters-tuckman"
import { hullRiskChapters } from "./chapters-hull-risk"
import { damodaranChapters } from "./chapters-damodaran"
import { wilmottChapters } from "./chapters-wilmott"
import { hullQuestionsBySlug } from "./questions-hull"
import { rebonatoQuestionsBySlug } from "./questions-rebonato"
import { tuckmanQuestionsBySlug } from "./questions-tuckman"
import { hullRiskQuestionsBySlug } from "./questions-hull-risk"
import { damodaranQuestionsBySlug } from "./questions-damodaran"
import { wilmottQuestionsBySlug } from "./questions-wilmott"
import { flashcardsBySlug } from "./flashcards"

const prisma = new PrismaClient()

async function seedBook(slug: string, chapters: any[], questionsBySlug: Record<string, any[]>) {
  const bookData = books.find((b) => b.slug === slug)!
  const book = await prisma.book.upsert({ where: { slug }, update: {}, create: bookData })

  const chapterIds: Record<string, number> = {}
  for (const ch of chapters) {
    const created = await prisma.chapter.upsert({
      where: { bookId_chapterNumber: { bookId: book.id, chapterNumber: ch.chapterNumber } },
      update: { title: ch.title, lessonContent: ch.lessonContent, theme: ch.theme ?? "foundations" },
      create: { ...ch, bookId: book.id },
    })
    chapterIds[ch.slug] = created.id
  }

  let qCount = 0
  for (const [chSlug, questions] of Object.entries(questionsBySlug)) {
    const chapterId = chapterIds[chSlug]
    if (!chapterId) { console.warn(`⚠️  No chapter for slug: ${chSlug}`); continue }
    for (const q of questions) {
      await prisma.question.create({ data: { ...q, chapterId } })
      qCount++
    }
  }

  console.log(`✅ ${slug}: ${chapters.length} chapters, ${qCount} questions`)
  return { book, chapterIds, qCount }
}

async function main() {
  console.log("🌱 Starting seed...")

  const { chapterIds: hullIds } = await seedBook("hull", hullChapters, hullQuestionsBySlug)
  const { chapterIds: rebIds } = await seedBook("rebonato", rebonatoChapters, rebonatoQuestionsBySlug)
  await seedBook("tuckman", tuckmanChapters, tuckmanQuestionsBySlug)
  await seedBook("hull-risk", hullRiskChapters, hullRiskQuestionsBySlug)
  await seedBook("damodaran", damodaranChapters, damodaranQuestionsBySlug)
  await seedBook("wilmott", wilmottChapters, wilmottQuestionsBySlug)

  // Flashcards (Hull + Rebonato)
  let flashCount = 0
  for (const [slug, cards] of Object.entries(flashcardsBySlug)) {
    const chapterId = hullIds[slug] ?? rebIds[slug]
    if (!chapterId) { console.warn(`⚠️  No chapter for flashcard slug: ${slug}`); continue }
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i]
      await prisma.flashcard.create({
        data: { front: card.front, back: card.back, tags: JSON.stringify(card.tags), sortOrder: i, chapterId },
      })
      flashCount++
    }
  }
  console.log(`✅ Flashcards: ${flashCount} cards seeded`)
  console.log(`\n🎉 Seed complete!`)
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1) })
