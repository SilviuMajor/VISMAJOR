import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * robots.txt.
 *
 * Two things worth knowing:
 *
 * 1. Disallow stops crawling, not indexing. A blocked URL can still be indexed
 *    from an inbound link, listed with no snippet. So every route listed below
 *    ALSO carries `robots: { index: false, follow: false }` in its own
 *    metadata — that is the half that actually keeps it out of the index.
 * 2. Preview and development deployments must never be crawlable. Vercel gives
 *    every branch deploy a public hostname; without the guard below, the review
 *    site would compete with production for the same content.
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === "production";

  if (!isProduction) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/checkout",
        "/hero-lab",
        "/nav-lab",
        "/nav-hero",
        "/v2",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
