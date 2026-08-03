/**
 * Is this build the real, public site?
 *
 * Anything that is not explicitly production — preview deploys, staging URLs, a
 * colleague's laptop — is marked `noindex` and blocked in robots.txt, so a test
 * copy can never end up in Google competing with the real domain. Premature
 * indexing is genuinely awkward to undo: search engines cache aggressively, and
 * a half-finished page can outrank the finished one for weeks.
 *
 * Indexing is therefore opt-in. Set this environment variable on the production
 * host only:
 *
 *     SITE_ENV=production
 *
 * It is already set in netlify.toml. For Cloudflare Pages add it under
 * Settings → Environment variables (Production only — leave it unset for
 * preview branches, which is exactly what you want).
 *
 * Read from `process.env` rather than `import.meta.env` because this is a
 * build-time decision for a static site, and it must not need a `PUBLIC_`
 * prefix that would leak it into the client bundle.
 */
export const IS_PRODUCTION = process.env.SITE_ENV === "production";

/** Human-readable label, used in the staging banner. */
export const DEPLOY_LABEL = process.env.SITE_ENV ?? "preview";
