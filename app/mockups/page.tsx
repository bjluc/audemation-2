import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, ChevronDown } from "lucide-react";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "Mockups",
  description:
    "A before-and-after gallery of website rebuilds for UK small businesses. Featured entry: the previous audemation.com.",
};

interface GalleryCard {
  id: string;
  category: string;
  caption: string;
  whatChanged: string;
}

const galleryCards: GalleryCard[] = [
  {
    id: "tradesperson",
    category: "Tradesperson · North England",
    caption:
      "Replaced stock photos with real job-site photographs; cut the enquiry form from seven fields to three.",
    whatChanged:
      "The original site relied on generic construction stock photos that looked nothing like the actual work on offer. Swapping them for real on-site photographs — even imperfect phone shots — immediately grounded the business and gave visitors something concrete to judge. The enquiry form had accumulated seven fields over the years: full name, company, address, two phone numbers, project type, and a budget range. Cutting it to name, email, and a short description removed the main reason people were abandoning it halfway through.",
  },
  {
    id: "cafe",
    category: "Independent café · Bristol",
    caption:
      "Added a live menu in place of a downloadable PDF; moved the address and opening hours above the fold.",
    whatChanged:
      "The menu was buried two clicks deep as a PDF last updated in 2021 — invisible to anyone on a phone, and impossible to update without a designer. Replacing it with a simple scrollable page means it works on any device and can be changed in under a minute. The address and opening hours — the two things most café visitors actually need — were hidden in the footer. Moving them above the fold saved first-time visitors from hunting around the page.",
  },
  {
    id: "chiropractor",
    category: "Chiropractor · Surrey",
    caption:
      "Rebuilt the booking flow as a single-page form; removed an animated banner that was breaking on mobile.",
    whatChanged:
      "Booking an appointment required clicking through to a third-party site that opened in a new tab, with a different visual style and no clear confirmation step. Bringing the booking form directly onto the main site — three fields, one submit button — removed the point of confusion where most visitors were dropping off. An animated banner from an earlier era of the web was causing layout breakages on modern mobile browsers; removing it alone improved the mobile experience noticeably.",
  },
  {
    id: "accountant",
    category: "Accountant · Manchester",
    caption:
      "Added a plain-English pricing page; rewrote the services section so a non-accountant can follow it.",
    whatChanged:
      "The services page described what the firm did in precise accounting terminology — correct, but opaque to a small business owner who just needs to know whether their annual accounts are covered. Rewriting it in plain English, with a concrete list of what each package includes, made the decision much simpler. Adding a pricing page — even a transparent starting-from figure — removed the single most common enquiry, which was almost always asking about rates.",
  },
  {
    id: "bnb",
    category: "Boutique B&B · Brighton",
    caption:
      "Added a direct booking button above the fold; replaced broken gallery thumbnails with full-width room photographs.",
    whatChanged:
      "The only booking option was a link to a major OTA, which meant the B&B was paying commission on every room night they could have taken direct. Adding a clearly labelled 'Book direct' button — visible in the hero before any scrolling — gave guests the option before they clicked away. A gallery of twelve tiny thumbnails, several of which were returning broken image errors, was replaced with five full-width photographs that actually showed the rooms and the seafront view.",
  },
];

