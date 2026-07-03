"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHead } from "@/components/ui/Eyebrow";
import { Countdown } from "@/components/enhanced/Countdown";
import { Specimen, PlaceholderNote } from "@/components/chisel/Specimen";
import { CreamTube, SteelTool, EMBER } from "@/components/chisel/Art";
import { useCart } from "@/lib/cart";

/**
 * Pre-order SCULPT. The cream is the product; the steel tool is an optional
 * upgrade. Same StickyBuy logic (loading/error, POST /api/checkout, redirect).
 *
 * Display tiers match the server CATALOG amounts EXACTLY (app/api/checkout):
 *   "1" The Cream        → £28  (RRP £38)
 *   "2" Cream + Steel    → £46  (RRP £64)  — the cream + the one steel tool
 */

type TierKey = "1" | "2";

type Tier = {
  key: TierKey;
  label: string;
  unitLabel: string;
  price: number;
  reg: number;
  badge?: string;
  /** which objects the specimen shows */
  contents: "cream" | "steel";
};

const TIERS: Tier[] = [
  {
    key: "1",
    label: "The Cream",
    unitLabel: "Cream 50ml",
    price: 28,
    reg: 38,
    contents: "cream",
  },
  {
    key: "2",
    label: "Cream + Steel",
    unitLabel: "Cream + The Steel Tool",
    price: 46,
    reg: 64,
    badge: "Complete the ritual",
    contents: "steel",
  },
];

function SpecimenContents({ contents }: { contents: Tier["contents"] }) {
  if (contents === "cream") {
    return (
      <div className="relative h-[58%] w-[34%]">
        <CreamTube className="h-full w-full" />
      </div>
    );
  }
  // steel — the cream + the one steel tool
  return (
    <div className="flex w-[82%] items-end justify-center gap-2">
      <div className="relative h-[56%] w-[40%] min-h-[200px]">
        <CreamTube className="h-full w-full" />
      </div>
      <div className="relative mb-4 -rotate-[14deg]" style={{ width: "54%" }}>
        <SteelTool className="h-auto w-full" warmth={0.14} />
      </div>
    </div>
  );
}

