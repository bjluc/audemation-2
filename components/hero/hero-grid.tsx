"use client";

/**
 * Hero grid — line grid that draws itself in on a loop.
 *
 * Reused across the site for visual consistency. The audemation identity
 * motif: a quiet, code/web/dev-coded line grid that draws in over time
 * and loops. Subtle enough to never fight page content, present enough
 * to feel like a coherent brand.
 *
 * Two variants:
 *   - "full"   (default): the home-page version. 6s cycle, higher
 *               opacity (0.55), the grid is the headline moment.
 *   - "subtle": for inner pages (how-it-works, mockups, automations,
 *               about, contact). 12s cycle, lower opacity (0.22),
 *               the grid is a quiet recurring motif. Lines still
 *               draw, but on a longer rhythm and quieter palette.
 *
 * A11y: honours prefers-reduced-motion (lines held drawn, no animation).
 */
import { useEffect, useMemo, useState } from "react";

const COLS = 14; // vertical lines (incl. edges)
const ROWS = 10; // horizontal lines (incl. edges)

type Variant = "full" | "subtle";

export function HeroGrid({ variant = "full" as Variant }: { variant?: Variant }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Build the grid as a memoised list of line coords
  const { verticals, horizontals, width, height } = useMemo(() => {
    const stepX = 100 / (COLS - 1);
    const stepY = 100 / (ROWS - 1);
    return {
      verticals: Array.from({ length: COLS }, (_, i) => i * stepX),
      horizontals: Array.from({ length: ROWS }, (_, i) => i * stepY),
      width: 100,
      height: 100,
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden
      className={`hero-grid hero-grid--${variant} pointer-events-none absolute inset-0 overflow-hidden`}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Vertical lines — wipe in, wave left→right */}
        <g className="hero-grid__v-group">
          {verticals.map((x, i) => {
            const delay = (i / Math.max(1, COLS - 1)) * 1.2;
            return (
              <line
                key={`v-${i}`}
                x1={x}
                y1={0}
                x2={x}
                y2={height}
                className="hero-grid__line hero-grid__line--v"
                style={{ animationDelay: `${delay}s` }}
              />
            );
          })}
        </g>

        {/* Horizontal lines — wipe in, wave top→bottom */}
        <g className="hero-grid__h-group">
          {horizontals.map((y, i) => {
            const delay = (i / Math.max(1, ROWS - 1)) * 1.2;
            return (
              <line
                key={`h-${i}`}
                x1={0}
                y1={y}
                x2={width}
                y2={y}
                className="hero-grid__line hero-grid__line--h"
                style={{ animationDelay: `${delay}s` }}
              />
            );
          })}
        </g>
      </svg>

      {/* Vignette: fade the grid toward edges */}
      <div className="hero-grid__vignette" />
    </div>
  );
}
