import Link from "next/link"
import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import InterviewEngine from "@/components/interview/InterviewEngine"

export default async function InterviewPage({
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
      <Link href={`/books/${bookSlug}/chapters/${chapterSlug}`} className="text-sm mb-4 inline-block" style={{ color: "var(--c-muted)" }}>
        ← {chapter.title}
      </Link>
      <div className="mb-6">
        <h1 className="text-xl font-bold" style={{ color: "var(--c-ink)" }}>Interview Mode</h1>
        <p className="text-sm mt-1" style={{ color: "var(--c-muted)" }}>Answer without hints. Recall first, then reveal.</p>
      </div>
      <InterviewEngine
        chapterId={chapter.id}
        chapterSlug={chapterSlug}
        bookSlug={bookSlug}
        bookColor={book.coverColor}
      />
    </main>
  )
}
