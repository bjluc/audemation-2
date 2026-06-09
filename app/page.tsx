import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  Pencil,
  Send,
  Bot,
  MessageSquare,
  CalendarCheck,
  Star,
  ArrowRight,
} from "lucide-react";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "audemation — Free website mockups for UK small businesses",
  description:
    "I find UK small businesses whose websites are doing them no favours, build a modern sample at no charge, and if you want it — I deliver the real thing.",
};

const steps = [
  {
    icon: Search,
    title: "Spot",
    blurb:
      "I keep a running list of UK small businesses whose websites are overdue an update. Yours might be on it.",
  },
  {
    icon: Pencil,
    title: "Mock",
    blurb:
      "I build a free modern sample of your site, in your brand, with your real content. No pitch, no obligation.",
  },
  {
    icon: Send,
    title: "Send",
    blurb:
      "You get the mockup with a short, plain-English note. If you'd like to take it further, we talk; if not, you keep it.",
  },
];

const automations = [
  {
    icon: MessageSquare,
    title: "AI enquiry handler",
    blurb: "Replies to common customer questions on your site, 24/7.",
  },
  {
    icon: Bot,
    title: "Lead → CRM pipeline",
    blurb: "Every form submission lands in your CRM, tagged and ready.",
  },
  {
    icon: CalendarCheck,
    title: "Booking capture",
    blurb: "Takes bookings from your site straight to your calendar.",
  },
  {
    icon: Star,
    title: "Review requests",
    blurb: "Asks happy customers for a Google review, on a sensible delay.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden bg-hero-gradient">
        {/* Decorative gradient blob */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-40 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #818cf8 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #c084fc 0%, transparent 70%)",
          }}
        />

        <div className="container-x relative pt-20 md:pt-32 pb-20 md:pb-28">
          <FadeIn className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-line text-sm font-medium text-fg-muted shadow-soft">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              Free mockup. No credit card. No catch.
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold text-fg leading-[1.05] tracking-tight text-balance">
              I rebuild your tired website for free.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-fg-muted max-w-2xl leading-relaxed text-pretty">
              I find UK small businesses whose websites are doing them no
              favours, build a modern sample at no charge, and if you want it —
              I deliver the real thing.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="btn-brand group">
                Get your free mockup
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/how-it-works" className="btn-outline group">
                See how it works
              </Link>
            </div>
            <p className="mt-6 text-sm text-fg-muted">
              Most mockups turned around in 2–3 days.{" "}
              <Link
                href="/mockups"
                className="text-brand font-medium hover:underline"
              >
                See examples →
              </Link>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="section bg-bg">
        <div className="container-x">
          <FadeIn className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-fg tracking-tight text-balance">
              Three steps. Two weeks. Zero upfront.
            </h2>
            <p className="mt-4 text-lg text-fg-muted text-pretty">
              The whole thing runs on a simple, repeatable system. No agency
              overhead, no jargon, no surprises.
            </p>
          </FadeIn>

          <FadeInStagger className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <FadeInItem key={step.title}>
                  <div className="card-lift h-full">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-brand-soft text-brand">
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="text-sm font-semibold text-fg-muted">
                        Step {i + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold text-fg">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-fg-muted leading-relaxed">
                      {step.blurb}
                    </p>
                  </div>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </div>
      </section>

      {/* ========== MOCKUPS PREVIEW ========== */}
      <section className="section bg-bg-alt">
        <div className="container-x">
          <FadeIn className="max-w-2xl">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-line text-sm font-medium text-fg-muted">
              Mockups
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-fg tracking-tight text-balance">
              Real mockups, built for real businesses.
            </h2>
            <p className="mt-4 text-lg text-fg-muted text-pretty">
              A small gallery of before-and-afters. The featured entry is the
              previous version of this very site.
            </p>
          </FadeIn>

          <FadeInStagger className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <FadeInItem key={n}>
                <div className="card-lift h-full overflow-hidden p-0">
                  {/* Placeholder image area */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-brand-soft to-warm-soft flex items-center justify-center">
                    <span className="text-sm font-medium text-fg-muted">
                      Mockup {n}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-semibold text-fg">
                      Local business · Anonymised
                    </p>
                    <p className="mt-1 text-sm text-fg-muted">
                      Real example coming in Phase 1
                    </p>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>

          <FadeIn delay={0.1} className="mt-10">
            <Link
              href="/mockups"
              className="inline-flex items-center text-brand font-semibold hover:underline group"
            >
              See the full gallery
              <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ========== AUTOMATIONS PREVIEW ========== */}
      <section className="section bg-bg">
        <div className="container-x">
          <FadeIn className="max-w-2xl">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-line text-sm font-medium text-fg-muted">
              Automations
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-fg tracking-tight text-balance">
              Once your site is live, here&apos;s what we can bolt on.
            </h2>
            <p className="mt-4 text-lg text-fg-muted text-pretty">
              These run while you sleep. They pay for the site within a few
              months — then they keep paying.
            </p>
          </FadeIn>

          <FadeInStagger className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {automations.map((a) => {
              const Icon = a.icon;
              return (
                <FadeInItem key={a.title}>
                  <div className="card-lift h-full">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-warm-soft text-warm-hover">
                      <Icon className="w-5 h-5" />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-fg">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-sm text-fg-muted leading-relaxed">
                      {a.blurb}
                    </p>
                  </div>
                </FadeInItem>
              );
            })}
          </FadeInStagger>

          <FadeIn delay={0.1} className="mt-10">
            <Link
              href="/automations"
              className="inline-flex items-center text-brand font-semibold hover:underline group"
            >
              See all automations
              <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="section bg-dark-gradient text-fg-on-dark">
        <div className="container-x">
          <FadeIn className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance">
              Ready for a website that works?
            </h2>
            <p className="mt-5 text-lg text-fg-muted-on-dark text-pretty">
              Send me your business name and current site. I&apos;ll come back
              with a free mockup in 2–3 days.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-white text-fg font-semibold text-base hover:bg-bg-tint transition-colors"
              >
                Get your free mockup
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl border border-line-on-dark text-fg-on-dark font-semibold text-base hover:bg-white/5 transition-colors"
              >
                About me
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
