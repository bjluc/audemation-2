import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Get a free mockup",
  description:
    "Tell me about your business and your current website. I will build you a free modern sample within a couple of days — no commitment, no catch.",
}

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-12">
      <h1 className="text-3xl font-semibold text-ink mt-12">
        Get a free mockup
      </h1>
      <p className="text-muted mt-4">Content coming in Phase 1.</p>
    </main>
  )
}
