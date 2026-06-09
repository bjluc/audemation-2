import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How audemation collects, uses, and protects your data.",
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-12">
      <h1 className="text-3xl font-semibold text-ink mt-12">Privacy policy</h1>
      <p className="text-muted mt-4">Content coming in Phase 1.</p>
    </main>
  )
}
