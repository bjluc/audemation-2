# Move plan: extract operational material from audemation-2 into audemation-ops

> **Status:** runbook. Run from a fresh session with full token budget.
> **Owner:** Bernard. Agent executes.
> **Outcome:** a new private repo `bjluc/audemation-ops` holds all audemation's operational material (docs, deploy scripts, Hermes profile). The public `audemation-2` repo is left with website code only.

---

## Why this move

`bjluc/audemation-2` is the public website repo. It's deployed to Vercel, has CI, and is the marketing site for the audemation service. It's not the right home for:

- Internal plans (mockup-publish system, prospect-research system)
- Internal handoff docs (SESSION-HANDOFF*.md) — these mention the VPS IP, the creds paths, the Cloudflare token
- Operator scripts (deploy-mockup.py, step-0-diagnostic.sh, install-server-key.sh)
- The audemation Hermes profile (skills, memories, SOUL.md) — this is the agent's "audemation brain"

Mixing these into the website repo means a public project ends up carrying operational material that should never be public, and that the public CI doesn't need to know about.

**Target:** a separate private repo `bjluc/audemation-ops`.

---

## Final layout

### `bjluc/audemation-2` (public website, Vercel-deployed) — **stays clean**

After the move, this repo contains only:
- `app/`, `components/`, `lib/`, `public/`
- `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.*`, `postcss.config.*`
- `eslint.config.mjs`, `components.json`
- `.gitignore`, `README.md`, `LICENSE` (if any)
- `.env.example` (template only; never the real `.env.local`)

It does NOT contain:
- `docs/` (this folder is removed)
- `scripts/` (the deploy/diagnostic/install-key scripts are removed)

### `bjluc/audemation-ops` (private, operator-only) — **NEW**

```
audemation-ops/
├── README.md                              # short: what this repo is, who maintains it
├── .gitignore                             # standard; macOS + python + node
├── audemation-docs/
│   ├── PLAN-mockup-system.md              # moved from audemation-2/docs/
│   ├── PLAN-prospect-research.md          # moved from audemation-2/docs/
│   ├── SESSION-HANDOFF.md                 # moved from audemation-2/docs/
│   ├── SESSION-HANDOFF-v2.md              # moved from audemation-2/docs/
│   └── SESSION-HANDOFF-v3.md              # moved from audemation-2/docs/
├── scripts/
│   ├── deploy-mockup.py                   # moved from audemation-2/scripts/
│   ├── step-0-diagnostic.sh               # moved from audemation-2/scripts/
│   └── install-server-key.sh              # moved from audemation-2/scripts/
└── hermes-profile/                        # the audemation Hermes profile, in git
    ├── SOUL.md
    ├── config.yaml                        # only if it doesn't contain secrets
    ├── memories/
    │   ├── MEMORY.md
    │   └── USER.md
    └── skills/
        ├── audemation-mockup-deploy/      # the new step 8 skill
        │   └── SKILL.md
        ├── ai-context-onboarding/
        ├── apple/
        ├── autonomous-ai-agents/
        ├── creative/
        ├── data-science/
        ├── devops/
        ├── dogfood/
        ├── email/
        ├── gaming/
        ├── github/
        ├── mcp/
        ├── media/
        ├── meta/
        ├── mlops/
        ├── note-taking/
        ├── phased-ai-build/
        ├── productivity/
        ├── red-teaming/
        ├── research/
        ├── smart-home/
        ├── social-media/
        ├── software-development/
        ├── wordpress/
        └── yuanbao/
```

