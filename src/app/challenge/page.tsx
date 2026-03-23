import Link from "next/link"
import ChallengeEngine from "@/components/challenge/ChallengeEngine"

export default function ChallengePage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm mb-4 inline-block" style={{ color: "var(--c-muted)" }}>
        ← Back
      </Link>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--c-ink)" }}>Daily Challenge</h1>
        <p className="text-sm" style={{ color: "var(--c-muted)" }}>10 random questions across all books</p>
      </div>
      <ChallengeEngine />
    </main>
  )
}