export default function MockupsPage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="section bg-hero-gradient">
        <div className="container-x">
          <FadeIn className="max-w-2xl">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-line text-sm font-medium text-fg-muted">
              Mockups
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold text-fg tracking-tight text-balance">
              The gallery.
            </h1>
            <p className="mt-5 text-lg md:text-xl text-fg-muted max-w-xl leading-relaxed text-pretty">
              Before-and-afters from real sites I&apos;ve rebuilt or mocked up
              for UK small businesses. The featured entry is the previous
              version of the very site you&apos;re reading now.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ========== FEATURED ENTRY ========== */}
      <section className="section bg-bg-alt">
        <div className="container-x">
          <FadeIn>
            <div
              className="relative overflow-hidden rounded-3xl bg-white border-2 border-brand/20"
              style={{ boxShadow: "var(--shadow-card-hover)" }}
            >
              {/* "Featured" pill */}
              <div className="absolute top-5 left-5 z-10">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-line text-sm font-medium text-fg-muted shadow-soft">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                  Featured
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image side */}
                <div className="aspect-[4/3] md:aspect-auto md:min-h-[420px] bg-gradient-to-br from-brand-soft to-warm-soft flex flex-col items-center justify-center gap-2">
                  <span className="text-sm font-semibold text-fg-muted">
                    Screenshot — before
                  </span>
                  <span className="text-xs text-fg-muted/60">
                    Previous version
                  </span>
                </div>

                {/* Text side */}
                <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-fg text-balance">
                    audemation.com — the rebuild of this site
                  </h2>
                  <p className="mt-3 text-fg-muted leading-relaxed">
                    The first entry in the gallery is the previous version of
                    the very site you&apos;re looking at.
                  </p>

                  <div className="mt-6 space-y-3 text-sm md:text-base text-fg-muted leading-relaxed">
                    <p>
                      The old site had the right instincts but poor execution.
                      Typography was loose, with too many font weights and
                      inconsistent spacing throughout. The hero said
                      &ldquo;free website mockup&rdquo; but buried the offer in
                      the fourth paragraph — visitors without context had no
                      clear reason to stay.
                    </p>
                    <p>
                      This version tightens everything down to a single clear
                      path: land, understand the offer in ten seconds, and the
                      primary action is immediately in view. The navigation is
                      lighter, the load time is faster, and the copy focuses on
                      what the site actually does rather than describing the
                      person behind it.
                    </p>
                    <p>
                      The contact flow now takes thirty seconds instead of
                      hunting for a buried email address. Real work examples
                      appear in this gallery rather than as vague claims on a
                      services page.
                    </p>
                  </div>

                  <div className="mt-8">
                    {/* TODO: update with the actual old Vercel URL — Bernard will swap this after Wave A */}
                    <Link
                      href="https://audemation-old.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-brand font-semibold hover:underline"
                    >
                      View the previous version
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ========== GALLERY GRID ========== */}
      <section className="section bg-bg">
        <div className="container-x">
          <FadeIn className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-fg tracking-tight text-balance">
              More from the gallery.
            </h2>
            <p className="mt-4 text-lg text-fg-muted text-pretty">
              Anonymised examples from real UK businesses. Click any card to
              see the before-and-after detail.
            </p>
          </FadeIn>

          <FadeInStagger className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryCards.map((card) => (
              <FadeInItem key={card.id}>
                <details className="group card-lift overflow-hidden p-0">
                  <summary className="list-none cursor-pointer">
                    {/* Placeholder image */}
                    <div className="aspect-[4/3] bg-gradient-to-br from-brand-soft to-warm-soft flex items-center justify-center">
                      <span className="text-sm font-medium text-fg-muted">
                        Before &amp; after
                      </span>
                    </div>

                    <div className="p-5 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-fg">
                          {card.category}
                        </p>
                        <p className="mt-1 text-sm text-fg-muted leading-snug">
                          {card.caption}
                        </p>
                        <p className="mt-3 text-xs text-fg-muted/60">
                          Real example coming soon
                        </p>
                      </div>
                      <ChevronDown className="w-4 h-4 text-fg-muted shrink-0 mt-0.5 transition-transform duration-300 group-open:rotate-180" />
                    </div>
                  </summary>

                  {/* Expanded detail */}
                  <div className="border-t border-line px-5 pt-4 pb-5">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="aspect-[4/3] bg-gradient-to-br from-brand-soft to-warm-soft rounded-xl flex items-center justify-center">
                        <span className="text-xs font-medium text-fg-muted">
                          Before
                        </span>
                      </div>
                      <div className="aspect-[4/3] bg-gradient-to-br from-warm-soft to-brand-soft rounded-xl flex items-center justify-center">
                        <span className="text-xs font-medium text-fg-muted">
                          After
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-fg-muted leading-relaxed">
                      {card.whatChanged}
                    </p>
                  </div>
                </details>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="section bg-dark-gradient text-fg-on-dark">
        <div className="container-x">
          <FadeIn className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance">
              Want your site in this gallery?
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
                href="/how-it-works"
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl border border-line-on-dark text-fg-on-dark font-semibold text-base hover:bg-white/5 transition-colors"
              >
                How it works
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
