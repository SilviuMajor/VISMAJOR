"use client";

import { useState } from "react";
import { useAddToCart, type CartProductSlug } from "@/lib/cart";

export type Tier = {
  key: string;
  /** Human label, e.g. "2-pack". */
  label: string;
  /** What you actually get, e.g. "2 x 20ml". */
  unit: string;
  price: number;
  note?: string;
};

/**
 * The buy control both renditions share.
 *
 * Deliberately smaller than the live site's buy panel, which pairs a tier
 * selector with a quantity stepper. Two multipliers on one decision is one too
 * many: the packs already carry the upsell, and a stepper defaulted to 1 is a
 * control most people never touch and some people stall on. Quantity moves to
 * the cart, where changing it is expected.
 *
 * `tone="dark"` inverts it for Colosseum's ink slabs.
 */
export function AddToBag({
  product,
  productName,
  cartPrefix,
  tiers,
  defaultTier,
  tone = "light",
  className = "",
}: {
  product: CartProductSlug;
  productName: string;
  /** Cart id prefix. Must match the live site's, or the drawer shows two lines
   *  for the same thing when someone browses a rendition and then the shop. */
  cartPrefix: string;
  tiers: Tier[];
  defaultTier?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const [key, setKey] = useState(defaultTier ?? tiers[0].key);
  const { addToCart, adding } = useAddToCart();
  const tier = tiers.find((t) => t.key === key) ?? tiers[0];
  const dark = tone === "dark";

  return (
    <div className={className}>
      <div className="flex flex-col gap-2" role="radiogroup" aria-label="Size">
        {tiers.map((t) => {
          const on = t.key === tier.key;
          return (
            <button
              key={t.key}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setKey(t.key)}
              className={`flex items-center justify-between gap-4 border px-4 py-3 text-left transition-colors ${
                on
                  ? dark
                    ? "border-white bg-white text-[#14130F]"
                    : "border-ink-0 bg-ink-0 text-paper-0"
                  : dark
                    ? "border-white/25 text-white/80 hover:border-white/60"
                    : "border-[var(--hair-strong)] text-ink-1 hover:border-ink-0"
              }`}
            >
              <span className="flex min-w-0 items-baseline gap-2.5">
                <span className="text-[14px] font-semibold">{t.label}</span>
                <span className="truncate text-[11.5px] opacity-60">
                  {t.unit}
                </span>
              </span>
              <span className="flex shrink-0 items-baseline gap-2.5">
                {t.note && (
                  <span
                    className="text-[9.5px] font-semibold uppercase opacity-70"
                    style={{ letterSpacing: "0.12em" }}
                  >
                    {t.note}
                  </span>
                )}
                <span className="num text-[15px] font-semibold tabular-nums">
                  £{t.price}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        disabled={adding}
        onClick={() =>
          addToCart({
            id: `${cartPrefix}:${tier.key}`,
            product,
            productName,
            tier: tier.key,
            tierLabel: tier.label,
            price: tier.price,
          })
        }
        className={`mt-3 flex w-full items-center justify-center gap-2 px-6 py-4 text-[14px] font-semibold transition-opacity disabled:opacity-60 ${
          dark ? "bg-white text-[#14130F]" : "bg-ink-0 text-paper-0"
        }`}
      >
        {adding ? "Added" : "Add to bag"}
        <span className="num tabular-nums opacity-70">· £{tier.price}</span>
      </button>
    </div>
  );
}
