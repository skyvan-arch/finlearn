"use client"

import { useRef, useState } from "react"
import { addFlashcard } from "@/lib/actions"

interface Props {
  chapters: { id: number; label: string }[]
}

export default function AddFlashcardForm({ chapters }: Props) {
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle")
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("saving")
    try {
      const fd = new FormData(e.currentTarget)
      await addFlashcard(fd)
      setStatus("done")
      formRef.current?.reset()
      setTimeout(() => setStatus("idle"), 2000)
    } catch {
      setStatus("error")
    }
  }

  const inputClass = "w-full border border-[#e5e7eb] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2d6a4f]"
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
      <div>
        <label className={labelClass}>Front (term / concept)</label>
        <input name="front" required className={inputClass} placeholder="e.g. Put-Call Parity" />
      </div>
      <div>
        <label className={labelClass}>Back (definition / formula)</label>
        <textarea name="back" required rows={4} className={inputClass} placeholder="c + Ke^(−rT) = p + S₀  …" />
      </div>
      <div>
        <label className={labelClass}>Tags (comma-separated)</label>
        <input name="tags" className={inputClass} placeholder="options, parity" />
      </div>
      <button
        type="submit"
        disabled={status === "saving"}
        className="w-full py-2.5 rounded-lg text-white font-semibold text-sm bg-[#2d6a4f] disabled:opacity-60"
      >
        {status === "saving" ? "Saving…" : status === "done" ? "✓ Saved!" : "Add Flashcard"}
      </button>
      {status === "error" && <p className="text-sm text-[#dc2626]">Error saving. Try again.</p>}
    </form>
  )
}
