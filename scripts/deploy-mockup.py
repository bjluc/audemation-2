#!/usr/bin/env python3
"""
deploy-mockup.py — push a local mockup folder to a prospect URL on the
Hetzner VPS, in under 60 seconds. Writes to the audemation_mockups
Postgres ledger, smoke-tests, and captures desktop + mobile screenshots
for Bernard's review.

Usage:
    ./deploy-mockup.py <slug> <local-source-dir>
    ./deploy-mockup.py <slug> <local-source-dir> --domain appaud.com
    ./deploy-mockup.py <slug> <local-source-dir> --dry-run
    ./deploy-mockup.py <slug> <local-source-dir> --no-screenshot

Behaviour (per docs/PLAN-mockup-system.md step 7):
  1. Validate slug matches [a-z0-9-]+, source dir exists, has index.html
  2. rsync files to root@<vps>:/var/www/mockups/<slug>/
  3. chmod 644 on every uploaded file (handoff gotcha: scp preserves 600)
  4. Smoke test: curl -sI https://<slug>.<domain>/ -> 200
  5. Write to ledger (prospects + mockup_deploys tables)
  6. Playwright screenshots: 1440x900 and 375x900 to ~/Desktop/mockup-screenshots/
  7. Print live URL + screenshot paths. "Confirm with Bernard before
     sending to prospect."

Idempotent: re-running for an existing slug updates the live site AND
updates the ledger row.

Environment:
  - SSH key:  /Volumes/UserFolder/bernard/.ssh/audemation_v2
              (hard-coded; this script is Mac-local and only ever runs
              from Bernard's machine)
  - Domain:   appaud.com (default, overridable via --domain)
  - VPS host: 77.42.68.164 (Hetzner cloud)

Exit codes:
  0  success
  1  validation error (bad slug, missing source dir, no index.html)
  2  rsync / ssh error
  3  smoke test failed (file uploaded but URL not 200)
  4  ledger write failed
  5  screenshot failed (non-fatal warning, but report)
"""

from __future__ import annotations

import argparse
import os
import re
import shutil
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

# --- Hard-coded deployment constants ----------------------------------------

SSH_KEY = "/Volumes/UserFolder/bernard/.ssh/audemation_v2"
VPS_HOST = "root@77.42.68.164"
VPS_PORT = 22
REMOTE_MOCKUPS_DIR = "/var/www/mockups"
REMOTE_CREDS_FILE = "/root/.secrets/audemation_db_creds"
SCREENSHOTS_DIR = Path("/Volumes/UserFolder/bernard/Desktop/mockups-screenshots")

# --- Helpers -----------------------------------------------------------------

SLUG_RE = re.compile(r"^[a-z0-9][a-z0-9-]{0,62}$")


def run(cmd: list[str], *, check: bool = True, capture: bool = True,
        timeout: int = 60) -> subprocess.CompletedProcess:
    """Run a command, return CompletedProcess. check=False to ignore exit."""
    return subprocess.run(
        cmd, check=check, capture_output=capture, text=True, timeout=timeout
    )


def ssh_cmd(*remote_args: str) -> list[str]:
    """Build an SSH command list targeting the VPS with the audemation key."""
    return [
        "/usr/bin/ssh",
        "-i", SSH_KEY,
        "-o", "IdentitiesOnly=yes",
        "-o", "BatchMode=yes",
        "-o", "StrictHostKeyChecking=accept-new",
        "-p", str(VPS_PORT),
        VPS_HOST,
        "--",
        *remote_args,
    ]


def scp_upload(local_path: str | Path, remote_path: str) -> None:
    """Upload a single local file/dir to a remote path on the VPS."""
    cmd = [
        "/usr/bin/scp",
        "-i", SSH_KEY,
        "-o", "IdentitiesOnly=yes",
        "-o", "BatchMode=yes",
        "-o", "StrictHostKeyChecking=accept-new",
        "-P", str(VPS_PORT),
        str(local_path),
        f"{VPS_HOST}:{remote_path}",
    ]
    run(cmd, timeout=120)


