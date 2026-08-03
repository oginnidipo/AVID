import type { APIRoute } from "astro";
import { SITE } from "../data/site";
import { IS_PRODUCTION } from "../lib/env";

/**
 * robots.txt, generated rather than static so a preview deploy can block
 * crawlers outright. See src/lib/env.ts for how production is identified.
 */
export const GET: APIRoute = () => {
  const body = IS_PRODUCTION
    ? `User-agent: *
Allow: /
Disallow: /thank-you
Disallow: /admin/

Sitemap: ${SITE.url}/sitemap-index.xml
`
    : `# Preview deploy — not the public site.
# Blocked so a test copy never competes with ${SITE.url} in search results.
User-agent: *
Disallow: /
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
