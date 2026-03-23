import Link from "next/link"
import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function BookPage({ params }: { params: Promise<{ bookSlug: string }> }) {
  const { bookSlug } = await params
  const book = await prisma.book.findUnique({
    where: { slug: bookSlug },
    include: {
      chapters: {
        orderBy: { sortOrder: "asc" },
        include: {
          progress: true,
          _count: { select: { questions: true, flashcards: true } },
        },
      },
    },
  })
  if (!book) notFound()

  const parts: { title: string | null; chapters: typeof book.chapters }[] = []
  for (const ch of book.chapters) {
    const last = parts[parts.length - 1]
    if (!last || last.title !== ch.partTitle) parts.push({ title: ch.partTitle, chapters: [ch] })
    else last.chapters.push(ch)
  }

  const completedCount = book.chapters.filter((c) => c.progress[0]?.lessonCompleted).length

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm mb-4 inline-block hover:text-hull" style={{ color: "var(--c-muted)" }}>
        ← Back
      </Link>

      <div className="flex gap-4 items-start mb-6">
        <div className="w-4 rounded-full self-stretch flex-shrink-0" style={{ backgroundColor: book.coverColor }} />
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--c-ink)" }}>{book.title}</h1>
          <p className="text-sm" style={{ color: "var(--c-muted)" }}>{book.author}{book.edition ? ` · ${book.edition}` : ""}</p>
          <p className="text-xs mt-1" style={{ color: "var(--c-dim)" }}>{completedCount}/{book.chapters.length} lessons complete</p>
        </div>
      </div>

      <div className="h-2 rounded-full mb-8 overflow-hidden" style={{ backgroundColor: "var(--c-border)" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${(completedCount / Math.max(book.chapters.length, 1)) * 100}%`, backgroundColor: book.coverColor }} />
      </div>

      <div className="space-y-6">
        {parts.map((part, pi) => (
          <div key={pi}>
            {part.title && (
              <h2 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--c-muted)" }}>{part.title}</h2>
            )}
            <div className="space-y-2">
              {part.chapters.map((ch) => {
                const prog = ch.progress[0]
                const done = prog?.lessonCompleted ?? false
                const bestScore = prog?.quizBestScore
                return (
                  <Link key={ch.id} href={`/books/${bookSlug}/chapters/${ch.slug}`} className="block">
                    <div className="rounded-lg p-4 flex items-center gap-3 hover:shadow-sm transition-shadow border" style={{ backgroundColor: "var(--c-card)", borderColor: "var(--c-border)" }}>
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={done ? { backgroundColor: "#16a34a", color: "#fff" } : { backgroundColor: "var(--c-subtle)", color: "var(--c-muted)" }}
                      >
                        {done ? "✓" : ch.chapterNumber}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate" style={{ color: "var(--c-ink)" }}>Ch.{ch.chapterNumber} · {ch.title}</div>
                        <div className="text-xs mt-0.5" style={{ color: "var(--c-dim)" }}>
                          {ch._count.questions} questions · {ch._count.flashcards} flashcards · ~{ch.estimatedMins}min
                          {bestScore !== null && bestScore !== undefined && (
                            <span className="ml-2 text-[#16a34a]">Quiz {Math.round(bestScore * 100)}%</span>
                          )}
                        </div>
                      </div>
                      <svg className="w-4 h-4 flex-shrink-0" style={{ color: "var(--c-dim)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
