import type { Metadata } from "next";
import { SITE_URL } from "./site";

/**
 * Per-page Open Graph blocks.
 *
 * Next does NOT deep-merge `openGraph`: a page that defines the field
 * replaces the root layout's block wholesale, silently dropping images,
 * type, siteName and locale. So every page has to emit the complete
 * object, and this helper is what keeps the shared half in one place.
 *
 * It also carries `url`, which cannot be relative — unlike
 * `alternates.canonical`, a relative `openGraph.url` is dropped rather
 * than resolved against metadataBase, emitting no og:url tag at all.
 */
// SITE_URL lives in lib/site.ts so sitemap/robots can share it.

const SHARED = {
  type: "website",
  locale: "en_GB",
  siteName: "audemation",
  images: [
    {
      url: "/og.png",
      width: 1200,
      height: 630,
      alt: "audemation — free website mockups for UK small businesses",
    },
  ],
} satisfies Partial<NonNullable<Metadata["openGraph"]>>;

export function pageOpenGraph({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  /** Route path with a leading slash; "" for the homepage. */
  path: string;
}): Metadata["openGraph"] {
  return { ...SHARED, url: `${SITE_URL}${path}`, title, description };
}
