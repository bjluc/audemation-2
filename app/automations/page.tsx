import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Automations",
  description:
    "Once your site is live, here is what we can add on: AI enquiry handling, lead tracking, review requests, and more — built around how your business actually works.",
}

export default function AutomationsPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-12">
      <h1 className="text-3xl font-semibold text-ink mt-12">Automations</h1>
      <p className="text-muted mt-4">Content coming in Phase 1.</p>
    </main>
  )
}
