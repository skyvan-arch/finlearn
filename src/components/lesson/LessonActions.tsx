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
    <div className="border-t pt-6 flex flex-col gap-3" style={{ borderColor: "var(--c-border)" }}>
      {done ? (
        <div className="flex items-center gap-2 font-semibold text-sm py-1" style={{ color: "#16a34a" }}>
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
          className="flex-1 py-2.5 rounded-lg border text-center text-sm font-medium"
          style={{ borderColor: "var(--c-border)", color: "var(--c-ink)" }}
        >
          Flashcards
        </Link>
        <Link
          href={`${base}/quiz`}
          className="flex-1 py-2.5 rounded-lg border text-center text-sm font-medium"
          style={{ borderColor: "var(--c-border)", color: "var(--c-ink)" }}
        >
          Quiz
        </Link>
      </div>
    </div>
  )
}