def rsync_upload(local_dir: str | Path, remote_path: str) -> None:
    """rsync local_dir/ to VPS:remote_path/ (with --delete for clean re-runs)."""
    # Use rsync over ssh. If rsync isn't on the Mac or VPS, fall back to scp.
    cmd = [
        "/usr/bin/rsync",
        "-avz",
        "--delete",
        "-e",
        f"ssh -i {SSH_KEY} -o IdentitiesOnly=yes -o BatchMode=yes "
        f"-o StrictHostKeyChecking=accept-new -p {VPS_PORT}",
        f"{local_dir}/",  # trailing slash = copy contents, not the dir itself
        f"{VPS_HOST}:{remote_path}/",
    ]
    try:
        run(cmd, timeout=300)
    except FileNotFoundError:
        # rsync not installed locally — fall back to scp -r
        print("⚠  rsync not found locally, falling back to scp -r (no --delete)",
              file=sys.stderr)
        cmd = [
            "/usr/bin/scp",
            "-i", SSH_KEY,
            "-o", "IdentitiesOnly=yes",
            "-o", "BatchMode=yes",
            "-o", "StrictHostKeyChecking=accept-new",
            "-P", str(VPS_PORT),
            "-r",
            str(local_dir),
            f"{VPS_HOST}:{remote_path.rsplit('/', 1)[0]}/",
        ]
        run(cmd, timeout=300)
    except subprocess.CalledProcessError as e:
        # rsync exists but failed — surface the error
        raise RuntimeError(f"rsync failed: {e.stderr}") from e


# --- Steps -------------------------------------------------------------------

def step_validate(slug: str, source_dir: Path) -> None:
    if not SLUG_RE.match(slug):
        print(f"✗ Invalid slug {slug!r}: must match [a-z0-9][a-z0-9-]{{0,62}}",
              file=sys.stderr)
        sys.exit(1)
    if not source_dir.is_dir():
        print(f"✗ Source dir does not exist: {source_dir}", file=sys.stderr)
        sys.exit(1)
    if not (source_dir / "index.html").is_file():
        print(f"✗ Source dir missing index.html: {source_dir}", file=sys.stderr)
        sys.exit(1)


def step_upload(slug: str, source_dir: Path, dry_run: bool = False) -> None:
    remote_path = f"{REMOTE_MOCKUPS_DIR}/{slug}"
    print(f"[1/5] Uploading {source_dir}/ -> {VPS_HOST}:{remote_path}/")
    if dry_run:
        print("    (dry-run, skipped)")
        return
    rsync_upload(source_dir, remote_path)
    # Critical: chmod 644 on every uploaded file. SCP/rsync from /tmp/ often
    # preserves 600 perms, which nginx then 403s. (Handoff v2 gotcha.)
    print(f"[2/5] chmod 644 on {remote_path}/")
    run(ssh_cmd(
        f"find {remote_path} -type f -exec chmod 644 {{}} + && "
        f"find {remote_path} -type d -exec chmod 755 {{}} + && "
        f"echo 'perms ok'"
    ))


def step_smoke_test(slug: str, domain: str, dry_run: bool = False) -> None:
    url = f"https://{slug}.{domain}/"
    print(f"[3/5] Smoke-testing {url}")
    if dry_run:
        print("    (dry-run, skipped)")
        return
    r = run(["/usr/bin/curl", "-sI", "-o", "/dev/null", "-w", "%{http_code}",
             url], timeout=30)
    code = r.stdout.strip()
    if code != "200":
        print(f"✗ Smoke test FAILED: {url} returned {code}", file=sys.stderr)
        print("  Check that the slug directory was created and has readable "
              "files:", file=sys.stderr)
        print(f"  {REMOTE_MOCKUPS_DIR}/{slug}/", file=sys.stderr)
        sys.exit(3)
    print(f"    ✓ {code} OK")


def step_ledger(slug: str, source_dir: Path, domain: str,
                dry_run: bool = False) -> None:
    print(f"[4/5] Writing to audemation_mockups ledger")
    if dry_run:
        print("    (dry-run, skipped)")
        return
    # Use the deploy user's existing creds file on the VPS (no password
    # transmission, no extra secrets to manage). The SQL does both an
    # upsert on prospects and an append on mockup_deploys.
    sql = (
        "INSERT INTO prospects (slug, name, status, notes) "
        f"VALUES ('{slug}', '{slug}', 'mockup_live', "
        f"'deployed via deploy-mockup.py on {datetime.now().strftime('%Y-%m-%dT%H:%M:%SZ')}') "
        "ON CONFLICT (slug) DO UPDATE SET "
        "status = 'mockup_live', updated_at = now();\n"
        f"INSERT INTO mockup_deploys (slug, deployed_by, source_dir, notes) "
        f"VALUES ('{slug}', 'bernard', '{source_dir}', 'via deploy-mockup.py');\n"
    )
    remote = (
        f"set -a; source {REMOTE_CREDS_FILE}; set +a; "
        f"psql -v ON_ERROR_STOP=1 <<'SQL'\n{sql}SQL\n"
    )
    try:
        run(ssh_cmd(remote), timeout=30)
    except subprocess.CalledProcessError as e:
        print(f"✗ Ledger write FAILED: {e.stderr}", file=sys.stderr)
        sys.exit(4)


