import Link from "next/link"
import { prisma } from "@/lib/db"
import AddQuestionForm from "./AddQuestionForm"
import AddFlashcardForm from "./AddFlashcardForm"

export default async function AdminPage() {
  const books = await prisma.book.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      chapters: { orderBy: { sortOrder: "asc" } },
    },
  })

  const totalQ = await prisma.question.count()
  const totalF = await prisma.flashcard.count()

  const chapters = books.flatMap((b) =>
    b.chapters.map((ch) => ({
      id: ch.id,
      label: `[${b.shortTitle}] Ch.${ch.chapterNumber} · ${ch.title}`,
    }))
  )

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm text-[#6b7280] hover:text-[#1a4a8a] mb-4 inline-block">← Home</Link>
      <h1 className="text-2xl font-bold text-[#1a1a1a] mb-1">Admin</h1>
      <p className="text-sm text-[#6b7280] mb-6">{totalQ} questions · {totalF} flashcards in database</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-base font-semibold text-[#1a1a1a] mb-4">Add Question</h2>
          <AddQuestionForm chapters={chapters} />
        </section>

        <div className="border-t border-[#e5e7eb]" />

        <section>
          <h2 className="text-base font-semibold text-[#1a1a1a] mb-4">Add Flashcard</h2>
          <AddFlashcardForm chapters={chapters} />
        </section>
      </div>
    </main>
  )
}
