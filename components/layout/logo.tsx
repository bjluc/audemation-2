"use client";

/**
 * Brand logo — single source of truth for the audemation mark.
 *
 * Wraps the SVG file from /public/logos/ so it can be reused in
 * header, footer, and any other context with consistent rendering.
 *
 * Variants:
 *   variant="light" (default) — for light backgrounds (slate-900 text)
 *   variant="dark"            — for dark backgrounds (slate-100 text)
 *
 * Sizing:
 *   The SVG viewBox is 200×48 (aspect ratio 25:6). We render at the
 *   height prop in pixels; width is auto-derived. The mark stays
 *   proportional at any size.
 *
 * Why a component, not a raw <img>:
 *   - Single point of control for alt text + accessibility
 *   - The variant prop is more readable than "logo-2-wordmark-dark.svg"
 *   - Next.js can optimize the import if we want to switch to inline SVG later
 */
type Variant = "light" | "dark";

const SRC: Record<Variant, string> = {
  light: "/logos/logo-2-wordmark.svg",
  dark: "/logos/logo-2-wordmark-dark.svg",
};

export function Logo({
  variant = "light" as Variant,
  height = 32,
  className,
}: {
  variant?: Variant;
  height?: number;
  className?: string;
}) {
  // Width is derived from the 200:48 aspect ratio (25:6 ≈ 4.1667).
  const width = Math.round((height * 200) / 48);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={SRC[variant]}
      alt="audemation"
      width={width}
      height={height}
      className={className}
      decoding="async"
    />
  );
}
