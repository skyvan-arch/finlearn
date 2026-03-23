"use client"

import { useEffect, useRef, useState } from "react"
import { submitQuizSession } from "@/lib/actions"
import Link from "next/link"

interface Question {
  id: number
  questionType: string
  difficulty: string
  stem: string
  explanation: string
  answerData: string
  sourceRef: string | null
}

interface Answer {
  questionId: number
  userAnswer: string
  isCorrect: boolean
  timeSpentMs?: number
}

interface Props {
  chapterId: number
  chapterSlug: string
  bookSlug: string
  bookColor: string
}

type Phase = "answering" | "revealed" | "done"

export default function QuizEngine({ chapterId, chapterSlug, bookSlug, bookColor }: Props) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [current, setCurrent] = useState(0)
  const [phase, setPhase] = useState<Phase>("answering")
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [finalScore, setFinalScore] = useState(0)
  const [loading, setLoading] = useState(true)

  // Use a ref so submitQuizSession always sees the complete answers array
  const answersRef = useRef<Answer[]>([])
  const startTimeRef = useRef(Date.now())

  useEffect(() => {
    fetch(`/api/questions?chapterId=${chapterId}`)
      .then((r) => r.json())
      .then((d) => {
        setQuestions(d.questions ?? [])
        setLoading(false)
        startTimeRef.current = Date.now()
      })
  }, [chapterId])

  function reset() {
    answersRef.current = []
    setCurrent(0)
    setPhase("answering")
    setSelected(null)
    setScore(0)
    startTimeRef.current = Date.now()
    // Re-fetch to re-shuffle
    setLoading(true)
    fetch(`/api/questions?chapterId=${chapterId}`)
      .then((r) => r.json())
      .then((d) => { setQuestions(d.questions ?? []); setLoading(false) })
  }

  if (loading) return <div className="text-[#6b7280] py-8 text-center">Loading questions…</div>
  if (questions.length === 0) return <div className="text-[#6b7280] py-8 text-center">No questions for this chapter yet.</div>

  if (phase === "done") {
    const pct = Math.round((finalScore / questions.length) * 100)
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">{pct >= 80 ? "🎉" : pct >= 60 ? "📈" : "📚"}</div>
        <div className="text-3xl font-bold text-[#1a1a1a] mb-1">{pct}%</div>
        <div className="text-[#6b7280] mb-6">{finalScore} / {questions.length} correct</div>
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full py-3 rounded-lg font-semibold text-white"
            style={{ backgroundColor: bookColor }}
          >
            Retry Quiz
          </button>
          <Link
            href={`/books/${bookSlug}/chapters/${chapterSlug}`}
            className="block w-full py-3 rounded-lg border border-[#e5e7eb] font-medium text-[#1a1a1a] text-center"
          >
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
    const timeSpentMs = Date.now() - startTimeRef.current
    answersRef.current = [
      ...answersRef.current,
      { questionId: q.id, userAnswer, isCorrect, timeSpentMs },
    ]
    if (isCorrect) setScore((s) => s + 1)
  }

  function handleMCQ(choiceIndex: number) {
    if (phase !== "answering") return
    const isCorrect = choiceIndex === parsed.correctIndex
    setSelected(String(choiceIndex))
    recordAnswer(String(choiceIndex), isCorrect)
    setPhase("revealed")
  }

  function handleTF(value: boolean) {
    if (phase !== "answering") return
    const isCorrect = value === parsed.correct
    setSelected(String(value))
    recordAnswer(String(value), isCorrect)
    setPhase("revealed")
  }

  async function next() {
    const isLast = current + 1 >= questions.length
    startTimeRef.current = Date.now()
    if (isLast) {
      // answersRef.current is already complete (all answers added synchronously)
      const currentScore = answersRef.current.filter((a) => a.isCorrect).length
      setFinalScore(currentScore)
      await submitQuizSession(chapterId, chapterSlug, answersRef.current)
      setPhase("done")
    } else {
      setSelected(null)
      setPhase("answering")
      setCurrent((c) => c + 1)
    }
  }

  const isLastQ = current + 1 >= questions.length
  const lastAnswerCorrect = answersRef.current[answersRef.current.length - 1]?.isCorrect

  return (
    <div>
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${(current / questions.length) * 100}%`, backgroundColor: bookColor }}
          />
        </div>
        <span className="text-sm text-[#6b7280] flex-shrink-0 tabular-nums">
          {current + 1}/{questions.length}
        </span>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full text-white"
          style={{ backgroundColor: diffColor[q.difficulty] ?? "#6b7280" }}
        >
          {q.difficulty}
        </span>
        {q.sourceRef && <span className="text-xs text-[#9ca3af]">{q.sourceRef}</span>}
      </div>

      {/* Stem */}
      <p className="text-[#1a1a1a] font-medium leading-relaxed mb-6 text-base">{q.stem}</p>

      {/* MCQ */}
      {q.questionType === "MCQ" && (
        <div className="space-y-2">
          {(parsed.choices as string[]).map((choice, i) => {
            const isSelected = selected === String(i)
            const isCorrect = i === parsed.correctIndex
            let cls = "bg-white border-[#e5e7eb] text-[#1a1a1a]"
            if (phase === "revealed") {
              if (isCorrect) cls = "bg-[#dcfce7] border-[#16a34a] text-[#166534]"
              else if (isSelected) cls = "bg-[#fee2e2] border-[#dc2626] text-[#991b1b]"
            }
            return (
              <button
                key={i}
                onClick={() => handleMCQ(i)}
                disabled={phase !== "answering"}
                className={`w-full text-left p-4 rounded-lg border text-sm transition-colors disabled:cursor-default ${cls} enabled:hover:border-[#93c5fd]`}
              >
                <span className="font-semibold mr-2">{String.fromCharCode(65 + i)}.</span>
                {choice}
              </button>
            )
          })}
        </div>
      )}

      {/* True / False */}
      {q.questionType === "TRUE_FALSE" && (
        <div className="flex gap-3">
          {([true, false] as const).map((val) => {
            const isSelected = selected === String(val)
            const isCorrect = val === parsed.correct
            let cls = "bg-white border-[#e5e7eb] text-[#1a1a1a]"
            if (phase === "revealed") {
              if (isCorrect) cls = "bg-[#dcfce7] border-[#16a34a] text-[#166534]"
              else if (isSelected) cls = "bg-[#fee2e2] border-[#dc2626] text-[#991b1b]"
            }
            return (
              <button
                key={String(val)}
                onClick={() => handleTF(val)}
                disabled={phase !== "answering"}
                className={`flex-1 py-4 rounded-lg border font-semibold text-sm transition-colors disabled:cursor-default ${cls}`}
              >
                {val ? "True" : "False"}
              </button>
            )
          })}
        </div>
      )}

      {/* Explanation panel */}
      {phase === "revealed" && (
        <div
          className={`mt-4 p-4 rounded-lg border ${lastAnswerCorrect ? "bg-[#f0fdf4] border-[#bbf7d0]" : "bg-[#fef2f2] border-[#fecaca]"}`}
        >
          <div className="text-xs font-semibold text-[#6b7280] uppercase mb-1.5">
            {lastAnswerCorrect ? "✓ Correct" : "✗ Incorrect"} — Explanation
          </div>
          <p className="text-sm text-[#1a1a1a] leading-relaxed">{q.explanation}</p>
        </div>
      )}

      {/* Next */}
      {phase === "revealed" && (
        <button
          onClick={next}
          className="w-full mt-4 py-3 rounded-lg font-semibold text-white text-sm"
          style={{ backgroundColor: bookColor }}
        >
          {isLastQ ? "See Results" : "Next →"}
        </button>
      )}
    </div>
  )
}
