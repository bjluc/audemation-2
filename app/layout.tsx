import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  // Canonical host is www: audemation.com 308-redirects to www.audemation.com,
  // so metadata must agree with the redirect or every canonical URL points
  // at a host that immediately bounces.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "audemation — Free website mockups for UK small businesses",
    template: "%s — audemation",
  },
  description:
    "I find UK small businesses with tired websites, build them a free modern sample, and if they want it I deliver the real thing plus the automations that make it pay for itself.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  // "./" resolves against metadataBase per route — every page gets its
  // own canonical URL without repeating this in each page's metadata
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "audemation",
    title: "audemation — Free website mockups for UK small businesses",
    description:
      "I find UK small businesses with tired websites, build them a free modern sample, and if they want it I deliver the real thing plus the automations that make it pay for itself.",
    // Resolves against metadataBase. Without this LinkedIn renders shares as
    // a thin text strip instead of a large card.
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "audemation — free website mockups for UK small businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "audemation — Free website mockups for UK small businesses",
    description:
      "I find UK small businesses with tired websites, build them a free modern sample, and if they want it I deliver the real thing plus the automations that make it pay for itself.",
  },
};

// Structured data for search engines — service business, London-based
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "audemation",
  url: SITE_URL,
  description:
    "Free website mockups for UK small businesses, with full builds and automations when you're ready.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "London",
    addressCountry: "GB",
  },
  areaServed: "GB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // suppressHydrationWarning: next-themes sets the .dark class on
  // <html> before hydration, which React would otherwise flag
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla's
          cz-shortcut-listen) inject attributes on <body> before React
          hydrates; only attribute diffs on this element are suppressed */}
      <body className="antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
