"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHead } from "@/components/ui/Eyebrow";
import { SteelTool } from "@/components/chisel/Art";
import { useCart } from "@/lib/cart";

type Tier = {
  key: "short" | "long" | "pair";
  label: string;
  unitLabel: string;
  price: number;
  reg: number;
  note?: string;
};

// Standalone pre-order prices (placeholder — confirm with Silviu). The SCULPT
// bundles still add the same bars on top of the cream at a set discount.
const TIERS: Tier[] = [
  { key: "short", label: "Short Steel", unitLabel: "Control bar", price: 24, reg: 34 },
  { key: "long", label: "Long Steel", unitLabel: "Reach bar", price: 30, reg: 42, note: "Most chosen" },
  { key: "pair", label: "The Pair", unitLabel: "Both bars", price: 48, reg: 66, note: "Best value" },
];

const SPECS: Record<Tier["key"], [string, string][]> = {
  short: [
    ["In the set", "1 × Short bar"],
    ["Best for", "Jaw · neck · forearms"],
    ["Length", "Approx. 120mm"],
    ["Material", "Machined stainless steel"],
  ],
  long: [
    ["In the set", "1 × Long bar"],
    ["Best for", "Chest · back · legs"],
    ["Length", "Approx. 175mm"],
    ["Material", "Machined stainless steel"],
  ],
  pair: [
    ["In the set", "Short + Long bars"],
    ["Best for", "The whole body"],
    ["Length", "120mm + 175mm"],
    ["Material", "Machined stainless steel"],
  ],
};

/** The selected tier's bars, drawn at the right reach. */
function ToolArt({ tier }: { tier: Tier["key"] }) {
  if (tier === "pair") {
    return (
      <div className="relative w-[78%]">
        <div className="w-full -rotate-[8deg]">
          <SteelTool className="h-auto w-full" warmth={0} />
        </div>
        <div className="mt-6 w-[62%] translate-x-[30%] rotate-[6deg]">
          <SteelTool className="h-auto w-full" warmth={0} />
        </div>
      </div>
    );
  }
  return (
    <div className={`-rotate-[10deg] ${tier === "long" ? "w-[82%]" : "w-[58%]"}`}>
      <SteelTool className="h-auto w-full" warmth={0} />
    </div>
  );
}

