"use client"

import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/mockups", label: "Mockups" },
  { href: "/automations", label: "Automations" },
  { href: "/about", label: "About" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-line shadow-soft">
      <div className="mx-auto max-w-[1200px] px-4 flex items-center h-16 gap-8">
        {/* Logo */}
        <Link
          href="/"
          className="font-semibold text-ink text-lg tracking-tight shrink-0"
        >
          audemation
        </Link>

        {/* Desktop nav */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-0">
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex h-9 items-center px-3 text-sm font-medium text-ink hover:text-accent transition-colors rounded-lg"
                >
                  {link.label}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center h-9 px-4 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors"
          >
            Get a free mockup
          </Link>
          {/* Mobile: stub — wired in Phase 1 */}
          <button
            type="button"
            className="md:hidden px-3 py-1.5 text-sm border border-line rounded-lg text-ink"
          >
            Menu
          </button>
        </div>
      </div>
    </header>
  )
}
