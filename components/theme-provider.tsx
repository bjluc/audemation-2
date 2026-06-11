"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MotionConfig } from "framer-motion";

/**
 * Theme provider — wraps next-themes with the site's settings.
 *
 * - attribute="class": toggles the `.dark` class on <html>, which is
 *   what the `@custom-variant dark` + token overrides in globals.css
 *   key off.
 * - defaultTheme="system": first visit follows the OS preference;
 *   an explicit choice from the header toggle is persisted.
 * - disableTransitionOnChange: avoids a wave of mismatched colour
 *   transitions when every token flips at once.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {/* reducedMotion="user": framer-motion animations (FadeIn etc.)
          respect the OS prefers-reduced-motion setting */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  );
}
