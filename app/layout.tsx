import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://audemation.com"),
  title: {
    default: "audemation — Free website mockups for UK small businesses",
    template: "%s — audemation",
  },
  description:
    "I find UK small businesses with tired websites, build them a free modern sample, and if they want it I deliver the real thing plus the automations that make it pay for itself.",
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
  return (
    <html lang="en-GB" className={inter.variable}>
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
