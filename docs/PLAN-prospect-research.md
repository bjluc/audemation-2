# Plan: audemation prospect-research system

> **Status:** draft. To be confirmed with Bernard before any code is written.
> **Owner:** Bernard. Agent supports but does not own.
> **Outcome:** on demand, dump a list of vetted audemation prospect candidates (UK small businesses with poor or no website) into a canonical Google Sheet, ready for Bernard to review and pick from.

---

## Why this exists, and how it fits the rest of audemation

audemation's sales motion has three arms:

1. **Discovery** (this system) — find businesses that need a website
2. **Conversion** (the mockup-on-VPS pipeline, steps 1-9 of PLAN-mockup-system.md) — deploy a free live mockup to `<slug>.appaud.com` in under 60 seconds
3. **Delivery** (per-client profile forks + full-stack builds) — what happens when the prospect says yes

**Arms 2 and 3 are done.** Arm 1 is the missing piece. Without it, the pipeline depends on cold inbound email — too slow, too dependent on luck. With it, Bernard can say "find me 20 electricians in Kent with no website" and have a vetted shortlist by the next session.

The full motion becomes: **scrape → review sheet → pick → deploy mockup → prospect opens URL → say yes → fork profile → full build**.

---

## What "ideal audemation prospect" means

The criteria apply to any niche. The niche itself is an input.

### Hard filters (must have)
- **UK-based** (engagements are UK-focused, audemation does not have cross-border tax setup)
- **Verifiable presence** — at least one of: Google Business Profile, Companies House record, trade body listing, multiple independent directory listings
- **Small** — under ~20 employees by signal (not a chain, not franchise HQ)
- **Poor or no website** — one of:
  - No website at all
  - SSL-less (`http://` only)
  - Non-mobile-responsive (no `viewport` meta, or site visibly broken on mobile)
  - Visually dated (design clearly >5 years old)
  - Pure brochure with no clear path to "book / call / buy" (i.e. it's a sales tool, not a website — the gap we'd close)
- **Sales-tool sector** — a niche where a website drives revenue, not just brand presence. Examples: trades (plumbers, electricians, builders, roofers, locksmiths), hospitality (B&Bs, cafés, restaurants, takeaways, salons), professional services (accountants, solicitors, dentists, vets), fitness (gyms, yoga, PTs), healthcare (private clinics, opticians, chiropractors)

### Soft signals (raise priority, don't filter on these)
- 10+ Google reviews (active business, customers care)
- 4+ star rating
- Multiple locations or visible growth (chain-in-the-making — wins compound)
- Active social media (marketing-aware owner = easier sale)
- Reviews complaining about booking / contact / pricing / "wish they had a website that..." — the gap our work would close is named in their own words
- Owner responds to reviews (engaged, not absentee)

### Anti-signals (skip)
- Recently redesigned site (they just paid someone; respect that)
- Chains, franchises, public sector bodies, charities, religious orgs (different sales motion, different decision-maker, different budget)
- Already has booking / e-commerce / payments integration (more complex build, different price point, more stakeholders)
- No online presence at all outside the address — can't verify they're real, leads are usually garbage
- Solopreneur with no apparent customer base (e.g. sole trader with 0 reviews and a freebie website) — not worth a custom mockup

### Niche flexibility

The criteria above are universal. The niche is an input. Examples that all work:
- "plumbers in Devon" → scraper finds plumber businesses, filters by criteria, returns the ones with poor/no websites
- "B&Bs in Whitby" → same pattern, hospitality niche
- "accountants in Croydon" → same pattern, professional services

Niches that are *bad fits* for audemation (and the script should warn, not auto-run):
- Anything where the prospect is unlikely to have a buying decision (e.g. "find me individuals who want a personal blog")
- Anything where the lead is a one-time transaction, not a small business (e.g. "find me wedding venues with no website" — venue selection is one-time, not a long-term build)
- Anything that requires regulatory disclosures the agent can't make (e.g. financial advice sites — different sales motion entirely)

The skill should teach future agents to push back on bad niche choices.

---

## System shape

### Three components

| Piece | Where | Purpose |
|---|---|---|
| **`audemation-prospect-research` skill** | `~/.hermes/profiles/audemation/skills/audemation-prospect-research/SKILL.md` | Workflow + criteria + how-to-run for future agents. Auto-loads on "find prospects", "research niche", "scrape Google for X", etc. |
| **`scrape-prospects.py` script** | `audemation-2/scripts/scrape-prospects.py` (in git) | The actual data pull from Google + write to the Google Sheet. CLI flags: `--niche`, `--area`, `--max`, `--min-reviews`, `--dry-run`, `--sheet-url` |
| **Canonical Google Sheet** | Owned by Bernard, name `audemation-prospects` (one sheet, accumulates over time) | The store of every prospect ever found. Bernard reviews rows in his phone, marks status (`new` / `passed` / `mockup-sent` / `engaged` / `declined` / `archived`), picks who to mockup |

