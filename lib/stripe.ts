import Stripe from "stripe";

let cached: Stripe | null = null;

export function getStripe(): Stripe | null {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  // No apiVersion pinned here — the installed SDK uses its built-in default,
  // which keeps the production type-check (and Vercel build) clean.
  cached = new Stripe(key);
  return cached;
}

import type { ProductSlug } from "@/lib/products";

// Map a product + tier to the env var holding its Stripe Price ID.
// GY-NO! keeps its original env names for backward compatibility; the rest
// follow STRIPE_PRICE_<PRODUCT>_<TIER> (e.g. STRIPE_PRICE_CHISEL_2).
export function priceEnvFor(product: ProductSlug, tier: "1" | "2" | "3"): string {
  if (product === "gy-no") {
    return { "1": "STRIPE_PRICE_1_TUBE", "2": "STRIPE_PRICE_2_TUBES", "3": "STRIPE_PRICE_3_TUBES" }[
      tier
    ];
  }
  return `STRIPE_PRICE_${product.toUpperCase()}_${tier}`;
}