def step_screenshot(slug: str, domain: str, dry_run: bool = False,
                    skip: bool = False) -> list[Path]:
    print(f"[5/5] Capturing desktop + mobile screenshots")
    if dry_run or skip:
        print("    (skipped)")
        return []
    if not SCREENSHOTS_DIR.is_dir():
        SCREENSHOTS_DIR.mkdir(parents=True, exist_ok=True)
    ts = datetime.now().strftime("%Y%m%d-%H%M%S")
    desktop = SCREENSHOTS_DIR / f"{slug}-{ts}-desktop.png"
    mobile = SCREENSHOTS_DIR / f"{slug}-{ts}-mobile.png"
    url = f"https://{slug}.{domain}/"
    # Try Playwright first. Fall back to nothing if not installed — caller
    # reviews the URL manually in that case.
    try:
        from playwright.sync_api import sync_playwright  # type: ignore
    except ImportError:
        print("    ⚠ playwright not installed — skipping screenshots.")
        print("      Install with: pip3 install playwright && "
              "python3 -m playwright install chromium")
        return []
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch()
            for viewport, path in [
                ({"width": 1440, "height": 900}, desktop),
                ({"width": 375, "height": 900}, mobile),
            ]:
                ctx = browser.new_context(viewport=viewport)
                page = ctx.new_page()
                page.goto(url, wait_until="networkidle", timeout=20000)
                page.screenshot(path=str(path), full_page=False)
                ctx.close()
            browser.close()
    except Exception as e:
        print(f"    ⚠ Screenshot failed: {e}", file=sys.stderr)
        return []
    return [desktop, mobile]


# --- Main --------------------------------------------------------------------

def main() -> int:
    parser = argparse.ArgumentParser(
        description="Deploy a local mockup to a prospect URL on appaud.com",
    )
    parser.add_argument("slug", help="Prospect slug (e.g. 'casacomfort')")
    parser.add_argument("source_dir", help="Local dir with index.html + assets")
    parser.add_argument("--domain", default="appaud.com",
                        help="Apex domain (default: appaud.com)")
    parser.add_argument("--dry-run", action="store_true",
                        help="Validate + print steps but make no changes")
    parser.add_argument("--no-screenshot", action="store_true",
                        help="Skip the desktop + mobile screenshot step")
    args = parser.parse_args()

    source_dir = Path(args.source_dir).expanduser().resolve()
    slug = args.slug.strip().lower()
    domain = args.domain.strip().lower()

    print("=" * 60)
    print(f"  audemation mockup deploy")
    print(f"  slug:        {slug}")
    print(f"  source:      {source_dir}")
    print(f"  target:      https://{slug}.{domain}/")
    print(f"  vps:         {VPS_HOST}")
    print("=" * 60)

    step_validate(slug, source_dir)
    step_upload(slug, source_dir, dry_run=args.dry_run)
    step_smoke_test(slug, domain, dry_run=args.dry_run)
    step_ledger(slug, source_dir, domain, dry_run=args.dry_run)
    screenshots = step_screenshot(slug, domain, dry_run=args.dry_run,
                                  skip=args.no_screenshot)

    print()
    print("=" * 60)
    print(f"  ✓ Deployed.")
    print(f"  Live URL:    https://{slug}.{domain}/")
    if screenshots:
        print(f"  Screenshots:")
        for s in screenshots:
            print(f"    - {s}")
    print()
    print("  Next: open the screenshots, confirm the mockup looks right,")
    print("  then send the URL to the prospect.")
    print("=" * 60)
    return 0


if __name__ == "__main__":
    sys.exit(main())
