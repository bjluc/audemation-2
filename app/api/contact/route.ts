/**
 * POST /api/contact
 *
 * Receives the contact-form submission, validates, rate-limits, then emails
 * the message to Bernard via Gmail OAuth2.
 *
 * Response shape: { ok: true } | { ok: false, error: string, fields?: Record<string,string> }
 */
import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/contact-email";

export const runtime = "nodejs"; // googleapis needs Node, not edge
export const dynamic = "force-dynamic"; // never cache

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_DESCRIPTION = 5000;
const MAX_NAME = 200;
const MAX_URL = 500;

type Body = {
  businessName?: unknown;
  websiteUrl?: unknown;
  email?: unknown;
  description?: unknown;
};

function asString(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function isLikelyUrl(s: string): boolean {
  if (s === "") return true; // optional
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

// ---------- in-memory rate limiter ----------
// Good enough for a low-traffic marketing site. For production scale,
// swap this for Upstash Redis or Vercel KV. The Map clears itself on hot reload.
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();
const RATE_LIMIT = 5;        // submissions
const RATE_WINDOW_MS = 60 * 60 * 1000; // per hour

function rateLimit(ip: string): { ok: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const b = buckets.get(ip);

  if (!b || b.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { ok: true };
  }

  if (b.count >= RATE_LIMIT) {
    return {
      ok: false,
      retryAfterSec: Math.ceil((b.resetAt - now) / 1000),
    };
  }

  b.count += 1;
  return { ok: true };
}

export async function POST(req: NextRequest) {
  // 1. IP for rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const rl = rateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rl.retryAfterSec ?? 3600) },
      }
    );
  }

  // 2. Parse + shape-check
  let raw: Body;
  try {
    raw = (await req.json()) as Body;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const businessName = asString(raw.businessName).trim();
  const websiteUrl = asString(raw.websiteUrl).trim();
  const email = asString(raw.email).trim();
  const description = asString(raw.description).trim();

  // 3. Validate
  const fieldErrors: Record<string, string> = {};
  if (!businessName) fieldErrors.businessName = "Please enter your business name.";
  else if (businessName.length > MAX_NAME)
    fieldErrors.businessName = "Business name is too long.";

  if (websiteUrl && (websiteUrl.length > MAX_URL || !isLikelyUrl(websiteUrl))) {
    fieldErrors.websiteUrl = "Please enter a valid website URL.";
  }

  if (!email) fieldErrors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email))
    fieldErrors.email = "Please enter a valid email address.";

  if (!description) fieldErrors.description = "Please add a brief description.";
  else if (description.length > MAX_DESCRIPTION)
    fieldErrors.description = "Description is too long.";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { ok: false, error: "Please fix the highlighted fields.", fields: fieldErrors },
      { status: 400 }
    );
  }

  // 4. Send
  try {
    await sendContactEmail({
      businessName,
      websiteUrl: websiteUrl || undefined,
      email,
      description,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    // Log the real error server-side, return a generic message to the client.
    // Do NOT leak env-var names or stack traces to the public.
    console.error("[/api/contact] send failed:", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Something went wrong sending your message. Please email hello@audemation.com directly.",
      },
      { status: 500 }
    );
  }
}

// Anything other than POST → 405, so a GET to /api/contact isn't a mystery
export async function GET() {
  return NextResponse.json(
    { ok: false, error: "Method not allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}
