/**
 * Renders scripts/linkedin-banner.html to public/linkedin-banner.png.
 *
 *   node scripts/render-banner.mjs [output.png]
 *
 * The banner is NOT part of the website — it is uploaded to LinkedIn by
 * hand. It therefore does not belong in public/, which is served at
 * audemation.com. Default output is scripts/out/ (gitignored); pass a
 * path to write elsewhere, e.g. ~/Desktop/linkedin-banner.png.
 *
 * Two details matter and are easy to get wrong:
 *
 *   1. deviceScaleFactor must be 1. The default on a retina Mac is 2,
 *      which silently produces a 2256×382 image that LinkedIn then
 *      downscales, softening the hairline grid.
 *
 *   2. The capture must wait for document.fonts.ready. The banner pulls
 *      Space Grotesk and Inter from Google Fonts; screenshotting before
 *      they load falls back to system fonts, and the -0.9px letter-
 *      spacing on the headline is calibrated for Space Grotesk, so the
 *      fallback renders visibly wrong rather than merely different.
 *
 * The script refuses to write an image whose content overflows the
 * 191px banner height — better a loud failure than a silently clipped
 * tagline.
 */
import puppeteer from "puppeteer";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { mkdirSync } from "node:fs";

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(HERE, "linkedin-banner.html");
const OUT = process.argv[2]
  ? resolve(process.cwd(), process.argv[2])
  : resolve(HERE, "out", "linkedin-banner.png");

const WIDTH = 1128;
const HEIGHT = 191;

const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.setViewport({
    width: WIDTH,
    height: HEIGHT,
    deviceScaleFactor: 1,
  });

  // networkidle0 so the Google Fonts stylesheet and its woff2 files land
  await page.goto(`file://${SRC}`, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);

  const metrics = await page.evaluate(() => {
    const block = document.querySelector(".block");
    const r = block.getBoundingClientRect();
    const h1 = getComputedStyle(document.querySelector("h1"));
    return {
      blockTop: r.top,
      blockBottom: r.bottom,
      docHeight: document.documentElement.scrollHeight,
      renderedFont: h1.fontFamily,
      fontsLoaded: [...document.fonts].map((f) => `${f.family} ${f.weight}`),
    };
  });

  if (metrics.blockBottom > HEIGHT) {
    throw new Error(
      `Content overflows the banner: block ends at ${metrics.blockBottom.toFixed(1)}px, ` +
        `banner is ${HEIGHT}px. Not writing the image — adjust the composition ` +
        `in linkedin-banner.html rather than shrinking the type here.`,
    );
  }

  mkdirSync(dirname(OUT), { recursive: true });
  await page.screenshot({ path: OUT, type: "png", fullPage: false });

  console.log(`text block:  ${metrics.blockTop}px → ${metrics.blockBottom.toFixed(1)}px of ${HEIGHT}px`);
  console.log(`headroom:    ${(HEIGHT - metrics.blockBottom).toFixed(1)}px`);
  console.log(`h1 font:     ${metrics.renderedFont}`);
  console.log(`fonts:       ${metrics.fontsLoaded.join(", ") || "none loaded"}`);
  console.log(`wrote:       ${OUT}`);
} finally {
  await browser.close();
}
