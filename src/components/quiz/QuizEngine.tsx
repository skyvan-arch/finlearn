"use client"

import { useEffect, useRef, useState } from "react"
import { submitQuizSession } from "@/lib/actions"
import Link from "next/link"

interface Question {
  id: number; questionType: string; difficulty: string
  stem: string; explanation: string; answerData: string; sourceRef: string | null
}
interface Answer { questionId: number; userAnswer: string; isCorrect: boolean; timeSpentMs?: number }
interface Props { chapterId: number; chapterSlug: string; bookSlug: string; bookColor: string }
type Phase = "answering" | "revealed" | "done"

export default function QuizEngine({ chapterId, chapterSlug, bookSlug, bookColor }: Props) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [current, setCurrent] = useState(0)
  const [phase, setPhase] = useState<Phase>("answering")
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [finalScore, setFinalScore] = useState(0)
  const [loading, setLoading] = useState(true)

  const answersRef = useRef<Answer[]>([])
  const startTimeRef = useRef(Date.now())

  useEffect(() => {
    fetch(`/api/questions?chapterId=${chapterId}`)
      .then((r) => r.json())
      .then((d) => { setQuestions(d.questions ?? []); setLoading(false); startTimeRef.current = Date.now() })
  }, [chapterId])

  function reset() {
    answersRef.current = []
    setCurrent(0); setPhase("answering"); setSelected(null); setScore(0)
    startTimeRef.current = Date.now()
    setLoading(true)
    fetch(`/api/questions?chapterId=${chapterId}`)
      .then((r) => r.json())
      .then((d) => { setQuestions(d.questions ?? []); setLoading(false) })
  }

  if (loading) return <div className="py-8 text-center" style={{ color: "var(--c-muted)" }}>Loading questions…</div>
  if (questions.length === 0) return <div className="py-8 text-center" style={{ color: "var(--c-muted)" }}>No questions for this chapter yet.</div>

  if (phase === "done") {
    const pct = Math.round((finalScore / questions.length) * 100)
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">{pct >= 80 ? "🎉" : pct >= 60 ? "📈" : "📚"}</div>
        <div className="text-3xl font-bold mb-1" style={{ color: "var(--c-ink)" }}>{pct}%</div>
        <div className="mb-6" style={{ color: "var(--c-muted)" }}>{finalScore} / {questions.length} correct</div>
        <div className="space-y-3">
          <button onClick={reset} className="w-full py-3 rounded-lg font-semibold text-white" style={{ backgroundColor: bookColor }}>
            Retry Quiz
          </button>
          <Link href={`/books/${bookSlug}/chapters/${chapterSlug}`} className="block w-full py-3 rounded-lg border font-medium text-center" style={{ borderColor: "var(--c-border)", color: "var(--c-ink)" }}>
            Back to Chapter
          </Link>
        </div>
      </div>
    )
  }

  const q = questions[current]
  const parsed = JSON.parse(q.answerData)
  const diffColor: Record<string, string> = { EASY: "#16a34a", MEDIUM: "#d97706", HARD: "#dc2626" }

  function recordAnswer(userAnswer: string, isCorrect: boolean) {
    answersRef.current = [...answersRef.current, { questionId: q.id, userAnswer, isCorrect, timeSpentMs: Date.now() - startTimeRef.current }]
    if (isCorrect) setScore((s) => s + 1)
  }

  function handleMCQ(i: number) {
    if (phase !== "answering") return
    setSelected(String(i)); recordAnswer(String(i), i === parsed.correctIndex); setPhase("revealed")
  }

  function handleTF(val: boolean) {
    if (phase !== "answering") return
    setSelected(String(val)); recordAnswer(String(val), val === parsed.correct); setPhase("revealed")
  }

  function next() {
    const isLast = current + 1 >= questions.length
    startTimeRef.current = Date.now()
    if (isLast) {
      const currentScore = answersRef.current.filter((a) => a.isCorrect).length
      setFinalScore(currentScore)
      // fire-and-forget — show results instantly, save in background
      submitQuizSession(chapterId, chapterSlug, answersRef.current)
      setPhase("done")
    } else {
      setSelected(null); setPhase("answering"); setCurrent((c) => c + 1)
    }
  }

  const isLastQ = current + 1 >= questions.length
  const lastCorrect = answersRef.current[answersRef.current.length - 1]?.isCorrect

  return (
    <div>
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "var(--c-border)" }}>
          <div className="h-full rounded-full transition-all duration-300" style={{ width: `${(current / questions.length) * 100}%`, backgroundColor: bookColor }} />
        </div>
        <span className="text-sm flex-shrink-0 tabular-nums" style={{ color: "var(--c-muted)" }}>{current + 1}/{questions.length}</span>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-medium px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: diffColor[q.difficulty] ?? "#6b7280" }}>
          {q.difficulty}
        </span>
        {q.sourceRef && <span className="text-xs" style={{ color: "var(--c-dim)" }}>{q.sourceRef}</span>}
      </div>

      {/* Stem */}
      <p className="font-medium leading-relaxed mb-6 text-base" style={{ color: "var(--c-ink)" }}>{q.stem}</p>

      {/* MCQ */}
      {q.questionType === "MCQ" && (
        <div className="space-y-2">
          {(parsed.choices as string[]).map((choice, i) => {
            const isSelected = selected === String(i)
            const isCorrect = i === parsed.correctIndex
            let style: React.CSSProperties = { backgroundColor: "var(--c-card)", borderColor: "var(--c-border)", color: "var(--c-ink)" }
            if (phase === "revealed") {
              if (isCorrect) style = { backgroundColor: "#dcfce7", borderColor: "#16a34a", color: "#166534" }
              else if (isSelected) style = { backgroundColor: "#fee2e2", borderColor: "#dc2626", color: "#991b1b" }
            }
            return (
              <button
                key={i}
                onClick={() => handleMCQ(i)}
                disabled={phase !== "answering"}
                className="w-full text-left p-4 rounded-lg border text-sm transition-colors disabled:cursor-default"
                style={style}
              >
                <span className="font-semibold mr-2">{String.fromCharCode(65 + i)}.</span>{choice}
              </button>
            )
          })}
        </div>
      )}

      {/* True/False */}
      {q.questionType === "TRUE_FALSE" && (
        <div className="flex gap-3">
          {([true, false] as const).map((val) => {
            const isSelected = selected === String(val)
            const isCorrect = val === parsed.correct
            let style: React.CSSProperties = { backgroundColor: "var(--c-card)", borderColor: "var(--c-border)", color: "var(--c-ink)" }
            if (phase === "revealed") {
              if (isCorrect) style = { backgroundColor: "#dcfce7", borderColor: "#16a34a", color: "#166534" }
              else if (isSelected) style = { backgroundColor: "#fee2e2", borderColor: "#dc2626", color: "#991b1b" }
            }
            return (
              <button key={String(val)} onClick={() => handleTF(val)} disabled={phase !== "answering"}
                className="flex-1 py-4 rounded-lg border font-semibold text-sm transition-colors disabled:cursor-default"
                style={style}
              >
                {val ? "True" : "False"}
              </button>
            )
          })}
        </div>
      )}

      {/* Explanation */}
      {phase === "revealed" && (
        <div className={`mt-4 p-4 rounded-lg border ${lastCorrect ? "bg-[#f0fdf4] border-[#bbf7d0]" : "bg-[#fef2f2] border-[#fecaca]"}`}>
          <div className="text-xs font-semibold uppercase mb-1.5" style={{ color: lastCorrect ? "#166534" : "#991b1b" }}>
            {lastCorrect ? "✓ Correct" : "✗ Incorrect"} — Explanation
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#1f2937" }}>{q.explanation}</p>
        </div>
      )}

      {phase === "revealed" && (
        <button onClick={next} className="w-full mt-4 py-3 rounded-lg font-semibold text-white text-sm" style={{ backgroundColor: bookColor }}>
          {isLastQ ? "See Results" : "Next →"}
        </button>
      )}
    </div>
  )
}
