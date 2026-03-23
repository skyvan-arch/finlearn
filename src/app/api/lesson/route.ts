import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const bookSlug = searchParams.get("bookSlug")
  const chapterSlug = searchParams.get("chapterSlug")

  if (!bookSlug || !chapterSlug) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 })
  }

  const book = await prisma.book.findUnique({ where: { slug: bookSlug } })
  if (!book) return NextResponse.json({ error: "Book not found" }, { status: 404 })

  const chapter = await prisma.chapter.findUnique({
    where: { bookId_slug: { bookId: book.id, slug: chapterSlug } },
    include: { progress: true },
  })
  if (!chapter) return NextResponse.json({ error: "Chapter not found" }, { status: 404 })

  // Next chapter
  const nextChapter = await prisma.chapter.findFirst({
    where: { bookId: book.id, sortOrder: { gt: chapter.sortOrder } },
    orderBy: { sortOrder: "asc" },
  })

  return NextResponse.json({
    chapter: {
      id: chapter.id,
      chapterNumber: chapter.chapterNumber,
      title: chapter.title,
      partTitle: chapter.partTitle,
      lessonContent: chapter.lessonContent,
      estimatedMins: chapter.estimatedMins,
    },
    book: { shortTitle: book.shortTitle, coverColor: book.coverColor },
    bookSlug,
    chapterSlug,
    alreadyDone: chapter.progress[0]?.lessonCompleted ?? false,
    nextChapterSlug: nextChapter?.slug ?? null,
  })
}
