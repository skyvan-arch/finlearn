import Link from "next/link"
import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import QuizEngine from "@/components/quiz/QuizEngine"

export default async function QuizPage({
  params,
}: {
  params: Promise<{ bookSlug: string; chapterSlug: string }>
}) {
  const { bookSlug, chapterSlug } = await params

  const book = await prisma.book.findUnique({ where: { slug: bookSlug } })
  if (!book) notFound()

  const chapter = await prisma.chapter.findUnique({
    where: { bookId_slug: { bookId: book.id, slug: chapterSlug } },
  })
  if (!chapter) notFound()

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <Link href={`/books/${bookSlug}/chapters/${chapterSlug}`} className="text-sm text-[#6b7280] hover:text-[#1a4a8a] mb-4 inline-block">
        ← {chapter.title}
      </Link>
      <h1 className="text-xl font-bold text-[#1a1a1a] mb-6">Quiz</h1>
      <QuizEngine
        chapterId={chapter.id}
        chapterSlug={chapterSlug}
        bookSlug={bookSlug}
        bookColor={book.coverColor}
      />
    </main>
  )
}