(53 skills total, matching what's installed under `~/.hermes/profiles/audemation/skills/`.)

---

## Pre-flight checks (run these first, before any moves)

In the new session, before touching files:

```bash
# 1. audemation-2 is clean
cd /Volumes/UserFolder/bernard/Desktop/audemation-2
git status  # should show no uncommitted changes

# 2. The audemation Hermes profile exists
ls -la /Volumes/UserFolder/bernard/.hermes/profiles/audemation/

# 3. config.yaml is safe to commit (or it has secrets)
cat /Volumes/UserFolder/bernard/.hermes/profiles/audemation/config.yaml
# If it contains API keys, tokens, or password hashes, do NOT commit it
# The plan is: commit it IF it's just config flags / no secrets

# 4. The 5 docs and 3 scripts exist at the source paths
ls /Volumes/UserFolder/bernard/Desktop/audemation-2/docs/
ls /Volumes/UserFolder/bernard/Desktop/audemation-2/scripts/

# 5. No 'gh' CLI is strictly required (curl + git push works fine)
# But if installed and authenticated, 'gh repo create' is easier
which gh 2>/dev/null
gh auth status 2>&1 | head -3
```

If pre-flight passes, proceed to the moves.

---

## Build steps (in order)

### Step 1 — Create the new repo on GitHub (5 min)

Pick one of:

**Option A (with `gh` CLI):**
```bash
gh repo create bjluc/audemation-ops --private --description "audemation internal operations: plans, handoffs, deploy scripts, Hermes profile. Private." --add-readme
```

**Option B (no `gh` CLI, via API + git):**
```bash
# Create the repo via the GitHub REST API (curl + token from ~/.git-credentials)
TOKEN=$(grep -oP '(?<=://)[^:]+(?=:)[^@]+' ~/.git-credentials | head -1)
# Or just use the token directly if known
curl -H "Authorization: token $GITHUB_TOKEN" \
     -H "Accept: application/vnd.github+json" \
     https://api.github.com/user/repos \
     -d '{"name":"audemation-ops","private":true,"description":"audemation internal operations: plans, handoffs, deploy scripts, Hermes profile. Private."}'
```

Verify the repo exists and is empty:
```bash
gh repo view bjluc/audemation-ops --json isPrivate,description  # if gh
# or
curl -sI https://github.com/bjluc/audemation-ops | head -1
```

### Step 2 — Set up the local repo (2 min)

```bash
LOCAL_OPS="/Volumes/UserFolder/bernard/audemation-ops"
mkdir -p "$LOCAL_OPS"
cd "$LOCAL_OPS"
git init
git remote add origin https://github.com/bjluc/audemation-ops.git
git checkout -b main
```

(Or use `~/Desktop/audemation-ops` if Bernard prefers Desktop.)

### Step 3 — Copy the files in (5 min)

```bash
SRC="/Volumes/UserFolder/bernard/Desktop/audemation-2"
DST="/Volumes/UserFolder/bernard/audemation-ops"

# Docs
mkdir -p "$DST/audemation-docs"
cp "$SRC/docs/PLAN-mockup-system.md"        "$DST/audemation-docs/"
cp "$SRC/docs/PLAN-prospect-research.md"    "$DST/audemation-docs/"
cp "$SRC/docs/SESSION-HANDOFF.md"           "$DST/audemation-docs/"
cp "$SRC/docs/SESSION-HANDOFF-v2.md"        "$DST/audemation-docs/"
cp "$SRC/docs/SESSION-HANDOFF-v3.md"        "$DST/audemation-docs/"
cp "$SRC/docs/MOVE-TO-AUDEMATION-OPS.md"    "$DST/audemation-docs/"  # this file

# Scripts
mkdir -p "$DST/scripts"
cp "$SRC/scripts/deploy-mockup.py"          "$DST/scripts/"
cp "$SRC/scripts/step-0-diagnostic.sh"      "$DST/scripts/"
cp "$SRC/scripts/install-server-key.sh"     "$DST/scripts/"

# Hermes profile (skills, memories, SOUL.md; config.yaml only if safe)
HERMES_SRC="/Volumes/UserFolder/bernard/.hermes/profiles/audemation"
mkdir -p "$DST/hermes-profile"
cp "$HERMES_SRC/SOUL.md"                    "$DST/hermes-profile/"
# config.yaml: only if it has no secrets (verify in pre-flight)
if [ -f "$HERMES_SRC/config.yaml" ]; then
    cp "$HERMES_SRC/config.yaml"            "$DST/hermes-profile/"
fi
cp -R "$HERMES_SRC/memories"                "$DST/hermes-profile/"
cp -R "$HERMES_SRC/skills"                  "$DST/hermes-profile/"

ls -la "$DST"
ls "$DST/audemation-docs/"
ls "$DST/scripts/"
ls "$DST/hermes-profile/"
```

### Step 4 — Write the new repo's README + .gitignore (5 min)

`README.md` (in `$DST`):
```markdown
# audemation-ops

Private repo for audemation's internal operations: plans, handoff docs,
deploy scripts, and the audemation Hermes profile. Not for public use.

## Contents

- `audemation-docs/` — operational plans (mockup system, prospect
  research), handoff docs between sessions, and the runbook for this
  repo's creation.
- `scripts/` — operator scripts: deploy a mockup, diagnose the VPS,
  install an SSH key. All run from a local Mac, not from CI.
- `hermes-profile/` — the audemation Hermes agent profile: skills
  (markdown), memories, SOUL.md, config. Forked per-client when an
  engagement closes.

## Relationship to audemation-2

`bjluc/audemation-2` is the public website (Next.js, Vercel-deployed).
This repo is the operator layer behind the audemation sales motion.

## Maintenance

Updated whenever a new plan, handoff, or skill is added. The `audemation-2`
repo's deploy script and docs folder are moved here as a clean
operational boundary; do not duplicate content between the two.
```

`.gitignore` (in `$DST`):
```
.DS_Store
*.pyc
__pycache__/
*.swp
.idea/
.vscode/
node_modules/
.env
.env.local
```

### Step 5 — First commit + push (2 min)

```bash
cd "$DST"
git add -A
git status  # sanity check
git commit -m "Initial commit: audemation-ops repo

Operational material moved out of audemation-2 (the public website):
- audemation-docs/: 2 plans + 3 handoff docs + this move runbook
- scripts/: deploy-mockup.py, step-0-diagnostic.sh, install-server-key.sh
- hermes-profile/: SOUL.md, config.yaml, memories/, 53 skills/

audemation-2 is left with website code only."
git push -u origin main
```

Verify it landed:
```bash
gh repo view bjluc/audemation-ops --web
# or
open https://github.com/bjluc/audemation-ops
```

### Step 6 — Remove the moved files from audemation-2 (5 min)

```bash
cd /Volumes/UserFolder/bernard/Desktop/audemation-2
git rm -r docs/ scripts/
git status  # should show only docs/ and scripts/ removed
git commit -m "Remove docs and scripts (moved to bjluc/audemation-ops)

- docs/ (5 files: 2 plans, 3 handoffs) -> audemation-ops/audemation-docs/
- scripts/ (3 files: deploy-mockup.py, step-0-diagnostic.sh, install-server-key.sh)
  -> audemation-ops/scripts/

The audemation-2 repo now contains only website code (app/, components/,
lib/, public/, configs). For deploy tooling, see bjluc/audemation-ops."
git push origin main
```

**Do NOT push yet if Bernard wants to keep these files in audemation-2 as
gh-pages-style docs.** That would be unusual (private repo for ops
material is the reason for this move), but worth a quick check before
the push.

### Step 7 — Verification (5 min)

```bash
# 1. audemation-2 is clean
cd /Volumes/UserFolder/bernard/Desktop/audemation-2
ls  # should NOT contain docs/ or scripts/
git log --oneline -3  # should show the removal commit on top

# 2. audemation-ops has everything
cd /Volumes/UserFolder/bernard/audemation-ops
ls audemation-docs/  # 6 files
ls scripts/          # 3 files
ls hermes-profile/   # SOUL.md, config.yaml, memories/, skills/
ls hermes-profile/skills/ | wc -l  # 53

# 3. Live URL still works (deploy script wasn't broken by the move — it's not loaded from git)
curl -sI https://demo.appaud.com/ | head -1  # should be 200

# 4. The deploy script still works (run --help to confirm imports)
python3 scripts/deploy-mockup.py --help | head -5
```

---

## What can go wrong (and how to recover)

| Risk | What happens | Recovery |
|---|---|---|
| `config.yaml` has a secret (API key, token) | Secret gets committed to a private repo — recoverable but a leak nonetheless | Before committing, `grep -E "api[_-]?key\|token\|password\|secret" config.yaml`. If anything matches, do not copy it. Add to `.gitignore` and document in the README that the file must be created locally. |
| `gh` CLI is not installed and `GITHUB_TOKEN` is unknown | Step 1 can't create the repo via API | Create the repo manually in the GitHub UI (https://github.com/new, name `audemation-ops`, set to Private, do NOT init with README). Then proceed with `git push` directly. |
| `git push` fails with auth error | Token expired or wrong account | Use `gh auth login` to refresh, or use a personal access token with `repo` scope in the URL. |
| `cp -R hermes-profile/skills/` copies symlinks that point outside the source dir | Symlinks end up in the new repo, may not resolve | Run `find hermes-profile/ -type l -ls` to check; if any, copy with `cp -RL` to dereference, or remove the symlinks first. |
| Forgot a file | Some operational material stays in audemation-2 | Easy: do another `git rm` commit, `cp` to audemation-ops, commit + push. |
| Move plan doc (this file) is committed to audemation-2 then moved to audemation-ops | Bizarre circular move | Fine, but in step 3 above, also include `MOVE-TO-AUDEMATION-OPS.md` in the copy. Done. |

---

## Acceptance criteria for "v1 shipped"

- [ ] `bjluc/audemation-ops` exists on GitHub, is private, has the README
- [ ] `audemation-ops/audemation-docs/` has 6 files (2 plans, 3 handoffs, this move plan)
- [ ] `audemation-ops/scripts/` has 3 files (deploy-mockup.py, step-0-diagnostic.sh, install-server-key.sh)
- [ ] `audemation-ops/hermes-profile/` has SOUL.md, config.yaml (if safe), memories/, skills/ (53 skills)
- [ ] `audemation-2` does NOT have `docs/` or `scripts/` after the move
- [ ] `audemation-2` still builds/deploys (Vercel CI hasn't broken)
- [ ] `python3 scripts/deploy-mockup.py --help` from the new repo still works
- [ ] `https://demo.appaud.com/` still returns 200 (live mockup still works)

---

## What this is and isn't

**This IS:**
- A one-time operational cleanup: separating the operator layer from the public marketing site
- The right git structure for two repos with different audiences and lifecycles
- A foundation for future skills / plans / scripts to live in audemation-ops from the start

**This is NOT:**
- A refactor of the audemation-2 site itself
- A change to the live VPS / mockup-on-VPS pipeline (the deploy script still runs from the Mac, just from a different path on disk)
- A change to the audemation Hermes profile's *behaviour* (skills, memories, and SOUL.md are versioned as-is)

---

## Related

- `audemation-2/docs/PLAN-mockup-system.md` — the plan this whole audemation-ops repo's first content was written for
- `audemation-2/docs/PLAN-prospect-research.md` — the next system to build, also lives in audemation-ops after the move
- `audemation-2/docs/SESSION-HANDOFF-v3.md` — the most recent session handoff; it now lives in audemation-ops/audemation-docs/ and references this runbook

## Files added in this session (current)
- `audemation-2/docs/MOVE-TO-AUDEMATION-OPS.md` — this runbook (will move to audemation-ops in the new session)
