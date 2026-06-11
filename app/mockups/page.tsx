import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, ChevronDown } from "lucide-react";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "Mockups",
  description:
    "A selection of real sites I've built for clients. Featured entry: the previous audemation.com.",
};

interface GalleryCard {
  id: string;
  category: string;
  caption: string;
  detail: string;
  image: string;
  imageAlt: string;
  liveUrl?: string;
  liveLabel?: string;
  secondaryUrl?: string;
  secondaryLabel?: string;
}

const galleryCards: GalleryCard[] = [
  {
    id: "casacomfort",
    category: "Serviced accommodation · Rugby & Liverpool",
    caption:
      "Custom branding and a multi-property site covering Rugby and Liverpool under one roof.",
    detail:
      "Built for a serviced-accommodation operator running two properties: a Rugby unit for contractors near the motorway junctions, and a Liverpool unit. The site is a single WordPress build with a separate landing page per property, a unified booking enquiry flow, and a crown-and-house mark in black and amber so the brand reads as one company even though the locations are 120 miles apart.",
    image: "/mockups/casacomfort-home.png",
    imageAlt:
      "Screenshot of Casa Comfort Stay, a serviced-accommodation site with a black and amber brand, custom crown logo, and three property cards (Rugby, Liverpool, Landlords).",
    liveUrl: "https://casacomfortstay.co.uk/",
    liveLabel: "View the live site",
  },
  {
    id: "anshappyhomes",
    category: "Holiday rental · Mechelen, Belgium",
    caption:
      "Custom logo, olive-and-yellow identity, and a full-bleed hero built around the property's own photographs.",
    detail:
      "Built for a holiday rental in Mechelen, Belgium, close to the canal and an easy walk from the city centre. The most distinctive part of the build is the photography: every photo on the site is of the actual property (interior, garden, kitchen, lounge), taken on a phone by the host, not stock. The custom house-in-laurel-wreath mark and the olive-and-yellow palette are tied to the property's own front door colour, so the brand and the building line up. One click takes a visitor to a Book Now CTA above the fold.",
    image: "/mockups/anshappyhomes-home.png",
    imageAlt:
      "Screenshot of Ans Happy Homes, a Mechelen holiday rental with a custom laurel-wreath logo, olive-green header, and a full-bleed photo of the property's dining area looking out to the garden.",
    liveUrl: "https://www.anshappyhomes.com/",
    liveLabel: "View the live site",
  },
  {
    id: "chiaora",
    category: "3D design prototype · Chelmsford",
    caption:
      "Built a dark 3D motion prototype to pitch a from-scratch rebrand. The client chose WordPress for delivery; that build is live now.",
    detail:
      "I designed and built the prototype to show the client what was possible: a dark theme, animated purple topography background, a 3D rendered model of the project house as the hero, and a small single-mouse scroll cue. The full WordPress site at chiaora.co.uk is the final delivered version. Different stack, same brief. Both links are below.",
    image: "/mockups/chiaora-prototype.png",
    imageAlt:
      "Screenshot of the Chiaora 3D motion prototype, a dark website with a 3D rendered modern house as the hero, purple topography lines flowing through the background, and the headline Hi, I'm Massimo.",
    liveUrl: "https://chiaora.onrender.com/",
    liveLabel: "View the 3D prototype",
    secondaryUrl: "https://chiaora.co.uk/",
    secondaryLabel: "View the WordPress site",
  },
];

