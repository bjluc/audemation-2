# scripts/

Source files for static images, rendered by hand when the artwork
changes. Nothing here is part of the Next.js build.

Where a rendered image ends up depends on who consumes it: images the
*site* serves live in `public/` and are committed; images uploaded to a
third party by hand do not, and are regenerated on demand.

## LinkedIn banner

`linkedin-banner.html` → a 1128 × 191 PNG.

```bash
node scripts/render-banner.mjs
```

Writes to `scripts/out/linkedin-banner.png`, which is gitignored. Pass a
path to write elsewhere:

```bash
node scripts/render-banner.mjs ~/Desktop/linkedin-banner.png
```

**The banner is not part of the website.** It is uploaded to the
LinkedIn company page by hand, so it deliberately does not live in
`public/` — anything there is served at audemation.com, and a file the
site never references has no business being publicly fetchable. The
rendered PNG is not committed; regenerate it when you need it.

Requires the `puppeteer` devDependency (already in `package.json`) and
network access, since the banner pulls Space Grotesk and Inter from
Google Fonts at render time.

The script prints the measured text-block extent and the fonts that
actually loaded, then writes the PNG. Two things it handles that are
easy to get wrong by hand:

- **`deviceScaleFactor: 1`.** The default on a retina Mac is 2, which
  silently yields a 2256 × 382 image. LinkedIn downscales it and the
  hairline grid goes soft.
- **`await document.fonts.ready` before capture.** Screenshotting early
  falls back to system fonts. The headline's `-0.9px` letter-spacing is
  calibrated for Space Grotesk, so a fallback render is visibly wrong,
  not merely different.

If the composition ever overflows 191px the script throws and writes
nothing, rather than producing a clipped banner. Fix the layout in the
HTML — don't shrink the type in the renderer.

## Relationship to public/og.png

`public/og.png` (1200 × 630) is **the same design at a different size**.
Unlike the banner it *is* committed and served, because `app/layout.tsx`
references it in `metadata.openGraph.images` — social scrapers fetch it
over HTTP, so it has to be in `public/`.

It is
same tagline, same Space Grotesk headline, same indigo rule, same faint
`.hero-grid` motif from `app/globals.css`. The Open Graph card differs
in that it carries the wordmark (a shared link has no other branding
around it), whereas the banner deliberately omits it: on a LinkedIn
company page the logo avatar sits just below-left and already says
"audemation".

**If the tagline changes, regenerate both.** They are the two public
faces of the same line, and a mismatch between the link preview and the
company page is the kind of thing nobody notices until a client does.

That file was produced from a standalone HTML file rendered the same way
(1200 × 630 viewport, `deviceScaleFactor: 1`, fonts awaited). That
scratch file was not kept — if it needs regenerating, the quickest route
is to adapt `linkedin-banner.html`: change the viewport constants in
`render-banner.mjs`, add the wordmark from
`public/logos/logo-2-wordmark.svg`, and scale the type up.

Tokens for both are lifted verbatim from `:root` in `app/globals.css`
(brand `#4f46e5`, fg `#0f172a`, fg-muted `#64748b`, warm `#f59e0b`).
Keep them in sync with that file rather than hand-picking new colours.
