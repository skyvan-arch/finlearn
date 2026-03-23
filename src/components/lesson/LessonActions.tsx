"use client"

import { useState } from "react"
import Link from "next/link"
import { markLessonComplete } from "@/lib/actions"

interface Props {
  chapterId: number
  bookSlug: string
  chapterSlug: string
  bookColor: string
  initialDone: boolean
}

export default function LessonActions({ chapterId, bookSlug, chapterSlug, bookColor, initialDone }: Props) {
  const [done, setDone] = useState(initialDone)
  const [saving, setSaving] = useState(false)
  const base = `/books/${bookSlug}/chapters/${chapterSlug}`

  async function handleMark() {
    setSaving(true)
    await markLessonComplete(chapterId)
    setDone(true)
    setSaving(false)
  }

  return (
    <div className="border-t border-[#e5e7eb] pt-6 flex flex-col gap-3">
      {done ? (
        <div className="flex items-center gap-2 text-[#16a34a] font-semibold text-sm py-1">
          <span>✓ Lesson complete</span>
        </div>
      ) : (
        <button
          onClick={handleMark}
          disabled={saving}
          className="w-full py-3 rounded-lg font-semibold text-white transition-opacity disabled:opacity-60"
          style={{ backgroundColor: bookColor }}
        >
          {saving ? "Saving…" : "Mark lesson complete ✓"}
        </button>
      )}
      <div className="flex gap-3">
        <Link
          href={`${base}/flashcards`}
          className="flex-1 py-2.5 rounded-lg border border-[#e5e7eb] text-center text-sm font-medium text-[#1a1a1a] hover:bg-[#f9fafb]"
        >
          Flashcards
        </Link>
        <Link
          href={`${base}/quiz`}
          className="flex-1 py-2.5 rounded-lg border border-[#e5e7eb] text-center text-sm font-medium text-[#1a1a1a] hover:bg-[#f9fafb]"
        >
          Quiz
        </Link>
      </div>
    </div>
  )
}
