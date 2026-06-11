import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
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
  metadataBase: new URL("https://audemation.com"),
  title: {
    default: "audemation — Free website mockups for UK small businesses",
    template: "%s — audemation",
  },
  description:
    "I find UK small businesses with tired websites, build them a free modern sample, and if they want it I deliver the real thing plus the automations that make it pay for itself.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://audemation.com",
    siteName: "audemation",
    title: "audemation — Free website mockups for UK small businesses",
    description:
      "I find UK small businesses with tired websites, build them a free modern sample, and if they want it I deliver the real thing plus the automations that make it pay for itself.",
  },
  twitter: {
    card: "summary_large_image",
    title: "audemation — Free website mockups for UK small businesses",
    description:
      "I find UK small businesses with tired websites, build them a free modern sample, and if they want it I deliver the real thing plus the automations that make it pay for itself.",
  },
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
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
