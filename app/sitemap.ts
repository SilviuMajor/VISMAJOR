import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * The sitemap lists ONLY real customer-facing pages.
 *
 * Deliberately excluded, and they must stay excluded:
 *   /checkout, /checkout/confirmed  — transactional, noindexed
 *   /hero-lab, /nav-lab, /nav-hero  — internal design labs
 *   /v2 and everything under it     — the annotated review site
 *   /api/*                          — not pages
 *
 * The list is written out rather than derived from the filesystem precisely so
 * that adding a new lab route can never quietly publish it.
 */
const ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/pectus", priority: 0.9 },
  { path: "/stone", priority: 0.9 },
  { path: "/sculpt", priority: 0.9 },
  { path: "/steel", priority: 0.9 },
  { path: "/help", priority: 0.4 },
  { path: "/legal", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority }) => ({
    url: new URL(path, SITE_URL).toString(),
    priority,
  }));
}
