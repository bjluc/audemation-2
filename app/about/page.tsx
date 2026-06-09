import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description:
    "Twenty-plus years running businesses, full-stack engineer, London-based. I work solo — no agency overhead, no account managers, no handoffs.",
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-12">
      <h1 className="text-3xl font-semibold text-ink mt-12">About</h1>
      <p className="text-muted mt-4">Content coming in Phase 1.</p>
    </main>
  )
}
