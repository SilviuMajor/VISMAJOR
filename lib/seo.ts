// Shared SEO primitives: the canonical origin, the OpenGraph fragment every
// page must re-spread, and the JSON-LD builders.
//
// Two things drive the shape of this file:
//
// 1. Next merges `metadata` SHALLOWLY. A page that sets *any* `openGraph` key
//    replaces the root layout's `openGraph` object wholesale — siteName, locale
//    and type included. So the shared defaults live here as a fragment and get
//    spread into every page's own `openGraph`.
// 2. Structured data is a compliance surface, not a growth hack. There are no
//    real reviews for these products, so NOTHING in this file emits
//    `aggregateRating` or `review`. Fabricated review markup is the fastest
//    route to a manual action, and it can never appear on Organization at all.

import type { Metadata } from "next";

/** The one canonical origin. Everything absolute resolves against it. */
export const SITE_URL = "https://vismajor.co.uk";

/** The house name, as it should read in a share card and in structured data. */
export const SITE_NAME = "VIS MAJOR";

export const SITE_DESCRIPTION =
  "A small house of precision topicals for men. Cosmetic, temporary by design, each engineered to do exactly one thing. Made in the UK.";

/** Site-relative path to an absolute URL. */
export const abs = (path: string): string => new URL(path, SITE_URL).toString();

/* The only two values the generated icon and share card are allowed to use.
   They mirror --ink-0 / --paper-0 in globals.css; next/og runs outside the CSS
   pipeline, so the literals have to be repeated here. */
export const INK = "#14130F";
export const PAPER = "#FFFFFF";

/**
 * The OpenGraph defaults. Spread this into every page's `openGraph` — see the
 * shallow-merge note above; a page that omits it silently drops siteName and
 * locale from its share card.
 */
export const sharedOpenGraph = {
  siteName: SITE_NAME,
  locale: "en_GB",
  type: "website",
} as const satisfies Metadata["openGraph"];

/* ------------------------------------------------------------------ *
 * Catalogue — the commerce facts that structured data needs.
 * `lib/products.ts` stays the source of truth for the three topicals'
 * editorial copy; STEEL is a tool and sits outside that list, so the
 * SEO-facing facts for all four live here in one shape.
 * ------------------------------------------------------------------ */

export interface ProductSeo {
  /** Route, e.g. "/pectus". Doubles as the canonical path. */
  path: string;
  /** Wordmark, e.g. "PECTUS". */
  wordmark: string;
  /** The category line, e.g. "Cooling Chest Primer". */
  category: string;
  /** Net quantity, e.g. "20ml". */
  size: string;
  /** GBP, as a number here and serialised to a 2dp string in the Offer. */
  price: number;
  sku: string;
  description: string;
  /**
   * Site-relative image paths, best first. PECTUS and STEEL have real product
   * photography; SCULPT and STONE currently fall back to their page artwork
   * because no packshot exists yet. Swap those two in here when shot.
   */
  images: string[];
}

export const PRODUCT_SEO: Record<
  "pectus" | "stone" | "sculpt" | "steel",
  ProductSeo
> = {
  pectus: {
    path: "/pectus",
    wordmark: "PECTUS",
    category: "Cooling Chest Primer",
    size: "20ml",
    price: 18,
    sku: "VM-PECTUS-20",
    description:
      "A fast-acting cooling and tightening chest primer for men. Works in minutes, with up to one hour of temporary firmness, matte and undetectable under a shirt. Cosmetic and temporary by design. Made in the UK.",
    images: ["/product/front.png", "/product/front-angle.png", "/scenes/pectus.png"],
  },
  stone: {
    path: "/stone",
    wordmark: "STONE",
    category: "Matte Cleanser",
    size: "100ml",
    price: 22,
    sku: "VM-STONE-100",
    description:
      "A natural matte cleanser for men: clay, charcoal and mint lift the day's oil and grime, then rinse away to leave skin clean, fresh and matte. Sulphate-free. Made in the UK.",
    images: ["/scenes/stone.png", "/men/stone-wash.png"],
  },
  sculpt: {
    path: "/sculpt",
    wordmark: "SCULPT",
    category: "Contour & Recovery Cream",
    size: "50ml",
    price: 28,
    sku: "VM-SCULPT-50",
    description:
      "A massage and recovery cream for men, worked in by hand or with the STEEL tool, for skin that looks firmer and feels worked. Cosmetic and temporary by design. Made in the UK.",
    images: ["/scenes/sculpt.png", "/men/sculpt-figure.png"],
  },
  steel: {
    path: "/steel",
    wordmark: "STEEL",
    category: "Weighted Massage & Therapy Tool",
    size: "One blade",
    price: 24,
    sku: "VM-STEEL-01",
    description:
      "One weighted, machined-steel massage and therapy blade with several contoured edges: a fine point, a long flat and a hooked belly. For working tension, recovery and contour, by hand or with the SCULPT cream. Made in the UK.",
    images: ["/product/steel-sword.png", "/scenes/steel.png"],
  },
};

/* ------------------------------------------------------------------ *
 * JSON-LD builders
 * ------------------------------------------------------------------ */

/**
 * Product + Offer for a product page.
 *
 * Required Offer fields are all present and correctly typed: `price` is a
 * positive decimal STRING (Google rejects numbers formatted as "18"), currency
 * is GBP, availability and itemCondition are full schema.org URLs, and `url`
 * is absolute.
 *
 * Deliberately absent: `aggregateRating` and `review`. Do not add them until
 * there are real, verifiable customer reviews to back them.
 */
export function productLd(p: ProductSeo) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${p.wordmark} ${p.category}`,
    alternateName: p.wordmark,
    description: p.description,
    image: p.images.map(abs),
    sku: p.sku,
    size: p.size,
    category: "Health & Beauty > Personal Care",
    countryOfOrigin: {
      "@type": "Country",
      name: "United Kingdom",
    },
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    url: abs(p.path),
    offers: {
      "@type": "Offer",
      url: abs(p.path),
      price: p.price.toFixed(2),
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    },
  } as const;
}

/**
 * The house itself, for the homepage.
 *
 * Never carries `aggregateRating` — an Organization rating cannot be earned by
 * a product review and Google treats self-serving ones as spam.
 */
export function organisationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: "VIS MAJOR LTD",
    url: SITE_URL,
    logo: abs("/icon"),
    image: abs("/opengraph-image"),
    description: SITE_DESCRIPTION,
    email: "hello@vismajor.co.uk",
    foundingDate: "2026",
    address: {
      "@type": "PostalAddress",
      addressCountry: "GB",
    },
  } as const;
}

/** Serialise LD for `dangerouslySetInnerHTML`, escaping the `</script>` case. */
export const ldJson = (ld: unknown): string =>
  JSON.stringify(ld).replace(/</g, "\\u003c");
