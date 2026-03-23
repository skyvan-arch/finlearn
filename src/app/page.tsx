export const dynamic = "force-dynamic"

import Link from "next/link"
import { prisma } from "@/lib/db"

export default async function HomePage() {
  const books = await prisma.book.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { chapters: true } } },
  })

  const totalChapters = await prisma.chapter.count()
  const completedLessons = await prisma.chapterProgress.count({ where: { lessonCompleted: true } })
  const totalQuestions = await prisma.question.count()

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a1a1a] mb-1">FinLearn</h1>
        <p className="text-[#6b7280] text-sm">Financial Markets · Hull &amp; Rebonato</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: "Chapters", value: totalChapters },
          { label: "Lessons Done", value: completedLessons },
          { label: "Questions", value: totalQuestions },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-[#e5e7eb] rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[#1a4a8a]">{s.value}</div>
            <div className="text-xs text-[#6b7280] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-[#6b7280] uppercase tracking-wide">Books</h2>
        {books.map((book) => (
          <Link key={book.slug} href={`/books/${book.slug}`} className="block">
            <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-3 self-stretch rounded-full flex-shrink-0" style={{ backgroundColor: book.coverColor }} />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[#1a1a1a] text-base leading-tight">{book.title}</div>
                <div className="text-[#6b7280] text-sm mt-0.5">{book.author}</div>
                {book.edition && <div className="text-xs text-[#9ca3af] mt-0.5">{book.edition}</div>}
                <div className="text-xs text-[#6b7280] mt-2">{book._count.chapters} chapters</div>
              </div>
              <svg className="w-5 h-5 text-[#9ca3af] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 pt-6 border-t border-[#e5e7eb]">
        <Link href="/admin" className="text-sm text-[#6b7280] hover:text-[#1a4a8a]">
          Admin — Add questions &amp; flashcards →
        </Link>
      </div>
    </main>
  )
}
