import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/fade-in";
import { HeroGrid } from "@/components/hero/hero-grid";

export const metadata: Metadata = {
  title: "About · audemation",
  description:
    "Twenty years running real businesses. Three production systems shipped. London-based, solo, plain English. No agency overhead.",
};

const stack = [
  {
    name: "Next.js",
    description: "React framework for fast, server-rendered websites",
  },
  {
    name: "TypeScript",
    description: "Typed JavaScript that catches mistakes at build time",
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first styling for custom designs without writing raw CSS",
  },
  {
    name: "Shadcn UI",
    description: "Accessible component library built on Radix primitives",
  },
  {
    name: "LangChain",
    description: "Framework for building applications that connect to language models",
  },
  {
    name: "OpenAI",
    description: "The API behind AI text, embeddings, and chatbot integrations",
  },
  {
    name: "Vercel",
    description: "Deployment platform for Next.js sites, with zero-config CI/CD",
  },
  {
    name: "pgvector",
    description: "PostgreSQL extension for vector search: the backbone of RAG pipelines",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden bg-hero-gradient">
        {/* Subtle line grid — site-wide identity motif */}
        <HeroGrid variant="subtle" />

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
              London-based · solo · plain English
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold text-fg leading-[1.05] tracking-tight text-balance">
              I&apos;ve run businesses. I&apos;ve shipped code. Now I do both at once.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-fg-muted max-w-2xl leading-relaxed text-pretty">
              Twenty years in hospitality and serviced accommodation taught me what small
              businesses need from a website. Three production systems taught me how to build it.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ========== THE SHORT VERSION ========== */}
      <section className="section bg-bg">
        <div className="container-x">
          <FadeIn className="max-w-2xl">
            <p className="text-xl md:text-2xl text-fg font-medium leading-relaxed text-pretty">
              I&apos;m a full-stack engineer with twenty years of first-hand experience running
              the kind of businesses I now build websites for. That combination is rarer than it sounds.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ========== THE STORY ========== */}
      <section className="section bg-bg-alt">
        <div className="container-x">
          <FadeIn className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-fg tracking-tight text-balance">
              How I got here
            </h2>
          </FadeIn>
          <div className="mt-8 max-w-2xl space-y-6">
            <FadeIn delay={0.05}>
              <p className="text-lg text-fg-muted leading-relaxed text-pretty">
                I spent over twenty years running my own businesses before I wrote a line of production code. That included a serviced accommodation operation and hospitality work in North London, managing bookings, suppliers, and maintenance schedules. The small crises that come with running a property-based business: a burst pipe at 11pm, a guest who can&apos;t find the key safe, a cleaner who cancels at short notice.
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-lg text-fg-muted leading-relaxed text-pretty">
                I&apos;m a full-stack engineer. I&apos;ve shipped three real production systems. A booking and management platform for my own accommodation business. An AI document-ingestion pipeline for a legal workflow. A multi-channel chatbot that runs on real customer enquiries. They handle real users. They&apos;re still running.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-lg text-fg-muted leading-relaxed text-pretty">
                The AI side is not a bolt-on. I&apos;ve built RAG pipelines using LangChain and pgvector, connected them to OpenAI&apos;s API, and deployed them in workflows that handle actual customer queries. I&apos;ve seen this technology waste money on use cases it can&apos;t handle. I&apos;ve also seen it cut response times from hours to seconds in the right place.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg text-fg-muted leading-relaxed text-pretty">
                I&apos;m based in London. I work alone. My clients deal directly with the engineer. There&apos;s no account manager in between. Plain English throughout. The invoice matches what we agreed.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ========== TECH STACK ========== */}
      <section className="section bg-bg">
        <div className="container-x">
          <FadeIn className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-fg tracking-tight text-balance">
              What I build with
            </h2>
            <p className="mt-4 text-lg text-fg-muted text-pretty">
              These are the tools I use on every project. I&apos;ve shipped production
              code with each one.
            </p>
          </FadeIn>

          <FadeInStagger className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            {stack.map((tool) => (
              <FadeInItem key={tool.name}>
                <div className="card-lift">
                  <p className="font-semibold text-fg">{tool.name}</p>
                  <p className="mt-1 text-sm text-fg-muted">{tool.description}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ========== THE PERSONAL BIT ========== */}
      <section className="section bg-bg-alt">
        <div className="container-x">
          <FadeIn className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-fg tracking-tight text-balance">
              The rest of it
            </h2>
            <p className="mt-6 text-lg text-fg-muted leading-relaxed text-pretty">
              I&apos;m a classically trained chef, forty-plus years in the kitchen, trained in the
              Paul Bocuse tradition. I run a personal chef service at{" "}
              <a
                href="https://bjluc.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand font-medium hover:underline"
              >
                bjluc.co.uk
              </a>
              . I also run{" "}
              <a
                href="https://topstay.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand font-medium hover:underline"
              >
                Topstay.uk
              </a>
              , a B2B serviced-accommodation business based in North London.
            </p>
            <p className="mt-4 text-lg text-fg-muted leading-relaxed text-pretty">
              I cook. I run a serviced-accommodation business. I build websites for a living.
              None of those are on their own enough, but together they cover most of what a
              small business actually needs.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ========== WHY SOLO ========== */}
      <section className="section bg-bg">
        <div className="container-x">
          <FadeIn className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-fg tracking-tight text-balance">
              Why I work solo
            </h2>
            <p className="mt-6 text-lg text-fg-muted leading-relaxed text-pretty">
              When you email me, you email me. No account manager. No sales team. No escalation
              path. The person quoting the work is the person doing the work.
            </p>
            <p className="mt-4 text-lg text-fg-muted leading-relaxed text-pretty">
              That means fewer meetings, lower overhead, and a site that reflects what you
              actually asked for. When there&apos;s only one person on the project, nothing gets
              lost in translation.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="section bg-dark-gradient text-fg-on-dark">
        <div className="container-x">
          <FadeIn className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance">
              Want to see what your site could look like?
            </h2>
            <p className="mt-5 text-lg text-fg-muted-on-dark text-pretty">
              Send me your business name and current site. I&apos;ll come back with a free
              mockup in 2–3 days.
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
                href="/how-it-works"
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl border border-line-on-dark text-fg-on-dark font-semibold text-base hover:bg-white/5 transition-colors"
              >
                See how it works
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
