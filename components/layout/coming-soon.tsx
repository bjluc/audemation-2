import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";

type ComingSoonProps = {
  /** The page title, used for both <h1> and document.title (template will suffix it) */
  title: string;
  /** A 1-sentence pitch explaining what this page will be about */
  description: string;
  /** A short list of sections/features that will appear here, shown as a teaser */
  teasers?: string[];
};

/**
 * ComingSoon — shared template for the page stubs that get filled in during Phase 1.
 * Matches the new design (gradient accents, brand colour, fade-in).
 */
export function ComingSoon({ title, description, teasers }: ComingSoonProps) {
  return (
    <>
      <section className="bg-hero-gradient">
        <div className="container-x py-20 md:py-28">
          <FadeIn className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-line text-sm font-medium text-fg-muted shadow-soft">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              Coming in Phase 1
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold text-fg leading-[1.05] tracking-tight text-balance">
              {title}
            </h1>
            <p className="mt-6 text-lg text-fg-muted max-w-2xl leading-relaxed text-pretty">
              {description}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section bg-bg">
        <div className="container-x">
          <FadeIn>
            <div className="card-lift max-w-3xl">
              <h2 className="text-2xl font-semibold text-fg">
                What will be on this page
              </h2>
              {teasers && teasers.length > 0 ? (
                <ul className="mt-5 space-y-3">
                  {teasers.map((t, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-fg-muted"
                    >
                      <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                      <span className="leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-fg-muted">
                  Real content arrives in Phase 1 of the build.
                </p>
              )}

              <div className="mt-8 pt-6 border-t border-line flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="btn-brand group">
                  Get your free mockup
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link href="/" className="btn-outline">
                  Back to home
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

/** Helper to build metadata objects for the coming-soon pages */
export function comingSoonMetadata(title: string, description: string): Metadata {
  return { title, description };
}
