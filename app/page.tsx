import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "audemation — Free website mockups for UK small businesses",
  description:
    "I find UK small businesses with tired websites, build them a free modern sample, and if they want it I deliver the real thing plus the automations that make it pay for itself.",
}

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-[1200px] px-4 pt-24 pb-16">
        <h1 className="text-4xl md:text-5xl font-semibold text-ink max-w-2xl leading-tight">
          I rebuild your tired website for free.
        </h1>
        <p className="mt-4 text-lg text-muted max-w-xl">
          I find UK small businesses whose websites are doing them no favours,
          build a modern sample at no charge, and if you want it — I deliver the
          real thing.
        </p>
        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex items-center h-11 px-6 rounded-lg bg-accent text-white font-medium hover:bg-accent-hover transition-colors"
          >
            Get your free mockup
          </Link>
        </div>
      </section>

      {/* Placeholder */}
      <section className="mx-auto max-w-[1200px] px-4 py-12">
        <p className="text-sm text-muted">Coming in Phase 1</p>
      </section>
    </main>
  )
}