### Why a Google Sheet, not a DB

- Bernard reviews on his phone (sitting in the van, between jobs) — no ssh needed
- Shareable (could share a filtered view with a virtual assistant later)
- No schema migration work; add a column when you need one
- Fits the audemation pattern: **agent appends, human decides**
- The mockup-on-VPS pipeline already has a Postgres ledger for *deployment* state; the prospect *research* state belongs in a tool a human can browse

### Why "one canonical sheet" not "one sheet per niche"

- Cross-niche comparison is useful ("which of my 200 prospects have I already contacted?")
- Simpler to maintain (one URL, one schema, one dedupe rule)
- Bernard can add a column later ("niche") if he wants to filter

### Dedup strategy

- The sheet is the source of truth. If a business is already in the sheet, the script skips it (matched on `name + postcode` or `place_id` from Google).
- A scrape run is **append-only** — never overwrites an existing row. If the data has changed (new rating, new website), add a separate "scrape history" tab later. v1 doesn't do this.

---

## Data source: which Google API, and why

The user said "scrape information from google". Google has three relevant surfaces, and they have different APIs:

| Surface | What it gives you | API | Best for |
|---|---|---|---|
| **Google Maps / Places** | Business name, address, phone, website URL, rating, review count, opening hours, business status | **Google Places API** (Text Search + Place Details) | Finding businesses matching a niche + area |
| **Google Search results** | A list of URLs matching a query | **SerpAPI** or Google Custom Search API | Less useful — finds directory sites, not the businesses themselves |
| **Google Business Profile** | Richer data per business (photos, posts, Q&A) | **My Business API** | Not useful for discovery; only for managing a profile you own |

**For audemation's use case, Google Places API is the right answer.** It returns the actual businesses with the data we need to filter on (name, address, website, rating, reviews). The "has website?" check is built into the data (the `website` field on Place Details).

### Comparison of realistic data-source options

| Option | Cost | Reliability | Setup effort | Volume | TOS |
|---|---|---|---|---|---|
| **Google Places API** | $200/mo free credit ≈ ~28k lookups; then $32 per 1000 calls | Very high (official) | Medium (need Google Cloud project, billing setup, API key) | High | OK (paid API) |
| **SerpAPI** | $50/mo for 5000 searches, free trial 100 | High (real Google results) | Low (one API key) | High | OK (paid) |
| **Outscraper / Apify (Google Maps scrapers)** | Pay-as-you-go, ~$5 per 1000 records | Medium-high | Low (prebuilt actors) | High | Grey (third-party) |
| **Direct scrape with Playwright + curl** | Free | Low (Google rate-limits / blocks), violates TOS | High | Limited | **Not OK** |

**Recommendation: Google Places API.**