export function ChiselBuy({ shipMonth }: { shipMonth: string }) {
  const [tierKey, setTierKey] = useState<TierKey>("1");
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  const tier = useMemo(() => TIERS.find((t) => t.key === tierKey) ?? TIERS[0], [tierKey]);
  const total = tier.price * qty;
  const saving = (tier.reg - tier.price) * qty;
  const pct = Math.round((1 - tier.price / tier.reg) * 100);

  const onAdd = () =>
    add({
      id: `sculpt:${tier.key}`,
      product: "sculpt",
      productName: "SCULPT",
      tier: tier.key,
      tierLabel: tier.label,
      price: tier.price,
      qty,
    });

  const topRightLabel = tier.contents === "cream" ? "Cream" : "+ Steel";

  return (
    <section id="buy" className="py-16 md:py-24">
      <Container>
        <SectionHead n="04" title="Pre-order SCULPT." />

        <div id="product" className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14">
          {/* Sticky specimen — reflects the chosen kit */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Specimen
              className="rounded-[4px] bg-paper-0 shadow-[0_28px_64px_-32px_rgba(20,19,15,0.38)]"
              ratio="1 / 1"
              topLeft="SCULPT / 002"
              topRight={
                <AnimatePresence mode="wait">
                  <motion.span
                    key={tier.key}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.25 }}
                    className="caps text-[9px] font-medium text-ink-3"
                  >
                    {topRightLabel}
                  </motion.span>
                </AnimatePresence>
              }
              bottomLeft={<PlaceholderNote>Specimen — set</PlaceholderNote>}
              bottomRight="Worked"
              innerClassName="aspect-square"
            >
              {/* faint ember whisper behind the contents (brand accent) */}
              <div
                aria-hidden
                className="absolute inset-0 z-0"
                style={{
                  background: `radial-gradient(circle at 50% 60%, ${EMBER}14, transparent 60%)`,
                }}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={tier.key}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
                  className="relative z-10 flex h-full w-full items-center justify-center"
                >
                  <SpecimenContents contents={tier.contents} />
                </motion.div>
              </AnimatePresence>
            </Specimen>

            {/* tier chips under the specimen */}
            <div className="mt-3 grid grid-cols-2 gap-3">
              {TIERS.map((t) => {
                const on = t.key === tier.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setTierKey(t.key)}
                    className={`relative flex aspect-square items-center justify-center p-2 transition-opacity ${
                      on ? "opacity-100" : "opacity-40 hover:opacity-100"
                    }`}
                    aria-label={`Select ${t.label}`}
                  >
                    <span className="pointer-events-none scale-[0.5]">
                      <SpecimenContents contents={t.contents} />
                    </span>
                    {on && <span className="absolute inset-x-3 bottom-0 h-px bg-ink-0" aria-hidden />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Buy details */}
          <div>
            <Eyebrow>SCULPT · 002</Eyebrow>
            <h2
              className="mt-4 font-semibold uppercase font-serif text-ink-0"
              style={{ fontSize: "clamp(52px, 6vw, 76px)", lineHeight: 0.9, letterSpacing: "0.01em" }}
            >
              SCULPT
            </h2>
            <div className="caps mt-4 text-[15px] font-medium text-ink-1">
              Contour &amp; Recovery Cream
            </div>
            <p className="mt-5 max-w-md text-[18px] leading-[1.65] text-ink-1">
              A massage &amp; recovery cream, worked into the body by hand or with
              the optional steel tool — for skin that looks firmer, feels worked,
              and reads sharper. The cream is the product; the tool is an optional
              upgrade.
            </p>

            {/* Early-bird price callout */}
            <div
              className="mt-7 flex items-end justify-between gap-4 border-t pt-6"
              style={{ borderColor: "var(--hair)" }}
            >
              <div>
                <span className="caps inline-flex items-center gap-2 text-[10px] font-medium text-ink-3">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: EMBER }}
                  />
                  Early-bird pre-order
                </span>
                <div className="mt-3 flex items-baseline gap-3">
                  <span
                    className="num font-bold text-ink-0"
                    style={{ fontSize: "clamp(36px, 4.4vw, 52px)", letterSpacing: "-0.02em", lineHeight: 1 }}
                  >
                    £{tier.price}
                  </span>
                  <span className="text-[18px] text-ink-3 line-through num">£{tier.reg}</span>
                  {pct > 0 && (
                    <span className="caps rounded-xs bg-ink-0 px-2 py-1 text-[9px] font-medium text-paper-0">
                      Save {pct}%
                    </span>
                  )}
                </div>
              </div>
              <span className="caps max-w-[44%] text-right text-[10px] font-medium leading-relaxed text-ink-3">
                RRP £{tier.reg} once the first batch ships
              </span>
            </div>

            {/* Countdown — price-rise urgency */}
            <div className="mt-6 border-y py-6" style={{ borderColor: "var(--hair)" }}>
              <span className="caps text-[10px] font-medium text-ink-3">
                Pre-order price rises to RRP in
              </span>
              <div className="mt-4">
                <Countdown />
              </div>
            </div>

            {/* cream first, steel optional */}
            <div className="mt-8">
              <div className="caps text-[10px] font-medium text-ink-3">
                The cream — add the steel if you want
              </div>
              <p className="mt-2 max-w-md text-[13px] leading-[1.5] text-ink-2">
                The cream is the product. The steel tool is an optional upgrade.
                Every option ships with <b className="font-semibold text-ink-1">The Field Manual</b> — the
                illustrated movement guide.
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
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
                      <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <span className="flex items-center gap-3">
                          <span
                            className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                              selected ? "border-paper-0" : "border-ink-2"
                            }`}
                          >
                            {selected && <span className="h-1.5 w-1.5 rounded-full bg-paper-0" />}
                          </span>
                          <span className="caps text-[13px] font-medium">{t.label}</span>
                        </span>
                        {t.badge && (
                          <span
                            className={`caps rounded-xs px-2 py-0.5 text-[8.5px] font-medium ${
                              selected ? "bg-paper-0 text-ink-0" : "bg-ink-0 text-paper-0"
                            }`}
                          >
                            {t.badge}
                          </span>
                        )}
                      </span>
                      <span className="flex shrink-0 items-baseline gap-2 pl-3">
                        <span className={`text-[12px] line-through font-mono ${selected ? "text-paper-0/45" : "text-ink-3"}`}>
                          £{t.reg}
                        </span>
                        <span className="text-[16px] font-semibold font-mono">£{t.price}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* qty + CTA */}
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center rounded-sm border border-ink-0">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-3 text-base font-semibold hover:bg-ink-0/5"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="min-w-[2rem] text-center font-semibold">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-4 py-3 text-base font-semibold hover:bg-ink-0/5"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button
                onClick={onAdd}
                className="flex-1 rounded-[5px] border border-ink-0 bg-ink-0 px-6 py-[18px] text-[13px] font-semibold text-paper-0 transition-colors hover:bg-ink-1"
              >
                Add to basket — <span className="font-semibold">£{total}</span>
              </button>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <p className="caps text-[10.5px] font-medium text-ink-3">
                Ships {shipMonth} · Free UK delivery · 30-day returns
              </p>
              {saving > 0 && (
                <span className="caps text-[10.5px] font-medium text-ink-0">
                  You save £{saving} ({pct}% off)
                </span>
              )}
            </div>

            {/* spec */}
            <div className="mt-12">
              <SectionHead n="—" title="Specification" />
              {[
                ["In the box", `${tier.unitLabel} + The Field Manual`],
                ["The cream", "50ml · Massage & Recovery"],
                ["Finish", "Matte · Lightly Fragranced"],
                [
                  "Steel tool",
                  tier.contents === "cream"
                    ? "Optional add-on (not included)"
                    : "Included · Weighted Steel",
                ],
                ["Worked", "By hand, or with the steel tool"],
                ["Look & feel", "Firmer, Smoother, Worked (Temporary)"],
                ["Made By", "Vis Major · UK"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between border-b py-3"
                  style={{ borderColor: "var(--hair)" }}
                >
                  <span className="caps text-[11px] font-medium text-ink-2">{k}</span>
                  <span className="caps text-[11px] font-medium text-ink-0">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
