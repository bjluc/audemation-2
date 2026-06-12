# audemation VPS — session handoff v3 (12 June 2026)

> Continuation note for the real-prospect test (step 10). Steps 1-9 are
> done end-to-end. The system is **live** from the audemation baseline
> profile's perspective. Next session runs the first real mockup
> through the full pipeline.

## What got done in this session (12 June 2026)

### Step 6 — Postgres ✅
- `postgresql-16` installed, running, `apt install postgresql postgresql-contrib`
- Database `audemation_mockups` created
- User `mockups_deploy` created with strong password (24 chars base64)
- Creds at `/root/.secrets/audemation_db_creds` (chmod 600) on the VPS
- Schema applied: 3 tables (`prospects`, `mockup_deploys`, `mockup_archives`) + 2 indexes
- `mockups_deploy` has full DML access (verified with INSERT/SELECT/DELETE roundtrip)
- All gotchas from handoff v2 still apply: `~` resolves wrong, heredocs through SSH are fragile, write to `/tmp/` and SCP up

### Step 7 — Deploy script ✅
- `~/Desktop/audemation-2/scripts/deploy-mockup.py` (313 lines, committed as `6f08f8b`)
- Hard-coded: VPS host `77.42.68.164`, domain `appaud.com`, SSH key path
- Does: validate → rsync → chmod 644 → curl smoke test → ledger write → optional Playwright screenshots
- Exit codes: 1=validation, 2=upload, 3=smoke, 4=ledger, 5=screenshot
- Flags: `--dry-run`, `--no-screenshot`, `--domain`
- **End-to-end verified:** synthetic test mockup deployed to `test.appaud.com` (200 OK, files 644, DB rows correct), then cleaned up. `demo.appaud.com` still 200 (didn't break the working case)

### Step 8 — Skill ✅
- `~/.hermes/profiles/audemation/skills/audemation-mockup-deploy/SKILL.md` (121 lines)
- Cross-profile write required user approval (audemation profile, not hermes-ai)
- Frontmatter triggers auto-load on "deploy mockup", "live URL", "send the URL to prospect" etc.
- Body covers: workflow, hard rules, infrastructure table, "when something goes wrong" troubleshooting, related context

### Step 9 — MEMORY.md promote ✅
- Stub at `~/.hermes/profiles/audemation/memories/MEMORY.md` replaced
- Was: "FUTURE — June 2026" / "NOT YET CONFIGURED" with the "wait for VPS setup" guidance
- Now: "LIVE — June 2026" with the real domain, the one-line deploy command, the link to the skill, and the 5 hard rules
- Verified: 0 occurrences of "NOT YET CONFIGURED", 1 occurrence of "LIVE — June 2026"

### Step 10 — Real prospect test ⏳ NEXT SESSION
**This is the only remaining work in the plan.** It needs Bernard in the loop (picks the prospect, reviews the screenshots, approves the URL). It also needs Playwright installed on the Mac for the screenshot step to work, or the deploy can run with `--no-screenshot` and Bernard reviews the URL directly.

## State at session end (12 June 2026, ~14:10 UTC)

### Server (Hetzner, 77.42.68.164, Ubuntu 24.04.4)
- nginx 1.24 + wildcard vhost with `map` block — running
- Let's Encrypt wildcard cert (`*.appaud.com`, valid till 2026-09-10) — running
- ufw: OpenSSH + 80 + 443 — running
- Postgres 16 (`audemation_mockups` DB + `mockups_deploy` user) — running
- `/var/www/mockups/` has `.default/` (landing page) + `demo/` (proof of routing) — verified
- `/root/.secrets/audemation_db_creds` (chmod 600) + `/root/.secrets/cloudflare.ini` (chmod 600) — present

### Mac (this machine)
- `~/Desktop/audemation-2/scripts/deploy-mockup.py` — committed, executable, works
- `~/Desktop/audemation-2/docs/PLAN-mockup-system.md` — original 10-step plan
- `~/Desktop/audemation-2/docs/SESSION-HANDOFF-v2.md` — pre-Postgres state
- `~/Desktop/audemation-2/docs/SESSION-HANDOFF-v3.md` — **this file**
- SSH key: `/Volumes/UserFolder/bernard/.ssh/audemation_v2` (ed25519, no passphrase)

### audemation profile
- Skill: `audemation-mockup-deploy` (live, 121 lines)
- Memory: `MEMORY.md` "Mockup-on-VPS delivery workflow" promoted from FUTURE to LIVE
- 53 skills total (was 52, +1 new)

## What step 10 looks like in the next session

1. Bernard picks a real prospect. The script needs:
   - `<slug>` (lowercase, hyphenated — same convention as the profile fork names)
   - A local directory with `index.html` (+ optional CSS/JS/assets)
2. If the mockup doesn't exist yet, build it first (use `claude-design` or `sketch` skills for the build half — they're a separate concern)
3. Run the deploy:
   ```bash
   python3 ~/Desktop/audemation-2/scripts/deploy-mockup.py <slug> <local-source-dir>
   ```
