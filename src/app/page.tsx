export const dynamic = "force-dynamic"

import Link from "next/link"
import { prisma } from "@/lib/db"
import { THEMES } from "@/lib/themes"

export default async function HomePage() {
  const books = await prisma.book.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { chapters: true } } },
  })

  const [totalChapters, completedLessons, totalQuestions, streak, themeCounts] = await Promise.all([
    prisma.chapter.count(),
    prisma.chapterProgress.count({ where: { lessonCompleted: true } }),
    prisma.question.count(),
    prisma.userStreak.findUnique({ where: { id: 1 } }),
    // Count completed chapters per theme
    prisma.chapter.groupBy({
      by: ["theme"],
      _count: { id: true },
    }),
  ])

  // Completed per theme
  const completedByTheme = await prisma.chapterProgress.findMany({
    where: { lessonCompleted: true },
    include: { chapter: { select: { theme: true } } },
  })
  const doneMap: Record<string, number> = {}
  for (const p of completedByTheme) {
    const t = p.chapter.theme
    doneMap[t] = (doneMap[t] ?? 0) + 1
  }
  const totalMap: Record<string, number> = {}
  for (const row of themeCounts) totalMap[row.theme] = row._count.id

  const currentStreak = streak?.currentStreak ?? 0

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ color: "var(--c-ink)" }}>FinLearn</h1>
          <p className="text-sm" style={{ color: "var(--c-muted)" }}>Financial Markets · Learn by topic</p>
        </div>
        {/* Streak badge */}
        <div
          className="flex flex-col items-center px-3 py-2 rounded-xl border"
          style={{
            borderColor: currentStreak > 0 ? "#f97316" : "var(--c-border)",
            backgroundColor: currentStreak > 0 ? "#fff7ed" : "var(--c-card)",
          }}
        >
          <span className="text-2xl leading-none">{currentStreak > 0 ? "🔥" : "💤"}</span>
          <span className="text-lg font-bold leading-tight" style={{ color: currentStreak > 0 ? "#ea580c" : "var(--c-muted)" }}>{currentStreak}</span>
          <span className="text-[10px] font-medium" style={{ color: currentStreak > 0 ? "#ea580c" : "var(--c-dim)" }}>day streak</span>
        </div>
      </div>

      {/* Challenges */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Link href="/challenge" className="block">
          <div className="rounded-xl p-4 flex flex-col gap-2 border hover:shadow-md transition-shadow h-full" style={{ backgroundColor: "var(--c-card)", borderColor: "var(--c-border)" }}>
            <div className="text-2xl">🎯</div>
            <div className="font-bold text-sm" style={{ color: "var(--c-ink)" }}>Daily Challenge</div>
            <div className="text-xs" style={{ color: "var(--c-muted)" }}>10 random questions across all topics</div>
          </div>
        </Link>
        <Link href="/survival" className="block">
          <div className="rounded-xl p-4 flex flex-col gap-2 border hover:shadow-md transition-shadow h-full" style={{ backgroundColor: "var(--c-card)", borderColor: "#fecdd3" }}>
            <div className="text-2xl">🔴</div>
            <div className="font-bold text-sm" style={{ color: "var(--c-ink)" }}>Survival Mode</div>
            <div className="text-xs" style={{ color: "var(--c-muted)" }}>One mistake ends your run — beat your best</div>
          </div>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: "Chapters", value: totalChapters },
          { label: "Completed", value: completedLessons },
          { label: "Questions", value: totalQuestions },
        ].map((s) => (
          <div key={s.label} className="rounded-lg p-4 text-center border" style={{ backgroundColor: "var(--c-card)", borderColor: "var(--c-border)" }}>
            <div className="text-2xl font-bold" style={{ color: "var(--c-ink)" }}>{s.value}</div>
            <div className="text-xs mt-0.5" style={{ color: "var(--c-muted)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Themes — primary navigation ── */}
      <h2 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--c-muted)" }}>
        Study by Topic
      </h2>
      <div className="grid grid-cols-1 gap-3 mb-10">
        {THEMES.map((theme) => {
          const total = totalMap[theme.slug] ?? 0
          const done = doneMap[theme.slug] ?? 0
          const pct = total > 0 ? (done / total) * 100 : 0
          return (
            <Link key={theme.slug} href={`/themes/${theme.slug}`} className="block">
              <div
                className="rounded-xl p-4 border hover:shadow-md transition-shadow"
                style={{ backgroundColor: "var(--c-card)", borderColor: "var(--c-border)" }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl flex-shrink-0">{theme.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm" style={{ color: "var(--c-ink)" }}>{theme.name}</div>
                    <div className="text-xs mt-0.5 truncate" style={{ color: "var(--c-muted)" }}>{theme.description}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs font-medium tabular-nums" style={{ color: done > 0 ? theme.color : "var(--c-dim)" }}>
                      {done}/{total}
                    </div>
                    <div className="text-[10px]" style={{ color: "var(--c-dim)" }}>done</div>
                  </div>
                </div>
                {/* Mini progress bar */}
                {total > 0 && (
                  <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ backgroundColor: "var(--c-border)" }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: theme.color }}
                    />
                  </div>
                )}
              </div>
            </Link>
          )
        })}
      </div>

      {/* ── Browse by source — secondary ── */}
      <h2 className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--c-muted)" }}>
        Browse by Source
      </h2>
      <div className="space-y-2 mb-8">
        {books.map((book) => (
          <Link key={book.slug} href={`/books/${book.slug}`} className="block">
            <div className="rounded-xl px-4 py-3 flex items-center gap-3 border" style={{ backgroundColor: "var(--c-card)", borderColor: "var(--c-border)" }}>
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: book.coverColor }} />
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium" style={{ color: "var(--c-ink)" }}>{book.shortTitle}</span>
                <span className="text-xs ml-2" style={{ color: "var(--c-muted)" }}>{book.author}</span>
              </div>
              <span className="text-xs" style={{ color: "var(--c-dim)" }}>{book._count.chapters} ch</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="pt-4 border-t" style={{ borderColor: "var(--c-border)" }}>
        <Link href="/admin" className="text-sm hover:underline" style={{ color: "var(--c-muted)" }}>
          Admin — Add questions &amp; flashcards →
        </Link>
      </div>
    </main>
  )
}
