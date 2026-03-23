"use client"

import { useState, useRef } from "react"
import { addQuestion } from "@/lib/actions"

interface Props {
  chapters: { id: number; label: string }[]
}

export default function AddQuestionForm({ chapters }: Props) {
  const [type, setType] = useState("MCQ")
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle")
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("saving")
    try {
      const fd = new FormData(e.currentTarget)
      await addQuestion(fd)
      setStatus("done")
      formRef.current?.reset()
      setTimeout(() => setStatus("idle"), 2000)
    } catch {
      setStatus("error")
    }
  }

  const inputClass = "w-full border border-[#e5e7eb] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1a4a8a]"
  const labelClass = "block text-xs font-semibold text-[#6b7280] uppercase mb-1"

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 bg-white border border-[#e5e7eb] rounded-xl p-5">
      <div>
        <label className={labelClass}>Chapter</label>
        <select name="chapterId" required className={inputClass}>
          {chapters.map((ch) => (
            <option key={ch.id} value={ch.id}>{ch.label}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Type</label>
          <select name="questionType" value={type} onChange={(e) => setType(e.target.value)} className={inputClass}>
            <option value="MCQ">Multiple Choice</option>
            <option value="TRUE_FALSE">True / False</option>
            <option value="FILL_BLANK">Fill in the Blank</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Difficulty</label>
          <select name="difficulty" className={inputClass}>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Question stem</label>
        <textarea name="stem" required rows={3} className={inputClass} placeholder="Enter the question…" />
      </div>

      {type === "MCQ" && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <div key={i}>
              <label className={labelClass}>Choice {String.fromCharCode(65 + i)}</label>
              <input name={`choice${i}`} required className={inputClass} placeholder={`Option ${String.fromCharCode(65 + i)}`} />
            </div>
          ))}
          <div>
            <label className={labelClass}>Correct answer (A/B/C/D → 0/1/2/3)</label>
            <select name="correctIndex" className={inputClass}>
              {[0, 1, 2, 3].map((i) => (
                <option key={i} value={i}>{String.fromCharCode(65 + i)}</option>
              ))}
            </select>
          </div>
        </>
      )}

      {type === "TRUE_FALSE" && (
        <div>
          <label className={labelClass}>Correct answer</label>
          <select name="tfAnswer" className={inputClass}>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
      )}

      {type === "FILL_BLANK" && (
        <div>
          <label className={labelClass}>Accepted answers (separate with |)</label>
          <input name="accepted" required className={inputClass} placeholder="answer1 | answer2" />
        </div>
      )}

      <div>
        <label className={labelClass}>Explanation</label>
        <textarea name="explanation" required rows={3} className={inputClass} placeholder="Explain why this answer is correct…" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Source reference (optional)</label>
          <input name="sourceRef" className={inputClass} placeholder="Hull p.42" />
        </div>
        <div>
          <label className={labelClass}>Tags (comma-separated)</label>
          <input name="tags" className={inputClass} placeholder="options, bsm" />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "saving"}
        className="w-full py-2.5 rounded-lg text-white font-semibold text-sm bg-[#1a4a8a] disabled:opacity-60"
      >
        {status === "saving" ? "Saving…" : status === "done" ? "✓ Saved!" : "Add Question"}
      </button>
      {status === "error" && <p className="text-sm text-[#dc2626]">Error saving. Try again.</p>}
    </form>
  )
}
