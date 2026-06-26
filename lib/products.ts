// The VIS MAJOR house catalogue. One source of truth for routing, the home
// summary, the cross-link band and per-page metadata. Claim-safe by design:
// every line describes feel or look only — never a medical or anatomical claim.

export type ProductSlug = "gy-no" | "sculpt" | "sharp";

export interface Product {
  slug: ProductSlug;
  href: string;
  index: string; // "001"
  wordmark: string; // "GY-NO!"
  category: string; // "Nipple Tightening Cream"
  /** One-line summary for cards + the cross-link band. */
  short: string;
  /** The signature sensation, one word, for tags. */
  signature: "Cool" | "Worked" | "Matte";
  priceFrom: number; // GBP, early-bird pre-order
  rrpFrom: number; // GBP, RRP at launch
  /** CSS custom property name for this product's accent. */
  accentVar: string;
  /** The same accent as a hex, for gradients / SVG fills. */
  accentHex: string;
}

export const PRODUCTS: Product[] = [
  {
    slug: "gy-no",
    href: "/gy-no",
    index: "001",
    wordmark: "GY-NO!",
    category: "Nipple Tightening Cream",
    short:
      "Cools and tightens in minutes. Up to one hour of temporary firmness, undetectable under a shirt.",
    signature: "Cool",
    priceFrom: 24,
    rrpFrom: 32,
    accentVar: "--steel-blue",
    accentHex: "#378ADD",
  },
  {
    slug: "sculpt",
    href: "/sculpt",
    index: "002",
    wordmark: "SCULPT",
    category: "Contour & Recovery Cream",
    short:
      "A massage cream for men, worked in by hand or with the optional steel tools — for skin that looks firmer and feels worked.",
    signature: "Worked",
    priceFrom: 28,
    rrpFrom: 38,
    accentVar: "--ember",
    accentHex: "#C16A3C",
  },
  {
    slug: "sharp",
    href: "/sharp",
    index: "003",
    wordmark: "SHARP",
    category: "Matte Daily Moisturiser",
    short:
      "A lightweight daily moisturiser that kills shine and sharpens the look of your features.",
    signature: "Matte",
    priceFrom: 22,
    rrpFrom: 30,
    accentVar: "--mint",
    accentHex: "#2F9E86",
  },
];

export const bySlug = (slug: ProductSlug): Product =>
  PRODUCTS.find((p) => p.slug === slug) ?? PRODUCTS[0];

export const others = (slug: ProductSlug): Product[] =>
  PRODUCTS.filter((p) => p.slug !== slug);
