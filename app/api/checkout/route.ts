import { NextResponse } from "next/server";
import { getStripe, TIER_TO_PRICE_ENV } from "@/lib/stripe";

const FALLBACK_AMOUNTS_GBP: Record<"1" | "2" | "3", number> = {
  "1": 1499,
  "2": 2499,
  "3": 3499,
};

const QTYS: Record<"1" | "2" | "3", number> = { "1": 1, "2": 2, "3": 3 };

export async function POST(req: Request) {
  let tier: "1" | "2" | "3";
  try {
    const body = await req.json();
    tier = body?.tier;
    if (!["1", "2", "3"].includes(tier)) throw new Error("Bad tier");
  } catch {
    return NextResponse.json(
      { error: "Invalid request body. Expecting { tier: '1' | '2' | '3' }." },
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

  const priceEnv = TIER_TO_PRICE_ENV[tier];
  const priceId = process.env[priceEnv];

  try {
    const lineItems: any[] = priceId
      ? [{ price: priceId, quantity: 1 }]
      : [
          {
            quantity: 1,
            price_data: {
              currency: "gbp",
              unit_amount: FALLBACK_AMOUNTS_GBP[tier],
              product_data: {
                name: `GY-NO Cooling Tightening Gel — ${QTYS[tier]} tube${
                  QTYS[tier] > 1 ? "s" : ""
                }`,
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
      success_url: `${siteUrl}/?status=ok#buy`,
      cancel_url: `${siteUrl}/?status=cancel#buy`,
      shipping_address_collection: { allowed_countries: ["GB"] },
      allow_promotion_codes: true,
      metadata: { tier, qty: String(QTYS[tier]) },
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Stripe error." },
      { status: 500 }
    );
  }
}
