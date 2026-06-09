import Link from "next/link"

const siteLinks = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/mockups", label: "Mockups" },
  { href: "/automations", label: "Automations" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

const legalLinks = [
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/terms", label: "Terms" },
]

export function Footer() {
  return (
    <footer className="bg-base border-t border-line mt-24">
      <div className="mx-auto max-w-[1200px] px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-semibold text-ink text-lg tracking-tight"
            >
              audemation
            </Link>
            <p className="mt-2 text-sm text-muted">
              Free website mockups for UK small businesses.
            </p>
          </div>

          {/* Site links */}
          <div>
            <h3 className="text-sm font-medium text-ink mb-3">Pages</h3>
            <ul className="space-y-2">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-sm font-medium text-ink mb-3">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-line">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} audemation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
