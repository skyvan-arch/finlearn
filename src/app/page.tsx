export const dynamic = "force-dynamic"

import Link from "next/link"
import { prisma } from "@/lib/db"

export default async function HomePage() {
  const books = await prisma.book.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { chapters: true } } },
  })

  const [totalChapters, completedLessons, totalQuestions, streak] = await Promise.all([
    prisma.chapter.count(),
    prisma.chapterProgress.count({ where: { lessonCompleted: true } }),
    prisma.question.count(),
    prisma.userStreak.findUnique({ where: { id: 1 } }),
  ])

  const currentStreak = streak?.currentStreak ?? 0

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ color: "var(--c-ink)" }}>FinLearn</h1>
          <p className="text-sm" style={{ color: "var(--c-muted)" }}>Financial Markets · Hull &amp; Rebonato</p>
        </div>
        {/* Streak badge */}
        <div className="flex flex-col items-center px-3 py-2 rounded-xl border" style={{ borderColor: currentStreak > 0 ? "#f97316" : "var(--c-border)", backgroundColor: currentStreak > 0 ? "#fff7ed" : "var(--c-card)" }}>
          <span className="text-2xl leading-none">{currentStreak > 0 ? "🔥" : "💤"}</span>
          <span className="text-lg font-bold leading-tight" style={{ color: currentStreak > 0 ? "#ea580c" : "var(--c-muted)" }}>{currentStreak}</span>
          <span className="text-[10px] font-medium" style={{ color: currentStreak > 0 ? "#ea580c" : "var(--c-dim)" }}>day streak</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: "Chapters", value: totalChapters },
          { label: "Lessons Done", value: completedLessons },
          { label: "Questions", value: totalQuestions },
        ].map((s) => (
          <div key={s.label} className="rounded-lg p-4 text-center border" style={{ backgroundColor: "var(--c-card)", borderColor: "var(--c-border)" }}>
            <div className="text-2xl font-bold text-hull">{s.value}</div>
            <div className="text-xs mt-0.5" style={{ color: "var(--c-muted)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--c-muted)" }}>Books</h2>
        {books.map((book) => (
          <Link key={book.slug} href={`/books/${book.slug}`} className="block">
            <div className="rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow border" style={{ backgroundColor: "var(--c-card)", borderColor: "var(--c-border)" }}>
              <div className="w-3 self-stretch rounded-full flex-shrink-0" style={{ backgroundColor: book.coverColor }} />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-base leading-tight" style={{ color: "var(--c-ink)" }}>{book.title}</div>
                <div className="text-sm mt-0.5" style={{ color: "var(--c-muted)" }}>{book.author}</div>
                {book.edition && <div className="text-xs mt-0.5" style={{ color: "var(--c-dim)" }}>{book.edition}</div>}
                <div className="text-xs mt-2" style={{ color: "var(--c-muted)" }}>{book._count.chapters} chapters</div>
              </div>
              <svg className="w-5 h-5 flex-shrink-0" style={{ color: "var(--c-dim)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Daily Challenge */}
      <Link href="/challenge" className="block mt-8">
        <div className="rounded-xl p-5 flex items-center gap-4 border" style={{ backgroundColor: "var(--c-card)", borderColor: "var(--c-border)" }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-2xl" style={{ backgroundColor: "#eef2ff" }}>
            🎯
          </div>
          <div className="flex-1">
            <div className="font-bold" style={{ color: "var(--c-ink)" }}>Daily Challenge</div>
            <div className="text-sm" style={{ color: "var(--c-muted)" }}>10 random questions across all books</div>
          </div>
          <svg className="w-5 h-5 flex-shrink-0" style={{ color: "var(--c-dim)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>

      <div className="mt-8 pt-6 border-t" style={{ borderColor: "var(--c-border)" }}>
        <Link href="/admin" className="text-sm hover:text-hull" style={{ color: "var(--c-muted)" }}>
          Admin — Add questions &amp; flashcards →
        </Link>
      </div>
    </main>
  )
}
