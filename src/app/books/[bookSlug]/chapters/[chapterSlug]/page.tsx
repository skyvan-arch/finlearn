import Link from "next/link"
import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function ChapterPage({ params }: { params: Promise<{ bookSlug: string; chapterSlug: string }> }) {
  const { bookSlug, chapterSlug } = await params

  const book = await prisma.book.findUnique({ where: { slug: bookSlug } })
  if (!book) notFound()

  const chapter = await prisma.chapter.findUnique({
    where: { bookId_slug: { bookId: book.id, slug: chapterSlug } },
    include: { progress: true, _count: { select: { questions: true, flashcards: true } } },
  })
  if (!chapter) notFound()

  const prog = chapter.progress[0]
  const lessonDone = prog?.lessonCompleted ?? false
  const bestScore = prog?.quizBestScore
  const attempts = prog?.quizAttempts ?? 0
  const base = `/books/${bookSlug}/chapters/${chapterSlug}`

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <Link href={`/books/${bookSlug}`} className="text-sm mb-4 inline-block hover:text-hull" style={{ color: "var(--c-muted)" }}>
        ← {book.shortTitle}
      </Link>

      <div className="mb-6">
        <div className="text-xs mb-1" style={{ color: "var(--c-muted)" }}>Chapter {chapter.chapterNumber}</div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--c-ink)" }}>{chapter.title}</h1>
        {chapter.partTitle && <p className="text-sm mt-1" style={{ color: "var(--c-muted)" }}>{chapter.partTitle}</p>}
      </div>

      <div className="space-y-3">
        {/* Lesson */}
        <Link href={`${base}/lesson`} className="block">
          <div className="rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow border" style={{ backgroundColor: "var(--c-card)", borderColor: "var(--c-border)" }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: lessonDone ? "#dcfce7" : "#eff6ff" }}>
              <span className="text-xl">{lessonDone ? "✓" : "📖"}</span>
            </div>
            <div className="flex-1">
              <div className="font-semibold" style={{ color: "var(--c-ink)" }}>Lesson</div>
              <div className="text-sm" style={{ color: "var(--c-muted)" }}>{lessonDone ? "Completed · ~" : "~"}{chapter.estimatedMins} min read</div>
            </div>
            <svg className="w-5 h-5" style={{ color: "var(--c-dim)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* Flashcards */}
        <Link href={`${base}/flashcards`} className="block">
          <div className="rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow border" style={{ backgroundColor: "var(--c-card)", borderColor: "var(--c-border)" }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#fef9c3" }}>
              <span className="text-xl">🃏</span>
            </div>
            <div className="flex-1">
              <div className="font-semibold" style={{ color: "var(--c-ink)" }}>Flashcards</div>
              <div className="text-sm" style={{ color: "var(--c-muted)" }}>{chapter._count.flashcards} cards</div>
            </div>
            <svg className="w-5 h-5" style={{ color: "var(--c-dim)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* Quiz */}
        <Link href={`${base}/quiz`} className="block">
          <div className="rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow border" style={{ backgroundColor: "var(--c-card)", borderColor: "var(--c-border)" }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#fce7f3" }}>
              <span className="text-xl">🧠</span>
            </div>
            <div className="flex-1">
              <div className="font-semibold" style={{ color: "var(--c-ink)" }}>Quiz</div>
              <div className="text-sm" style={{ color: "var(--c-muted)" }}>
                {chapter._count.questions} questions
                {attempts > 0 && bestScore !== null && bestScore !== undefined && <> · Best: {Math.round(bestScore * 100)}%</>}
              </div>
            </div>
            <svg className="w-5 h-5" style={{ color: "var(--c-dim)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>
    </main>
  )
}
