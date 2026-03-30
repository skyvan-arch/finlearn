import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { THEME_MAP } from "@/lib/themes"

export default async function ThemePage({
  params,
}: {
  params: Promise<{ themeSlug: string }>
}) {
  const { themeSlug } = await params
  const theme = THEME_MAP[themeSlug]
  if (!theme) notFound()

  const chapters = await prisma.chapter.findMany({
    where: { theme: themeSlug },
    include: {
      book: true,
      progress: true,
      _count: { select: { questions: true, flashcards: true } },
    },
    orderBy: [{ book: { sortOrder: "asc" } }, { sortOrder: "asc" }],
  })

  // Group by book for display
  const byBook = new Map<string, typeof chapters>()
  for (const ch of chapters) {
    const key = ch.book.shortTitle
    if (!byBook.has(key)) byBook.set(key, [])
    byBook.get(key)!.push(ch)
  }

  const totalDone = chapters.filter((c) => c.progress[0]?.lessonCompleted).length

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      {/* Back */}
      <Link href="/" className="text-sm mb-6 inline-block" style={{ color: "var(--c-muted)" }}>
        ← Home
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{theme.emoji}</span>
          <h1 className="text-2xl font-bold" style={{ color: "var(--c-ink)" }}>{theme.name}</h1>
        </div>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--c-muted)" }}>{theme.description}</p>
        <div className="flex items-center gap-3 text-xs" style={{ color: "var(--c-dim)" }}>
          <span>{chapters.length} chapters</span>
          <span>·</span>
          <span>{totalDone} completed</span>
          <span>·</span>
          <span>{chapters.reduce((n, c) => n + c._count.questions, 0)} questions</span>
        </div>
      </div>

      {/* Progress bar */}
      {chapters.length > 0 && (
        <div className="h-1.5 rounded-full overflow-hidden mb-8" style={{ backgroundColor: "var(--c-border)" }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${(totalDone / chapters.length) * 100}%`, backgroundColor: theme.color }}
          />
        </div>
      )}

      {/* Chapters — grouped by book */}
      <div className="space-y-6">
        {Array.from(byBook.entries()).map(([bookName, chs]) => (
          <div key={bookName}>
            <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--c-muted)" }}>
              {bookName}
            </div>
            <div className="space-y-2">
              {chs.map((ch) => {
                const prog = ch.progress[0]
                const done = prog?.lessonCompleted ?? false
                const best = prog?.quizBestScore
                return (
                  <Link key={ch.id} href={`/books/${ch.book.slug}/chapters/${ch.slug}`} className="block">
                    <div
                      className="rounded-xl p-4 flex items-center gap-4 border transition-shadow hover:shadow-md"
                      style={{ backgroundColor: "var(--c-card)", borderColor: done ? theme.color + "40" : "var(--c-border)" }}
                    >
                      {/* Status dot */}
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: done ? theme.color : "var(--c-border)" }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm leading-tight" style={{ color: "var(--c-ink)" }}>
                          {ch.title}
                        </div>
                        <div className="text-xs mt-0.5 flex items-center gap-2" style={{ color: "var(--c-muted)" }}>
                          <span>{ch._count.questions}Q · {ch._count.flashcards} cards · ~{ch.estimatedMins}min</span>
                          {best !== null && best !== undefined && (
                            <span style={{ color: theme.color }}>★ {Math.round(best * 100)}%</span>
                          )}
                        </div>
                      </div>
                      {/* Book pill */}
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: ch.book.coverColor + "20", color: ch.book.coverColor }}
                      >
                        {ch.book.shortTitle}
                      </span>
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
