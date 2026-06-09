import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How it works",
  description:
    "A plain-English explanation of the six-step process: from spotting a tired website to delivering the finished site and the automations that keep it working.",
}

export default function HowItWorksPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-12">
      <h1 className="text-3xl font-semibold text-ink mt-12">How it works</h1>
      <p className="text-muted mt-4">Content coming in Phase 1.</p>
    </main>
  )
}
