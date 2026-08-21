/**
 * Canonical site origin — the single source of truth for the host.
 *
 * audemation.com 308-redirects to www.audemation.com, so every URL the
 * site emits must use the www form. Sitemap entries and the robots.txt
 * sitemap pointer previously hardcoded the apex, which listed eight
 * redirecting URLs as if they were canonical.
 */
export const SITE_URL = "https://www.audemation.com";
