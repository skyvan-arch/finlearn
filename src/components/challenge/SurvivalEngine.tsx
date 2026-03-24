"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

interface ChallengeQuestion {
  id: number; questionType: string; difficulty: string
  stem: string; explanation: string; answerData: string; sourceRef: string | null
  chapterTitle: string; bookTitle: string; bookColor: string
}

type Phase = "idle" | "answering" | "revealed" | "dead"

const ACCENT = "#e11d48" // rose — high stakes feel
const diffColor: Record<string, string> = { EASY: "#16a34a", MEDIUM: "#d97706", HARD: "#dc2626" }

const BEST_KEY = "survival_best"

function getBest(): number {
  if (typeof window === "undefined") return 0
  return parseInt(localStorage.getItem(BEST_KEY) ?? "0", 10)
}
function setBest(n: number) {
  if (typeof window === "undefined") return
  const current = getBest()
  if (n > current) localStorage.setItem(BEST_KEY, String(n))
}

export default function SurvivalEngine() {
  const [questions, setQuestions] = useState<ChallengeQuestion[]>([])
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>("idle")
  const [selected, setSelected] = useState<string | null>(null)
  const [streak, setStreak] = useState(0)
  const [best, setBestState] = useState(0)
  const [loading, setLoading] = useState(false)
  const lastCorrect = useRef(false)

  useEffect(() => { setBestState(getBest()) }, [])

  function start() {
    setLoading(true)
    fetch("/api/challenge?limit=all")
      .then((r) => r.json())
      .then((d) => {
        setQuestions(d.questions ?? [])
        setIndex(0); setStreak(0); setSelected(null)
        setPhase("answering"); setLoading(false)
      })
  }

  if (phase === "idle") {
    return (
      <div className="text-center py-6">
        <div className="text-5xl mb-3">🔴</div>
        <div className="text-xl font-bold mb-1" style={{ color: "var(--c-ink)" }}>Survival Mode</div>
        <div className="text-sm mb-2" style={{ color: "var(--c-muted)" }}>Answer correctly to keep your streak alive. One wrong answer ends the run.</div>
        {best > 0 && <div className="text-sm font-semibold mb-4" style={{ color: ACCENT }}>Personal best: {best} 🔥</div>}
        <button onClick={start} className="w-full py-3 rounded-lg font-semibold text-white" style={{ backgroundColor: ACCENT }}>
          Start
        </button>
      </div>
    )
  }

  if (loading) return <div className="py-6 text-center" style={{ color: "var(--c-muted)" }}>Loading…</div>

  if (phase === "dead") {
    return (
      <div className="text-center py-6">
        <div className="text-5xl mb-3">💀</div>
        <div className="text-2xl font-bold mb-1" style={{ color: "var(--c-ink)" }}>Game Over</div>
        <div className="text-4xl font-bold my-3" style={{ color: ACCENT }}>{streak}</div>
        <div className="text-sm mb-1" style={{ color: "var(--c-muted)" }}>correct in a row</div>
        {getBest() >= streak && streak > 0 && (
          <div className="text-sm font-semibold mt-1 mb-4" style={{ color: ACCENT }}>Personal best: {getBest()} 🔥</div>
        )}
        <div className="space-y-3 mt-4">
          <button onClick={start} className="w-full py-3 rounded-lg font-semibold text-white" style={{ backgroundColor: ACCENT }}>
            Try Again
          </button>
          <Link href="/" className="block w-full py-3 rounded-lg border font-medium text-center" style={{ borderColor: "var(--c-border)", color: "var(--c-ink)" }}>
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  if (questions.length === 0) return <div className="py-6 text-center" style={{ color: "var(--c-muted)" }}>No questions available.</div>

  const q = questions[index % questions.length]
  const parsed = JSON.parse(q.answerData)

  function recordAnswer(isCorrect: boolean) {
    lastCorrect.current = isCorrect
    setSelected("done")
    if (isCorrect) {
      const next = streak + 1
      setStreak(next)
      setBest(next)
      setBestState(getBest())
    }
    setPhase("revealed")
  }

  function handleMCQ(i: number) {
    if (phase !== "answering") return
    recordAnswer(i === parsed.correctIndex)
    setSelected(String(i))
  }

  function handleTF(val: boolean) {
    if (phase !== "answering") return
    recordAnswer(val === parsed.correct)
    setSelected(String(val))
  }

  function next() {
    if (!lastCorrect.current) { setPhase("dead"); return }
    setSelected(null); setPhase("answering"); setIndex((i) => i + 1)
  }

  return (
    <div>
      {/* Streak counter */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tabular-nums" style={{ color: ACCENT }}>{streak}</span>
          <span className="text-sm font-semibold" style={{ color: "var(--c-muted)" }}>streak</span>
        </div>
        {best > 0 && (
          <div className="text-xs" style={{ color: "var(--c-dim)" }}>Best: {best} 🔥</div>
        )}
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-medium px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: diffColor[q.difficulty] ?? "#6b7280" }}>
          {q.difficulty}
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: "var(--c-subtle)", color: "var(--c-muted)" }}>
          {q.bookTitle} · {q.chapterTitle}
        </span>
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
              <button key={i} onClick={() => handleMCQ(i)} disabled={phase !== "answering"}
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
        <div className={`mt-4 p-4 rounded-lg border ${lastCorrect.current ? "bg-[#f0fdf4] border-[#bbf7d0]" : "bg-[#fef2f2] border-[#fecaca]"}`}>
          <div className="text-xs font-semibold uppercase mb-1.5" style={{ color: "var(--c-muted)" }}>
            {lastCorrect.current ? "✓ Correct" : "✗ Incorrect"} — Explanation
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink)" }}>{q.explanation}</p>
        </div>
      )}

      {phase === "revealed" && (
        <button onClick={next}
          className="w-full mt-4 py-3 rounded-lg font-semibold text-white text-sm"
          style={{ backgroundColor: lastCorrect.current ? ACCENT : "#dc2626" }}
        >
          {lastCorrect.current ? `Continue → (${streak} 🔥)` : "See Score"}
        </button>
      )}
    </div>
  )
}
