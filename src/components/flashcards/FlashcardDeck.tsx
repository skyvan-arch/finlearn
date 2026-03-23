"use client"

import { useState } from "react"
import { updateFlashcardInterval } from "@/lib/actions"
import Link from "next/link"

interface Flashcard { id: number; front: string; back: string }
interface Props { cards: Flashcard[]; bookSlug: string; chapterSlug: string; bookColor: string }

export default function FlashcardDeck({ cards, bookSlug, chapterSlug, bookColor }: Props) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [done, setDone] = useState(false)

  if (cards.length === 0) {
    return <div className="py-8 text-center" style={{ color: "var(--c-muted)" }}>No flashcards for this chapter yet.</div>
  }

  if (done) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">✅</div>
        <div className="text-2xl font-bold mb-1" style={{ color: "var(--c-ink)" }}>{cards.length} cards reviewed</div>
        <div className="mb-6" style={{ color: "var(--c-muted)" }}>Good job! Spaced repetition will show these again at the right time.</div>
        <div className="space-y-3">
          <button
            onClick={() => { setIndex(0); setFlipped(false); setDone(false) }}
            className="w-full py-3 rounded-lg font-semibold text-white"
            style={{ backgroundColor: bookColor }}
          >
            Review Again
          </button>
          <Link
            href={`/books/${bookSlug}/chapters/${chapterSlug}`}
            className="block w-full py-3 rounded-lg border font-medium text-center"
            style={{ borderColor: "var(--c-border)", color: "var(--c-ink)" }}
          >
            Back to Chapter
          </Link>
        </div>
      </div>
    )
  }

  const card = cards[index]

  async function rate(quality: 0 | 3 | 5) {
    await updateFlashcardInterval(card.id, quality)
    if (index + 1 >= cards.length) setDone(true)
    else { setIndex((i) => i + 1); setFlipped(false) }
  }

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "var(--c-border)" }}>
          <div className="h-full rounded-full" style={{ width: `${(index / cards.length) * 100}%`, backgroundColor: bookColor }} />
        </div>
        <span className="text-sm" style={{ color: "var(--c-muted)" }}>{index + 1}/{cards.length}</span>
      </div>

      {/* Card */}
      <div
        className="rounded-2xl p-6 min-h-[220px] flex flex-col justify-between cursor-pointer select-none shadow-sm hover:shadow-md transition-shadow border"
        style={{ backgroundColor: "var(--c-card)", borderColor: "var(--c-border)" }}
        onClick={() => !flipped && setFlipped(true)}
      >
        <div className="flex-1 flex flex-col justify-center">
          {!flipped ? (
            <>
              <div className="text-xs uppercase font-semibold mb-3" style={{ color: "var(--c-dim)" }}>Term / Concept</div>
              <div className="text-lg font-bold leading-snug" style={{ fontFamily: "Georgia, serif", color: "var(--c-ink)" }}>
                {card.front}
              </div>
            </>
          ) : (
            <>
              <div className="text-xs uppercase font-semibold mb-3" style={{ color: "var(--c-dim)" }}>Definition / Formula</div>
              <div className="text-sm leading-relaxed whitespace-pre-line" style={{ fontFamily: "Georgia, serif", color: "var(--c-ink)" }}>
                {card.back}
              </div>
            </>
          )}
        </div>
        {!flipped && <div className="text-center text-xs mt-4" style={{ color: "var(--c-dim)" }}>Tap to reveal →</div>}
      </div>

      {flipped && (
        <div className="mt-4 grid grid-cols-3 gap-3">
          <button onClick={() => rate(0)} className="py-3 rounded-lg border border-[#fca5a5] bg-[#fee2e2] text-[#dc2626] font-semibold text-sm">✗ Hard</button>
          <button onClick={() => rate(3)} className="py-3 rounded-lg border border-[#fcd34d] bg-[#fef9c3] text-[#92400e] font-semibold text-sm">~ OK</button>
          <button onClick={() => rate(5)} className="py-3 rounded-lg border border-[#86efac] bg-[#dcfce7] text-[#16a34a] font-semibold text-sm">✓ Easy</button>
        </div>
      )}
    </div>
  )
}
