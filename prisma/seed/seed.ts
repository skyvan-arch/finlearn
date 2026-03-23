import { PrismaClient } from "@prisma/client"
import { books } from "./books"
import { hullChapters } from "./chapters-hull"
import { rebonatoChapters } from "./chapters-rebonato"
import { hullQuestionsBySlug } from "./questions-hull"
import { rebonatoQuestionsBySlug } from "./questions-rebonato"
import { flashcardsBySlug } from "./flashcards"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting seed...")

  // 1. Upsert books
  const hullBook = await prisma.book.upsert({
    where: { slug: "hull" },
    update: {},
    create: books.find((b) => b.slug === "hull")!,
  })
  const rebonatoBook = await prisma.book.upsert({
    where: { slug: "rebonato" },
    update: {},
    create: books.find((b) => b.slug === "rebonato")!,
  })
  console.log(`✅ Books: Hull (id=${hullBook.id}), Rebonato (id=${rebonatoBook.id})`)

  // 2. Seed Hull chapters
  const hullChapterIds: Record<string, number> = {}
  for (const ch of hullChapters) {
    const created = await prisma.chapter.upsert({
      where: { bookId_chapterNumber: { bookId: hullBook.id, chapterNumber: ch.chapterNumber } },
      update: { title: ch.title, lessonContent: ch.lessonContent },
      create: { ...ch, bookId: hullBook.id },
    })
    hullChapterIds[ch.slug] = created.id
  }
  console.log(`✅ Hull chapters: ${hullChapters.length} chapters seeded`)

  // 3. Seed Rebonato chapters
  const rebChapterIds: Record<string, number> = {}
  for (const ch of rebonatoChapters) {
    const created = await prisma.chapter.upsert({
      where: { bookId_chapterNumber: { bookId: rebonatoBook.id, chapterNumber: ch.chapterNumber } },
      update: { title: ch.title, lessonContent: ch.lessonContent },
      create: { ...ch, bookId: rebonatoBook.id },
    })
    rebChapterIds[ch.slug] = created.id
  }
  console.log(`✅ Rebonato chapters: ${rebonatoChapters.length} chapters seeded`)

  // 4. Seed Hull questions
  let hullQCount = 0
  for (const [slug, questions] of Object.entries(hullQuestionsBySlug)) {
    const chapterId = hullChapterIds[slug]
    if (!chapterId) { console.warn(`⚠️  No chapter found for slug: ${slug}`); continue }
    for (const q of questions) {
      await prisma.question.create({ data: { ...q, chapterId } })
      hullQCount++
    }
  }
  console.log(`✅ Hull questions: ${hullQCount} questions seeded`)

  // 5. Seed Rebonato questions
  let rebQCount = 0
  for (const [slug, questions] of Object.entries(rebonatoQuestionsBySlug)) {
    const chapterId = rebChapterIds[slug]
    if (!chapterId) { console.warn(`⚠️  No chapter found for slug: ${slug}`); continue }
    for (const q of questions) {
      await prisma.question.create({ data: { ...q, chapterId } })
      rebQCount++
    }
  }
  console.log(`✅ Rebonato questions: ${rebQCount} questions seeded`)

  // 6. Seed flashcards (Hull)
  let flashCount = 0
  for (const [slug, cards] of Object.entries(flashcardsBySlug)) {
    const chapterId = hullChapterIds[slug] ?? rebChapterIds[slug]
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
  console.log(`   Books: 2 | Chapters: ${hullChapters.length + rebonatoChapters.length} | Questions: ${hullQCount + rebQCount} | Flashcards: ${flashCount}`)
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1) })
