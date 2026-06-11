"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

/**
 * Sun/moon theme toggle for the header.
 *
 * The icon depends on the resolved theme, which is unknown on the
 * server — so we render a blank button until mounted to avoid a
 * hydration mismatch.
 */
export function ThemeToggle({
  className = "",
  size = "md",
}: {
  className?: string;
  /* "sm" matches the slim desktop CTA (h-9); "md" matches the
     mobile hamburger trigger (h-10) */
  size?: "sm" | "md";
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted
          ? `Switch to ${isDark ? "light" : "dark"} theme`
          : "Toggle theme"
      }
      className={`inline-flex items-center justify-center ${size === "sm" ? "w-9 h-9" : "w-10 h-10"} rounded-lg border border-line text-fg-muted hover:text-fg hover:bg-bg-alt transition-colors ${className}`}
    >
      {mounted ? (
        isDark ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )
      ) : (
        <span className="w-5 h-5" />
      )}
    </button>
  );
}
