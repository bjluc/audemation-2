import Link from "next/link";
import { Logo } from "@/components/layout/logo";

const siteLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/mockups", label: "Mockups" },
  { href: "/automations", label: "Automations" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/terms", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="bg-dark-gradient text-fg-on-dark mt-24">
      <div className="container-x py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand block — takes more space */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center"
              aria-label="audemation — home"
            >
              <Logo variant="dark" height={44} />
            </Link>
            <p className="mt-4 text-fg-muted-on-dark max-w-sm leading-relaxed">
              Free website mockups for UK small businesses. I find the sites
              that need the most help, build a modern sample at no charge, and
              deliver the real thing when you&apos;re ready.
            </p>
          </div>

          {/* Site links */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold text-fg-on-dark mb-4 tracking-wide uppercase">
              Pages
            </h3>
            <ul className="space-y-3">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-fg-muted-on-dark hover:text-fg-on-dark transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-fg-on-dark mb-4 tracking-wide uppercase">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-fg-muted-on-dark hover:text-fg-on-dark transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA / contact nudge */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-fg-on-dark mb-4 tracking-wide uppercase">
              Get started
            </h3>
            <Link
              href="/contact"
              className="inline-flex items-center h-10 px-4 rounded-lg bg-white text-fg text-sm font-semibold hover:bg-bg-tint transition-colors"
            >
              Free mockup
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-line-on-dark flex flex-col md:flex-row items-center md:items-center justify-between gap-3 text-center md:text-left">
          <p className="text-sm text-fg-muted-on-dark">
            &copy; {new Date().getFullYear()} audemation. All rights reserved.
          </p>
          <p className="text-sm text-fg-muted-on-dark">
            Built in London by a real engineer.
          </p>
        </div>
      </div>
    </footer>
  );
}