export function SteelBuy({ shipMonth }: { shipMonth: string }) {
  const [tierKey, setTierKey] = useState<Tier["key"]>("long");
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  const tier = useMemo(() => TIERS.find((t) => t.key === tierKey) ?? TIERS[0], [tierKey]);
  const total = tier.price * qty;
  const saving = (tier.reg - tier.price) * qty;
  const pct = Math.round((1 - tier.price / tier.reg) * 100);

  const onAdd = () =>
    add({
      id: `steel:${tier.key}`,
      product: "steel",
      productName: "STEEL",
      tier: tier.key,
      tierLabel: tier.label,
      price: tier.price,
      qty,
    });

  return (
    <section id="buy" className="border-t py-16 md:py-24" style={{ borderColor: "var(--hair)" }}>
      <Container>
        <SectionHead n="04" title="Pre-order STEEL" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14">
          {/* specimen */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative flex aspect-square items-center justify-center">
              <span className="absolute left-0.5 top-0 z-20 caps text-[9px] font-medium text-ink-3">
                STEEL / IV
              </span>
              <span className="absolute bottom-0 right-0.5 z-20 caps text-[9px] font-medium text-ink-3">
                {tier.label}
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={tier.key}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.03 }}
                  transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
                  className="flex w-[80%] items-center justify-center"
                >
                  <ToolArt tier={tier.key} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* details */}
          <div>
            <Eyebrow>STEEL · No. IV</Eyebrow>
            <h2
              className="mt-4 font-extrabold uppercase text-ink-0"
              style={{ fontSize: "clamp(48px, 5.4vw, 72px)", lineHeight: 0.9, letterSpacing: "-0.01em" }}
            >
              {tier.label}
            </h2>
            <div className="caps mt-4 text-[15px] font-medium text-ink-1">
              Weighted massage &amp; therapy bar
            </div>
            <p className="mt-5 max-w-md text-[18px] leading-[1.65] text-ink-1">
              Cold, machined steel with a contoured edge and a knurled grip.
              Heavy enough to do the work for you — drained, eased and worked,
              by hand or with the cream.
            </p>

            {/* price */}
            <div className="mt-7 flex items-end justify-between gap-4 border-t pt-6" style={{ borderColor: "var(--hair)" }}>
              <div>
                <span className="caps inline-flex items-center gap-2 text-[10px] font-semibold text-ink-3">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-ink-0" />
                  Early-bird pre-order
                </span>
                <div className="mt-3 flex items-baseline gap-3">
                  <span
                    className="font-extrabold text-ink-0"
                    style={{ fontSize: "clamp(36px, 4.4vw, 52px)", letterSpacing: "-0.02em", lineHeight: 1 }}
                  >
                    £{tier.price}
                  </span>
                  <span className="text-[18px] text-ink-3 line-through">£{tier.reg}</span>
                  <span className="caps rounded-xs bg-ink-0 px-2 py-1 text-[9px] font-semibold text-paper-0">
                    Save {pct}%
                  </span>
                </div>
              </div>
              <span className="caps max-w-[44%] text-right text-[10px] font-medium leading-relaxed text-ink-3">
                RRP £{tier.reg} once the first batch ships
              </span>
            </div>

            {/* tier selector */}
            <div className="mt-8">
              <div className="caps text-[10px] font-semibold text-ink-3">Choose your steel</div>
              <div className="mt-3 flex flex-col gap-2.5">
                {TIERS.map((t) => {
                  const selected = t.key === tier.key;
                  return (
                    <button
                      key={t.key}
                      onClick={() => setTierKey(t.key)}
                      className={`relative flex items-center justify-between rounded-sm px-5 py-4 text-left transition-colors ${
                        selected
                          ? "bg-ink-0 text-paper-0"
                          : "bg-[rgba(20,19,15,0.03)] text-ink-0 hover:bg-[rgba(20,19,15,0.06)]"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                            selected ? "border-paper-0" : "border-ink-2"
                          }`}
                        >
                          {selected && <span className="h-1.5 w-1.5 rounded-full bg-paper-0" />}
                        </span>
                        <span className="caps text-[13px] font-semibold">{t.label}</span>
                        {t.note && (
                          <span
                            className={`caps rounded-xs px-2 py-0.5 text-[8.5px] font-semibold ${
                              selected ? "bg-paper-0 text-ink-0" : "bg-ink-0 text-paper-0"
                            }`}
                          >
                            {t.note}
                          </span>
                        )}
                      </span>
                      <span className="flex items-baseline gap-2">
                        <span className={`text-[12px] line-through ${selected ? "text-paper-0/45" : "text-ink-3"}`}>
                          £{t.reg}
                        </span>
                        <span className="text-[16px] font-semibold">£{t.price}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* qty + CTA */}
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center rounded-sm border border-ink-0">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 text-base font-semibold hover:bg-ink-0/5" aria-label="Decrease quantity">−</button>
                <span className="min-w-[2rem] text-center font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-3 text-base font-semibold hover:bg-ink-0/5" aria-label="Increase quantity">+</button>
              </div>
              <button
                onClick={onAdd}
                className="flex-1 rounded-[5px] border border-ink-0 bg-ink-0 px-6 py-[18px] text-[13px] font-semibold text-paper-0 transition-colors hover:bg-ink-1"
              >
                {`Add to basket — £${total}`}
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="caps text-[10.5px] font-medium text-ink-3">
                Ships {shipMonth} · Free UK delivery · 30-day returns
              </p>
              {saving > 0 && (
                <span className="caps text-[10.5px] font-semibold text-ink-0">
                  You save £{saving} ({pct}% off)
                </span>
              )}
            </div>

            {/* spec */}
            <div className="mt-12">
              <SectionHead n="—" title="Specification" />
              {SPECS[tier.key].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between border-b py-3" style={{ borderColor: "var(--hair)" }}>
                  <span className="caps text-[11px] font-semibold text-ink-2">{k}</span>
                  <span className="caps text-[11px] font-semibold text-ink-0">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