4. If Playwright is installed, screenshots are auto-captured. If not, the script warns and skips — Bernard can review the live URL directly with `open https://<slug>.appaud.com/` or use `playwright-visible-browser` for a manual screenshot
5. Bernard reviews → approves → sends the URL to the prospect himself
6. The ledger records it. If the prospect says yes, follow the forking recipe in `MEMORY.md` to create a per-client profile
7. If the prospect says no, the mockup can be archived (or just left as-is and overwritten by the next prospect with a different slug)

**Acceptance test for "v1 shipped"** (from the plan):
> One real prospect has been mocked up + deployed + Bernard-reviewed end-to-end (a real test, not a synthetic one)

That's exactly step 10.

## Known gotchas (carried forward from handoff v2 + this session)

- **Agent's `~` resolves to `/Volumes/UserFolder/bernard/.hermes/profiles/hermes-ai/home/`, not the real Mac home.** Use absolute paths for SSH keys, project files, and any user-space references. This bit me when trying to write `/root/.secrets/audemation_db_creds` locally — `/root` doesn't exist on the Mac.
- **Heredocs through SSH with apostrophes are fragile.** Write to `/tmp/` locally, then SCP up, then SSH in to run. This is in the deploy script already (no heredocs in the live code path).
- **SCP/rsync from `/tmp/` preserves 600 perms.** The `chmod 644` step in the deploy script is non-negotiable. If you bypass the script, the served mockup returns 403 Forbidden.
- **nginx `if` inside `location` is forbidden.** The current config uses a `map` at the http level instead — that's why the vhost works.
- **Hetzner Ubuntu cloud image uses `ssh.service`, not `sshd.service`.** For systemd commands.
- **Cross-profile write guard.** Writing skills/memory to the `audemation` profile from a `hermes-ai` session requires `cross_profile=True` and user approval. The deploy script itself doesn't need this — it lives in the audemation-2 git repo, not the hermes profile.

## Cloudflare tokens to clean up (still optional, not blocking)
- `rapid-lake-750d` — has `Zone Write` but NOT `Zone DNS Edit`. Revoke from Cloudflare dashboard.
- `green-fire-cd13` — same issue, revoke.
- The working one is `cfut_QhvTf1...54` (no name on the certbot run; consider naming it "audemation-certbot" in the Cloudflare UI for clarity).

## Token-budget note for the next session
This session ran on the MiniMax Token Plan Monthly Plus (1M context, ~40% cap ≈ 400K). Started at 54% used per Bernard's note, finished step 9 with the system live. Step 10 (real prospect) was deferred to a fresh session so the budget headroom is comfortable for the build + deploy + iterate cycle.

## Top-of-funnel plan (also deferred to next session, by Bernard's request)

Bernard identified that the mockup-on-VPS pipeline (steps 1-9) is the conversion arm, but it needs qualified leads to convert. So before step 10, we need a **prospect research system** — the discovery arm.

**Status:** plan written, awaiting data source + API key from Bernard.

**Where:** `audemation-2/docs/PLAN-prospect-research.md` (committed `a6d29f8`, 317 lines).

**Decisions made in this session:**
- Data source: **Google Places API** (Bernard picked option 1)

**Decisions still open:**
- v1 test niche + area (was deferring; can pick during build)
- Brand-new Google Sheet vs augmenting an existing one (recommend brand-new)
- Bernard needs to: create a Google Cloud project, enable Places API, generate an API key, hand the key to the agent

**What the next session does, in order:**
1. Read `PLAN-prospect-research.md` and this handoff doc
2. If Bernard has the Places API key in hand, proceed to build (steps 2-5 of the plan)
3. If not, surface that as the blocker and help Bernard set up the Google Cloud project (15-20 min, well-documented)
4. Build the script + skill + MEMORY update
5. Run the v1 test (niche + area of Bernard's choice)
6. Pick a top candidate from the new sheet and run the full mockup-on-VPS pipeline (step 10 of `PLAN-mockup-system.md`)

When both v1 systems are shipped (one real prospect end-to-end), the audemation sales motion is fully live: **scrape → review sheet → pick → deploy mockup → prospect opens URL → say yes → fork profile → full build**.

## Files added/touched in this session
- `audemation-2/scripts/deploy-mockup.py` — NEW (committed `6f08f8b`)
- `audemation-2/docs/PLAN-mockup-system.md` — read only (no edits)
- `audemation-2/docs/SESSION-HANDOFF-v2.md` — read only
- `audemation-2/docs/SESSION-HANDOFF-v3.md` — NEW (this file)
- `~/.hermes/profiles/audemation/skills/audemation-mockup-deploy/SKILL.md` — NEW
- `~/.hermes/profiles/audemation/memories/MEMORY.md` — edited (FUTURE → LIVE)

VPS-side files (not in git): nginx vhost, demo + default mockups, cert, creds, schema, ssh authorized_keys.
