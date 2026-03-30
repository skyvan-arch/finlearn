"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface Question {
  id: number; questionType: string; difficulty: string
  stem: string; explanation: string; answerData: string; sourceRef: string | null
}
interface Props { chapterId: number; chapterSlug: string; bookSlug: string; bookColor: string }
type Grade = "nailed" | "almost" | "missed"

const GRADE_LABELS: Record<Grade, { label: string; color: string; bg: string; border: string }> = {
  nailed: { label: "✓ Nailed it", color: "#166534", bg: "#dcfce7", border: "#86efac" },
  almost: { label: "~ Almost",    color: "#92400e", bg: "#fef9c3", border: "#fcd34d" },
  missed: { label: "✗ Missed",    color: "#991b1b", bg: "#fee2e2", border: "#fca5a5" },
}

function getCorrectAnswer(q: Question): string {
  const parsed = JSON.parse(q.answerData)
  if (q.questionType === "MCQ") {
    return parsed.choices[parsed.correctIndex]
  }
  if (q.questionType === "TRUE_FALSE") {
    return parsed.correct ? "True" : "False"
  }
  return (parsed.accepted as string[]).join(" / ")
}

export default function InterviewEngine({ chapterId, chapterSlug, bookSlug, bookColor }: Props) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [grades, setGrades] = useState<Grade[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    fetch(`/api/questions?chapterId=${chapterId}`)
      .then((r) => r.json())
      .then((d) => { setQuestions(d.questions ?? []); setLoading(false) })
  }, [chapterId])

  function grade(g: Grade) {
    const next = [...grades, g]
    setGrades(next)
    if (index + 1 >= questions.length) { setDone(true); return }
    setIndex((i) => i + 1)
    setRevealed(false)
  }

  function reset() {
    setIndex(0); setRevealed(false); setGrades([]); setDone(false)
  }

  if (loading) return <div className="py-8 text-center" style={{ color: "var(--c-muted)" }}>Loading questions…</div>
  if (questions.length === 0) return <div className="py-8 text-center" style={{ color: "var(--c-muted)" }}>No questions for this chapter yet.</div>

  if (done) {
    const nailed = grades.filter((g) => g === "nailed").length
    const almost = grades.filter((g) => g === "almost").length
    const missed = grades.filter((g) => g === "missed").length
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">{nailed >= questions.length * 0.8 ? "🎯" : nailed >= questions.length * 0.5 ? "📈" : "📚"}</div>
        <div className="text-2xl font-bold mb-1" style={{ color: "var(--c-ink)" }}>Interview Complete</div>
        <div className="mb-6" style={{ color: "var(--c-muted)" }}>{questions.length} questions</div>
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="rounded-xl p-4 border border-[#86efac] bg-[#dcfce7]">
            <div className="text-2xl font-bold text-[#166534]">{nailed}</div>
            <div className="text-xs text-[#166534] mt-0.5">Nailed</div>
          </div>
          <div className="rounded-xl p-4 border border-[#fcd34d] bg-[#fef9c3]">
            <div className="text-2xl font-bold text-[#92400e]">{almost}</div>
            <div className="text-xs text-[#92400e] mt-0.5">Almost</div>
          </div>
          <div className="rounded-xl p-4 border border-[#fca5a5] bg-[#fee2e2]">
            <div className="text-2xl font-bold text-[#991b1b]">{missed}</div>
            <div className="text-xs text-[#991b1b] mt-0.5">Missed</div>
          </div>
        </div>
        <div className="space-y-3">
          <button onClick={reset} className="w-full py-3 rounded-lg font-semibold text-white" style={{ backgroundColor: bookColor }}>
            Go Again
          </button>
          <Link href={`/books/${bookSlug}/chapters/${chapterSlug}`} className="block w-full py-3 rounded-lg border font-medium text-center" style={{ borderColor: "var(--c-border)", color: "var(--c-ink)" }}>
            Back to Chapter
          </Link>
        </div>
      </div>
    )
  }

  const q = questions[index]
  const diffColor: Record<string, string> = { EASY: "#16a34a", MEDIUM: "#d97706", HARD: "#dc2626" }

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "var(--c-border)" }}>
          <div className="h-full rounded-full transition-all duration-200" style={{ width: `${(index / questions.length) * 100}%`, backgroundColor: bookColor }} />
        </div>
        <span className="text-sm flex-shrink-0 tabular-nums" style={{ color: "var(--c-muted)" }}>{index + 1}/{questions.length}</span>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-medium px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: diffColor[q.difficulty] ?? "#6b7280" }}>
          {q.difficulty}
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--c-subtle)", color: "var(--c-muted)" }}>
          Interview Mode
        </span>
        {q.sourceRef && <span className="text-xs" style={{ color: "var(--c-dim)" }}>{q.sourceRef}</span>}
      </div>

      {/* Question — no choices shown */}
      <div className="rounded-2xl p-6 mb-4 border" style={{ backgroundColor: "var(--c-card)", borderColor: "var(--c-border)" }}>
        <div className="text-xs uppercase font-semibold mb-3" style={{ color: "var(--c-dim)" }}>Question</div>
        <p className="font-medium leading-relaxed text-base" style={{ color: "var(--c-ink)" }}>{q.stem}</p>
      </div>

      {/* Think prompt */}
      {!revealed && (
        <div className="text-center py-3 mb-4" style={{ color: "var(--c-muted)" }}>
          <p className="text-sm italic">Take a moment to formulate your answer…</p>
        </div>
      )}

      {/* Reveal */}
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="w-full py-3 rounded-lg font-semibold text-white"
          style={{ backgroundColor: bookColor }}
        >
          Reveal Answer
        </button>
      ) : (
        <>
          {/* Answer box */}
          <div className="rounded-xl p-5 mb-4 border border-[#bbf7d0] bg-[#f0fdf4]">
            <div className="text-xs font-semibold uppercase mb-2" style={{ color: "#166534" }}>Model Answer</div>
            <p className="font-semibold text-sm mb-3" style={{ color: "#1f2937" }}>{getCorrectAnswer(q)}</p>
            <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>{q.explanation}</p>
          </div>

          {/* Self-grade */}
          <div className="mb-2 text-xs font-semibold uppercase" style={{ color: "var(--c-muted)" }}>How did you do?</div>
          <div className="grid grid-cols-3 gap-3">
            {(["missed", "almost", "nailed"] as Grade[]).map((g) => {
              const meta = GRADE_LABELS[g]
              return (
                <button
                  key={g}
                  onClick={() => grade(g)}
                  className="py-4 rounded-lg border font-semibold text-sm"
                  style={{ backgroundColor: meta.bg, borderColor: meta.border, color: meta.color }}
                >
                  {meta.label}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
