"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/mockups", label: "Mockups" },
  { href: "/automations", label: "Automations" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-line">
      <div className="container-x flex items-center h-16 gap-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1.5 shrink-0 group"
          aria-label="audemation — home"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-brand group-hover:scale-110 transition-transform" />
          <span className="font-bold text-fg text-lg tracking-tight">
            audemation
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative inline-flex h-9 items-center px-3 text-sm font-medium text-fg-muted hover:text-fg transition-colors group"
            >
              {link.label}
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
        </nav>

        {/* Right side: CTA + mobile trigger */}
        <div className="ml-auto flex items-center gap-2">
          <Link href="/contact" className="btn-brand hidden md:inline-flex h-10 px-5 text-sm">
            Get a free mockup
          </Link>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-line text-fg hover:bg-bg-alt transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[340px] p-0 bg-white"
              showCloseButton={false}
            >
              <div className="flex items-center justify-between p-5 border-b border-line">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-1.5"
                >
                  <span className="inline-block w-2 h-2 rounded-full bg-brand" />
                  <span className="font-bold text-fg text-lg">audemation</span>
                </Link>
                <SheetClose
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-fg-muted hover:bg-bg-alt transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </SheetClose>
              </div>
              <nav className="flex flex-col p-3" aria-label="Mobile">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center h-12 px-3 rounded-lg text-base font-medium text-fg hover:bg-bg-alt hover:text-brand transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="btn-brand mt-4 h-12"
                >
                  Get a free mockup
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
