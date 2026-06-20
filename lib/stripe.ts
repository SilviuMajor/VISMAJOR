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

export const TIER_TO_PRICE_ENV: Record<"1" | "2" | "3", string> = {
  "1": "STRIPE_PRICE_1_TUBE",
  "2": "STRIPE_PRICE_2_TUBES",
  "3": "STRIPE_PRICE_3_TUBES",
};
