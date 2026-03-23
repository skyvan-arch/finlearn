import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const chapterIdStr = searchParams.get("chapterId")
  if (!chapterIdStr) return NextResponse.json({ error: "Missing chapterId" }, { status: 400 })

  const chapterId = parseInt(chapterIdStr)
  const questions = await prisma.question.findMany({
    where: { chapterId, isActive: true },
    orderBy: { id: "asc" },
  })

  // Shuffle
  const shuffled = questions.sort(() => Math.random() - 0.5)

  return NextResponse.json({ questions: shuffled })
}
