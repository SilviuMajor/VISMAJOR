import { NextResponse } from "next/server";
import { getStripe, priceEnvFor } from "@/lib/stripe";
import { bySlug, type ProductSlug } from "@/lib/products";

type Tier = "1" | "2" | "3";

// Server-authoritative catalogue. Amounts in GBP pence. Each tier optionally
// maps to a real Stripe Price via env (see lib/stripe). Until those are set,
// the fallback amount + name below is used so the flow still works.
const CATALOG: Record<
  ProductSlug,
  { name: string; tiers: Record<Tier, { label: string; amount: number }> }
> = {
  "gy-no": {
    name: "GY-NO! Nipple Tightening Cream",
    tiers: {
      "1": { label: "20ml", amount: 2400 },
      "2": { label: "40ml", amount: 4200 },
      "3": { label: "2 × 20ml", amount: 4400 },
    },
  },
  chisel: {
    name: "CHISEL Contour Sculpt",
    tiers: {
      "1": { label: "Cream · 50ml", amount: 2800 },
      "2": { label: "Cream + Steel Tool", amount: 3900 },
      "3": { label: "Cream + Tool · 2-pack", amount: 6800 },
    },
  },
  sharp: {
    name: "SHARP Matte Daily Moisturiser",
    tiers: {
      "1": { label: "50ml", amount: 2200 },
      "2": { label: "100ml", amount: 3800 },
      "3": { label: "2 × 50ml", amount: 4000 },
    },
  },
};

export async function POST(req: Request) {
  let tier: Tier;
  let product: ProductSlug;
  try {
    const body = await req.json();
    tier = body?.tier;
    product = (body?.product ?? "gy-no") as ProductSlug;
    if (!["1", "2", "3"].includes(tier)) throw new Error("Bad tier");
    if (!CATALOG[product]) throw new Error("Bad product");
  } catch {
    return NextResponse.json(
      {
        error:
          "Invalid request body. Expecting { product?: 'gy-no'|'chisel'|'sharp', tier: '1'|'2'|'3' }.",
      },
      { status: 400 }
    );
  }

  const stripe = getStripe();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3030";

  // No Stripe configured yet — return a friendly stub so the UI can still flow.
  if (!stripe) {
    return NextResponse.json(
      {
        error:
          "Checkout isn't wired up yet. Add STRIPE_SECRET_KEY and price IDs to .env.local to enable real pre-orders.",
      },
      { status: 503 }
    );
  }

  const entry = CATALOG[product];
  const tierInfo = entry.tiers[tier];
  const priceId = process.env[priceEnvFor(product, tier)];
  const backHref = bySlug(product).href;

  try {
    const lineItems: any[] = priceId
      ? [{ price: priceId, quantity: 1 }]
      : [
          {
            quantity: 1,
            price_data: {
              currency: "gbp",
              unit_amount: tierInfo.amount,
              product_data: {
                name: `${entry.name} — ${tierInfo.label}`,
                description: `Pre-order. Ships ${
                  process.env.PREORDER_SHIP_MONTH ?? "TBA"
                }.`,
              },
            },
          },
        ];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${siteUrl}${backHref}?status=ok#buy`,
      cancel_url: `${siteUrl}${backHref}?status=cancel#buy`,
      shipping_address_collection: { allowed_countries: ["GB"] },
      allow_promotion_codes: true,
      metadata: { product, tier },
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Stripe error." },
      { status: 500 }
    );
  }
}
