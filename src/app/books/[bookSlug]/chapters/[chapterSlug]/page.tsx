import Link from "next/link"
import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ bookSlug: string; chapterSlug: string }>
}) {
  const { bookSlug, chapterSlug } = await params

  const book = await prisma.book.findUnique({ where: { slug: bookSlug } })
  if (!book) notFound()

  const chapter = await prisma.chapter.findUnique({
    where: { bookId_slug: { bookId: book.id, slug: chapterSlug } },
    include: {
      progress: true,
      _count: { select: { questions: true, flashcards: true } },
    },
  })
  if (!chapter) notFound()

  const prog = chapter.progress[0]
  const lessonDone = prog?.lessonCompleted ?? false
  const bestScore = prog?.quizBestScore
  const attempts = prog?.quizAttempts ?? 0

  const base = `/books/${bookSlug}/chapters/${chapterSlug}`

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <Link href={`/books/${bookSlug}`} className="text-sm text-[#6b7280] hover:text-[#1a4a8a] mb-4 inline-block">
        ← {book.shortTitle}
      </Link>

      <div className="mb-6">
        <div className="text-xs text-[#6b7280] mb-1">Chapter {chapter.chapterNumber}</div>
        <h1 className="text-2xl font-bold text-[#1a1a1a]">{chapter.title}</h1>
        {chapter.partTitle && <p className="text-sm text-[#6b7280] mt-1">{chapter.partTitle}</p>}
      </div>

      {/* Action cards */}
      <div className="space-y-3">
        {/* Lesson */}
        <Link href={`${base}/lesson`} className="block">
          <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${lessonDone ? "bg-[#dcfce7]" : "bg-[#eff6ff]"}`}>
              <span className="text-xl">{lessonDone ? "✓" : "📖"}</span>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-[#1a1a1a]">Lesson</div>
              <div className="text-sm text-[#6b7280]">
                {lessonDone ? "Completed · ~" : "~"}{chapter.estimatedMins} min read
              </div>
            </div>
            <svg className="w-5 h-5 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* Flashcards */}
        <Link href={`${base}/flashcards`} className="block">
          <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-[#fef9c3] flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🃏</span>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-[#1a1a1a]">Flashcards</div>
              <div className="text-sm text-[#6b7280]">{chapter._count.flashcards} cards</div>
            </div>
            <svg className="w-5 h-5 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* Quiz */}
        <Link href={`${base}/quiz`} className="block">
          <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-[#fce7f3] flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🧠</span>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-[#1a1a1a]">Quiz</div>
              <div className="text-sm text-[#6b7280]">
                {chapter._count.questions} questions
                {attempts > 0 && bestScore !== null && bestScore !== undefined && (
                  <> · Best: {Math.round(bestScore * 100)}%</>
                )}
              </div>
            </div>
            <svg className="w-5 h-5 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>
    </main>
  )
}
