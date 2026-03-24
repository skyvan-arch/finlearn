import Link from "next/link"
import SurvivalEngine from "@/components/challenge/SurvivalEngine"

export default function SurvivalPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm mb-4 inline-block" style={{ color: "var(--c-muted)" }}>
        ← Back
      </Link>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--c-ink)" }}>Survival Mode</h1>
        <p className="text-sm" style={{ color: "var(--c-muted)" }}>One mistake ends your run. How far can you go?</p>
      </div>
      <SurvivalEngine />
    </main>
  )
}
