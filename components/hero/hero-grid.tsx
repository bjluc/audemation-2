"use client";

/**
 * Subtle animated background for the hero.
 *
 * Design intent: an IT/automation-coded grid that breathes and pulses softly,
 * suggesting code/web/dev without fighting the headline copy. Uses pure CSS
 * keyframes — no JS animation loop, no canvas, zero runtime cost.
 *
 * Visual layers (back to front):
 *   1. Faint fixed grid lines (CSS background-image, screen blend)
 *   2. Radial mask that fades the grid out at the edges so it doesn't
 *      collide with the section padding
 *   3. A "pulse" dot grid (CSS background) that gently drifts — 2 layers
 *      moving in opposite directions for parallax depth
 *   4. Two slow-drifting brand-coloured blobs (already in page.tsx as
 *      static gradient divs; we leave those in place for colour)
 *
 * Respects `prefers-reduced-motion`: all motion is disabled and the
 * animation freezes to its start state.
 */
import { useEffect, useState } from "react";

export function HeroGrid() {
  // Mount-on-client gate — avoids any SSR/CSR mismatch for the
  // reduced-motion check. Server renders nothing; client renders the grid.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden
      className="hero-grid pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Layer 1 — fine grid lines */}
      <div className="hero-grid__lines" />

      {/* Layer 2 — soft pulse dots, drifting diagonally */}
      <div className="hero-grid__dots hero-grid__dots--a" />
      <div className="hero-grid__dots hero-grid__dots--b" />

      {/* Layer 3 — gentle radial vignette to fade edges */}
      <div className="hero-grid__vignette" />
    </div>
  );
}