export default function MockupsPage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="section bg-hero-gradient">
        <div className="container-x">
          <FadeIn className="max-w-2xl">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-surface border border-line text-sm font-medium text-fg-muted">
              Mockups
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold text-fg tracking-tight text-balance">
              The gallery.
            </h1>
            <p className="mt-5 text-lg md:text-xl text-fg-muted max-w-xl leading-relaxed text-pretty">
              Real sites, built for clients. The featured entry is the
              previous version of the very site you&apos;re reading now.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ========== FEATURED ENTRY ========== */}
      <section className="section bg-bg-alt">
        <div className="container-x">
          <FadeIn>
            <div
              className="relative overflow-hidden rounded-3xl bg-surface border-2 border-brand/20"
              style={{ boxShadow: "var(--shadow-card-hover)" }}
            >
              {/* "Featured" pill */}
              <div className="absolute top-5 left-5 z-10">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-line text-sm font-medium text-fg-muted shadow-soft">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                  Featured
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 md:items-center">
                {/* Image side — actual screenshot of the old site */}
                <div className="aspect-[8/5] p-6 md:p-8 border-b md:border-b-0 md:border-r border-line">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/mockups/audemation-old-home.png"
                    alt="Screenshot of the previous audemation.com — an Airbnb chatbot service"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Text side */}
                <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-fg text-balance">
                    audemation.com: the pivot
                  </h2>
                  <p className="mt-3 text-fg-muted leading-relaxed">
                    The first entry in the gallery is the previous version
                    of this site, which served a different business entirely.
                  </p>

                  <div className="mt-6 space-y-3 text-sm md:text-base text-fg-muted leading-relaxed">
                    <p>
                      The old site was a dark, AI-focused pitch for an
                      Airbnb chatbot service: a stock-photo man in a suit,
                      purple gradients, and six navigation items
                      (Home, About, Services, Benefits, Technology,
                      AirbnbBot, Contact). It told a narrow story about
                      one specific automation product, aimed at a narrow
                      audience.
                    </p>
                    <p>
                      This version keeps the brand name and the purple/indigo
                      identity but pivots the whole site to what audemation
                      actually does now: free website mockups for UK small
                      businesses, with a separate page for the automations
                      work that the old site led with. The hero says what
                      the offer is in the first sentence, the navigation is
                      lighter, and the contact form is one field set
                      instead of three scattered calls to action.
                    </p>
                    <p>
                      The old site is still live if you want to compare
                      side by side.
                    </p>
                  </div>

                  <div className="mt-8">
                    <Link
                      href="https://audemation.vercel.app"
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
              Real sites, live now. Click any card for the project detail.
            </p>
          </FadeIn>

          <FadeInStagger className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryCards.map((card) => (
              <FadeInItem key={card.id}>
                <details className="group card-lift overflow-hidden p-0">
                  <summary className="list-none cursor-pointer">
                    {/* Card image — real site screenshot */}
                    <div className="aspect-[4/3] bg-bg-alt overflow-hidden border-b border-line">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={card.image}
                        alt={card.imageAlt}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="p-5 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-fg">
                          {card.category}
                        </p>
                        <p className="mt-1 text-sm text-fg-muted leading-snug">
                          {card.caption}
                        </p>
                      </div>
                      <ChevronDown className="w-4 h-4 text-fg-muted shrink-0 mt-0.5 transition-transform duration-300 group-open:rotate-180" />
                    </div>
                  </summary>

                  {/* Expanded detail */}
                  <div className="border-t border-line px-5 pt-4 pb-5">
                    <p className="text-sm text-fg-muted leading-relaxed">
                      {card.detail}
                    </p>

                    {(card.liveUrl || card.secondaryUrl) && (
                      <div className="mt-5 flex flex-col sm:flex-row sm:flex-wrap gap-3">
                        {card.liveUrl && (
                          <Link
                            href={card.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-brand text-fg-on-brand text-sm font-semibold hover:opacity-90 transition-opacity"
                          >
                            {card.liveLabel ?? "View the live site"}
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        )}
                        {card.secondaryUrl && (
                          <Link
                            href={card.secondaryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-line text-fg text-sm font-semibold hover:bg-bg-alt transition-colors"
                          >
                            {card.secondaryLabel ?? "View the live site"}
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    )}
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
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl whitespace-nowrap bg-white text-slate-900 font-semibold text-base hover:bg-indigo-50 transition-colors"
              >
                Get your free mockup
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl whitespace-nowrap border border-line-on-dark text-fg-on-dark font-semibold text-base hover:bg-white/5 transition-colors"
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
