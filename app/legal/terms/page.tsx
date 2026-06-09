import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "The terms that cover how audemation delivers websites and automations for UK small businesses.",
}

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-12">
      <h1 className="text-3xl font-semibold text-ink mt-12">
        Terms of service
      </h1>
      <p className="text-muted mt-4">Content coming in Phase 1.</p>
    </main>
  )
}
