import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  Pencil,
  Send,
  Wrench,
  Sparkles,
  TrendingUp,
  Check,
  X,
  ArrowRight,
} from "lucide-react";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "The full six-step system — from spotting a tired site to delivering the real thing. Plain English, no agency overhead.",
};

const steps = [
  {
    icon: Search,
    title: "Spot",
    blurb:
      "I keep a running list of outdated sites across a range of UK industries and locations. If yours is on it, you'll hear from me — no cold-call scripts, just a straight note.",
  },
  {
    icon: Pencil,
    title: "Mock",
    blurb:
      "Each week I pick one or two promising businesses and build a free modern sample. Your real content, your colours, your logo — not a template filled with placeholder text.",
  },
  {
    icon: Send,
    title: "Send",
    blurb:
      "You get a short, plain-English message with a link to the mockup. No pitch deck, no calendar booking link, no pressure. If you like it, we talk. If not, you keep it.",
  },
  {
    icon: Wrench,
    title: "Deliver",
    blurb:
      "If you say yes, I build the real thing — production-quality, clean code, yours to host wherever you like. Most sites go live within two to three weeks of a green light.",
  },
  {
    icon: Sparkles,
    title: "Upsell",
    blurb:
      "Once the site is live, I look at how your business handles enquiries, bookings, and follow-ups, then propose the automations that would genuinely save you time. Nothing is sold on the day.",
  },
  {
    icon: TrendingUp,
    title: "Watch",
    blurb:
      "The first paid client tells me which niche to go deeper in. The second confirms it. That focus keeps quality up and costs down — for both of us.",
  },
];

const gets = [
  "A production-ready website built on clean code — fast, mobile-first, and hosted on your own account.",
  "Automations built around how your business actually works: enquiry handling, booking capture, review requests, or something else entirely.",
  "The full source code and all assets. Yours to keep once the project is paid in full.",
  "Plain-English communication throughout. No jargon, no hidden charges, no terms designed to confuse.",
];

const doesntGet = [
  "No monthly retainers. One project, one price, agreed up front.",
  "No agency lock-in. You own the code and can take it to any developer.",
  "No upsell pressure on the day you receive the mockup.",
  "No bloated process — no discovery workshops, no 30-page proposals.",
];

const faqs = [
  {
    q: "How long does the free mockup take?",
    a: "Most mockups are ready within two to three working days of me picking your business. You get a link to a live preview — no waiting for a PDF attachment.",
  },
  {
    q: "What do I get to keep if I say no?",
    a: "The mockup itself. It's a real, working design and you're welcome to use it as a brief for another developer, or simply to show your current designer what you had in mind. No strings attached.",
  },
  {
    q: "What are the payment terms on a real project?",
    a: "Typically 50% upfront and 50% on go-live. For smaller jobs I may ask for the full amount upfront. Nothing is invoiced until we've agreed the scope in writing.",
  },
  {
    q: "What happens if I ignore the message about my mockup?",
    a: "Nothing. I won't chase you, and there's no follow-up email sequence. If you change your mind later, you can always get in touch — the offer stands.",
  },
  {
    q: "Who owns the code, and who handles hosting?",
    a: "You own the code outright once the project is paid in full. Hosting is your choice — I'll recommend a provider that fits your budget and traffic, and help you set it up, but your site sits on your account, not mine.",
  },
  {
    q: "How many revisions are included?",
    a: "Two rounds of revisions are included after the initial build. Anything beyond that is billed at a flat day rate, agreed before any extra work starts. In practice, most projects are done in one round.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden bg-hero-gradient">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-40 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
          style={{
            background: "radial-gradient(circle, #818cf8 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, #c084fc 0%, transparent 70%)",
          }}
        />
        <div className="container-x relative pt-20 md:pt-32 pb-20 md:pb-28">
          <FadeIn className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-line text-sm font-medium text-fg-muted shadow-soft">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              Six steps. Weeks, not months.
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold text-fg leading-[1.05] tracking-tight text-balance">
              How this works.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-fg-muted max-w-2xl leading-relaxed text-pretty">
              From spotting a tired site to handing over a working product —
              the full system, explained plainly. No agency process, no
              inflated timelines.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ========== THE 6 STEPS ========== */}
      <section className="section bg-bg">
        <div className="container-x">
          <FadeIn className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-fg tracking-tight text-balance">
              Six steps. No surprises.
            </h2>
            <p className="mt-4 text-lg text-fg-muted text-pretty">
              The whole thing is predictable by design. You always know where
              you are and what happens next.
            </p>
          </FadeIn>

          <FadeInStagger className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* ========== WHAT YOU GET / WHAT YOU DON'T GET ========== */}
      <section className="section bg-bg-alt">
        <div className="container-x">
          <FadeIn className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-fg tracking-tight text-balance">
              What&apos;s included — and what isn&apos;t.
            </h2>
            <p className="mt-4 text-lg text-fg-muted text-pretty">
              The straight answers to questions most agencies bury in their
              proposals.
            </p>
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeIn>
              <div className="card-lift h-full">
                <h3 className="text-xl font-semibold text-fg mb-6">
                  What you get
                </h3>
                <ul className="space-y-4">
                  {gets.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-soft text-brand">
                        <Check className="w-3 h-3" />
                      </span>
                      <span className="text-fg-muted text-sm leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="card-lift h-full">
                <h3 className="text-xl font-semibold text-fg mb-6">
                  What you don&apos;t get
                </h3>
                <ul className="space-y-4">
                  {doesntGet.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-50 text-red-500">
                        <X className="w-3 h-3" />
                      </span>
                      <span className="text-fg-muted text-sm leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="section bg-bg">
        <div className="container-x">
          <FadeIn className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-fg tracking-tight text-balance">
              Common questions.
            </h2>
            <p className="mt-4 text-lg text-fg-muted text-pretty">
              The things people usually want to know before they reply to my
              message.
            </p>
          </FadeIn>

          <FadeIn className="mt-12 max-w-3xl">
            {faqs.map((faq, i) => (
              <details
                key={faq.q}
                className={`group py-5 border-b border-line${i === 0 ? " border-t" : ""}`}
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-fg font-semibold text-base md:text-lg select-none">
                  <span>{faq.q}</span>
                  <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full border border-line text-fg-muted transition-transform duration-200 group-open:rotate-45">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M5 1v8M1 5h8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-fg-muted leading-relaxed text-pretty pr-10">
                  {faq.a}
                </p>
              </details>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="section bg-dark-gradient text-fg-on-dark">
        <div className="container-x">
          <FadeIn className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance">
              Ready to see what your site could look like?
            </h2>
            <p className="mt-5 text-lg text-fg-muted-on-dark text-pretty">
              Send me your business name and current site. I&apos;ll come back
              with a free mockup in two to three days.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-white text-fg font-semibold text-base hover:bg-bg-tint transition-colors"
              >
                Get your free mockup
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/mockups"
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl border border-line-on-dark text-fg-on-dark font-semibold text-base hover:bg-white/5 transition-colors"
              >
                See examples
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
