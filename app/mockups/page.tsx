import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mockups",
  description:
    "Before-and-after examples of websites I've rebuilt — real businesses, real results. See what a modern site actually looks like.",
}

export default function MockupsPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-12">
      <h1 className="text-3xl font-semibold text-ink mt-12">Mockups</h1>
      <p className="text-muted mt-4">Content coming in Phase 1.</p>
    </main>
  )
}