Reasons:
- The $200/mo free credit is more than enough for v1 (every prospect research run is probably 20-200 lookups; you'd need 100+ runs a month to hit the free limit)
- The data is structured and stable — `name`, `formatted_address`, `website`, `rating`, `user_ratings_total`, `business_status`
- No TOS grey area (it's a paid API specifically licensed for this use)
- Bernard likely already has a Google account, so the setup is one Google Cloud project + one API key

**If Bernard has no Google Cloud account / doesn't want one**, the fallback is SerpAPI. Similar data, slightly more setup, $50/mo flat.

**To be confirmed with Bernard: which data source?**

---

## v1 scope

### In scope
- One script (`scrape-prospects.py`) that takes `--niche`, `--area`, `--max`, `--min-reviews`, `--dry-run`, `--sheet-url` and writes to a Google Sheet
- Skill documentation: criteria, how to run, troubleshooting, dedup behaviour
- Dedup against the existing sheet (skip rows where `name + postcode` already exists)
- One canonical Google Sheet, owned by Bernard
- CLI flags for `--dry-run` (print the rows that *would* be added, don't touch the sheet)
- British English in the skill body (no em-dashes in body copy, per audemation house style)

### Out of scope (v2 / later)
- "Scrape history" tab tracking changes over time (rating, website status)
- Per-niche sheets
- Automatic lead scoring (combine reviews, rating, has-website into a single 0-100 score)
- Email enrichment (find the owner's email, send a cold intro)
- Webhook from sheet → mockup-on-VPS deploy (auto-pick the top of the sheet, build a mockup)
- Cron job that auto-runs every Monday with the niche of the week

### Test case for v1 acceptance

Bernard picks a niche + area that's a good fit for audemation (e.g. "electricians in Devon" or "cafés in Whitby"). The script produces a Google Sheet with 20-50 vetted rows. Bernard reviews them, marks 5 as `passed` (the obvious not-fits), leaves the rest as `new`. The skill documentation is written and indexed in the audemation profile.

That's "v1 shipped". The real-prospect test (step 10 of PLAN-mockup-system.md) then uses one of these sheet candidates as the source.

---

## Build steps (in order)

### Step 1 — Confirm data source and key decisions with Bernard (1 day)
Bernard picks:
1. Data source: **Google Places API** (recommended) or **SerpAPI** (fallback)
2. Initial niche + geography for v1 test: any reasonable choice (e.g. "electricians in Devon")
3. Whether to use a brand-new Google Sheet, or augment an existing one

If Places API: Bernard creates a Google Cloud project, enables the Places API, creates an API key, gives the agent the key.
If SerpAPI: Bernard signs up, gives the agent the key.

### Step 2 — Set up the Google Sheet (10 min)
- Bernard creates a new Google Sheet named `audemation-prospects`
- Shares it with the service account / OAuth client that the script will use
- Standard schema (see below) is pre-populated with column headers in row 1
- Sheet URL captured for the script's `--sheet-url` flag (or stored in env var)

### Step 3 — Write the scraper script (60-90 min)
- `audemation-2/scripts/scrape-prospects.py`
- Python 3, `requests` for API calls, `gspread` for sheet writes
- Two-step: **find** (Text Search by niche + area, paginated) → **enrich** (Place Details for each, get website / rating / reviews)
- Filter by hard criteria (has website? poor website? reviews threshold?) before adding
- Dedup against existing sheet rows
- Append new rows; never overwrite
- Print summary at the end: "Added X rows, skipped Y duplicates, Z filtered by criteria"
- Exit codes: 1=auth/config, 2=API error, 3=sheet write error

### Step 4 — Add the `audemation-prospect-research` skill (30 min)
- `~/.hermes/profiles/audemation/skills/audemation-prospect-research/SKILL.md`
- Cross-profile write requires user approval (audemation profile, not hermes-ai)
- Body: criteria (this whole doc's criteria section), CLI usage examples, troubleshooting, "what makes a bad niche choice" guidance, link to PLAN-mockup-system.md for the conversion arm
- Frontmatter triggers on "find prospects", "research niche", "scrape Google for", "lead research", "find leads"

### Step 5 — Add to MEMORY.md (5 min)
- In `audemation/memories/MEMORY.md`, add a new entry: "Prospect research workflow (LIVE — June 2026)" pointing at the skill + script + sheet
- Cross-profile write requires user approval

### Step 6 — First real test run (15 min, in-session with Bernard)
- Bernard picks a niche + area (or uses the one from step 1)
- Run the script
- Bernard reviews the sheet, marks a few rows `passed`, leaves the rest
- Bernard confirms the workflow feels right; iterate on criteria if needed

### Step 7 — End-to-end with the mockup pipeline (1-2 hours, in-session with Bernard)
- This is **step 10 of PLAN-mockup-system.md** — the real prospect test
- Pick the top candidate from the new sheet, run `deploy-mockup.py`, review screenshots, send URL to prospect
- v1 of both systems is "shipped" when one full prospect goes through end-to-end

---

## Sheet schema (v1)

Column headers in row 1:

| Col | Header | Source | Notes |
|---|---|---|---|
| A | `date_added` | Script (ISO timestamp) | When the script added this row |
| B | `place_id` | Google Places API | The stable ID for dedup (unique per business) |
| C | `name` | Google Places | Business name |
| D | `niche` | Script input | The `--niche` value the user passed |
| E | `address` | Google Places | Full formatted address |
| F | `postcode` | Derived from address | For dedup + filtering |
| G | `phone` | Google Places | If present |
| H | `website` | Google Places | URL or empty (empty = no website) |
| I | `website_status` | Script analysis | `none` / `http_only` / `dated` / `no_booking_cta` / `ok` |
| J | `rating` | Google Places | 1.0 to 5.0 |
| K | `reviews` | Google Places | Review count |
| L | `business_status` | Google Places | `OPERATIONAL` / `CLOSED_TEMPORARILY` / `CLOSED_PERMANENTLY` |
| M | `status` | Bernard (manual) | `new` / `passed` / `mockup-sent` / `engaged` / `declined` / `archived` |
| N | `notes` | Bernard (manual) | Free text — why passed, what gap to close, follow-up date |

The script writes columns A-L. Bernard owns columns M-N. The script never overwrites M-N on existing rows.

**Schema changes**: when the v2 "scrape history" tab lands, it goes in a separate tab — `audemation-prospects` itself stays append-only and human-owned.

---

## What the script's output looks like (sample terminal output)

```
$ python3 scripts/scrape-prospects.py --niche "electrician" --area "Devon" --max 30 --min-reviews 5

→ Querying Google Places API: "electrician in Devon"...
→ Got 47 candidate places (capped at 30 by --max)
→ Enriching with Place Details (website, rating, reviews)...
→ Filtering:
    12 have no website           → KEEP
     8 have http-only            → KEEP
     4 have dated/no-CTA sites   → KEEP
     6 have decent sites         → SKIP
→ Dedup against sheet: 0 duplicates
→ Writing 24 new rows to audemation-prospects...

✓ Done. Added 24 rows.
  Sheet: https://docs.google.com/spreadsheets/d/.../edit
  Top 3 by reviews:
    1. Sparky Dave Electrical Services (142 reviews, 4.7★) — no website
    2. Watts Right Electricians (98 reviews, 4.5★) — http-only
    3. Devon Power & Light (76 reviews, 4.8★) — no website

Next: open the sheet, review, mark rows as 'passed' or 'mockup-sent'.
```

---

## Risks and gotchas

| Risk | Mitigation |
|---|---|
| Google Places API quota exceeded on a big run | Default `--max 30`; bump with `--max 100` if needed; API gives clear 429 errors so the script surfaces them |
| Sheet fills with junk (wrong niche, wrong area) | The script's criteria filter is conservative; Bernard still reviews every row in the sheet before any outreach |
| A business has multiple Google listings (chain + individual) | Dedup on `place_id` (unique per business) handles this; manual `notes` flag for the rest |
| Service account / OAuth setup is fiddly | Use `gspread` with a service account JSON key; the skill documents the exact steps |
| The script writes junk to the wrong sheet | `--dry-run` flag + the sheet URL is required (or in env var); no default = no accidental writes |
| Sheets API quota (60 writes/min default) | Batch writes; the script sleeps between batches; the data is small (one row per prospect) |
| The agent can't tell a "bad niche" from a good one | The skill has explicit "niches that are bad fits for audemation" guidance, and the agent should push back if asked to research something dubious |
| Scraped data is stale by the time Bernard reviews | Sheet has `date_added`; Bernard can re-run the script for the same niche + area later and it'll dedup against the existing rows |

---

## What this is and isn't

**This IS:**
- A way for Bernard to fill the top of the audemation funnel with vetted UK small business leads
- A repeatable process that runs on demand for any niche + area
- A "scrape once, review forever" pattern — the sheet is the canonical store

**This is NOT:**
- Cold email automation (Bernard sends the URL himself, per the mockup-on-VPS hard rules)
- An always-on agent (cron jobs are out of scope for v1)
- A replacement for the mockup-on-VPS pipeline (this is the top of the funnel; the mockup pipeline is the conversion arm)
- A scraping of *individuals* or *non-businesses* (the criteria filter requires a verifiable business presence)

---

## To be confirmed with Bernard before building

1. **Data source**: Google Places API (recommended) or SerpAPI (fallback)? Affects the build, not the criteria.
2. **Initial niche + area for the v1 test**: any reasonable choice. ("Electricians in Devon" is the placeholder; Bernard can change it.)
3. **Sheet ownership**: brand-new sheet, or augment an existing one? (Brand-new is simpler — recommend that.)
4. **Cross-profile writes**: the skill and MEMORY.md update both go to the `audemation` profile from a `hermes-ai` session — needs Bernard's explicit approval (same as step 8 of the mockup pipeline).

---

## Acceptance criteria for "v1 shipped"

- [ ] Bernard has a Google Cloud project (or SerpAPI account) with API key in hand
- [ ] Bernard has a Google Sheet `audemation-prospects` with the schema headers in row 1
- [ ] `scrape-prospects.py` is in `audemation-2/scripts/`, committed, executable
- [ ] Running the script with the v1 test niche + area produces 20-50 vetted rows in the sheet
- [ ] The script's hard-criteria filter actually filters (verified by inspecting the output)
- [ ] The script dedupes (re-running for the same niche + area adds 0 new rows)
- [ ] The `audemation-prospect-research` skill is in the audemation profile and indexed
- [ ] `audemation/memories/MEMORY.md` has the new "Prospect research workflow (LIVE)" entry
- [ ] Bernard has reviewed the first sheet and marked 5+ rows `passed` (proves the workflow is being used, not just built)
- [ ] One prospect from the sheet has been deployed to a live mockup URL (links to PLAN-mockup-system.md step 10 — the v1 of *both* systems is "shipped" at this point)
