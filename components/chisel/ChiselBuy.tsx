"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHead } from "@/components/ui/Eyebrow";
import { Countdown } from "@/components/enhanced/Countdown";
import { Specimen, PlaceholderNote } from "@/components/chisel/Specimen";
import { CreamTube, SteelTool, EMBER } from "@/components/chisel/Art";

/**
 * Pre-order CHISEL. Bespoke panel, CHISEL's own look, but the StickyBuy logic:
 * loading/error states, POST /api/checkout, window.location to the returned url.
 *
 * Display tiers match the server CATALOG amounts EXACTLY (app/api/checkout):
 *   "1" Cream · 50ml            → £28  (RRP £38)
 *   "2" Cream + Steel Tool      → £39  (RRP £52)  — The System / Most chosen
 *   "3" Cream + Tool · 2-pack   → £68  (RRP £96)  — Best value
 */

type TierKey = "1" | "2" | "3";

type Tier = {
  key: TierKey;
  label: string;
  unitLabel: string;
  price: number;
  reg: number;
  badge?: string;
  /** which objects the specimen shows */
  contents: "cream" | "system" | "double";
};

const TIERS: Tier[] = [
  {
    key: "1",
    label: "Cream · 50ml",
    unitLabel: "Cream 50ml",
    price: 28,
    reg: 38,
    contents: "cream",
  },
  {
    key: "2",
    label: "Cream + Steel Tool",
    unitLabel: "Cream 50ml + Tool",
    price: 39,
    reg: 52,
    badge: "The System · Most chosen",
    contents: "system",
  },
  {
    key: "3",
    label: "Cream + Tool · 2-pack",
    unitLabel: "2 × (Cream + Tool)",
    price: 68,
    reg: 96,
    badge: "Best value",
    contents: "double",
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
  if (contents === "system") {
    return (
      <div className="flex w-[82%] items-end justify-center gap-2">
        <div className="relative h-[56%] w-[40%] min-h-[200px]">
          <CreamTube className="h-full w-full" />
        </div>
        <div className="relative mb-4 w-[52%] -rotate-[14deg]">
          <SteelTool className="h-auto w-full" warmth={0.2} />
        </div>
      </div>
    );
  }
  // double — two compact systems
  return (
    <div className="grid w-[88%] grid-cols-2 gap-3">
      {[0, 1].map((k) => (
        <div key={k} className="flex items-end justify-center gap-1">
          <div className="relative h-[150px] w-[34%]">
            <CreamTube className="h-full w-full" label="002" />
          </div>
          <div className="relative mb-3 w-[58%] -rotate-[14deg]">
            <SteelTool className="h-auto w-full" warmth={0.18} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ChiselBuy({ shipMonth }: { shipMonth: string }) {
  const [tierKey, setTierKey] = useState<TierKey>("2");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tier = useMemo(() => TIERS.find((t) => t.key === tierKey) ?? TIERS[0], [tierKey]);
  const total = tier.price * qty;
  const saving = (tier.reg - tier.price) * qty;
  const pct = Math.round((1 - tier.price / tier.reg) * 100);

  const onPreorder = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: "chisel", tier: tier.key }),
      });
      const data = await res.json();
      if (data?.url) window.location.href = data.url;
      else setError(data?.error ?? "Could not start checkout. Try again.");
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="buy" className="py-16 md:py-24">
      <Container>
        <SectionHead n="04" title="Pre-order CHISEL." />

        <div id="product" className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14">
          {/* Sticky specimen — reflects the chosen tier */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Specimen
              ratio="1 / 1"
              topLeft="CHISEL / 002"
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
                    {tier.contents === "cream"
                      ? "Cream"
                      : tier.contents === "system"
                      ? "The System"
                      : "2-Pack"}
                  </motion.span>
                </AnimatePresence>
              }
              bottomLeft={<PlaceholderNote>Specimen — set</PlaceholderNote>}
              bottomRight="Warm"
              innerClassName="aspect-square"
            >
              {/* faint warm whisper behind the contents */}
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
            <div className="mt-3 grid grid-cols-3 gap-3">
              {TIERS.map((t) => {
                const on = t.key === tier.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setTierKey(t.key)}
                    className={`flex aspect-square items-center justify-center border bg-paper-2 p-3 transition-colors ${
                      on ? "border-ink-0" : "border-[color:var(--hair)] hover:border-[color:var(--hair-strong)]"
                    }`}
                    aria-label={`Select ${t.label}`}
                  >
                    <span className="pointer-events-none scale-[0.62]">
                      <SpecimenContents contents={t.contents} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Buy details */}
          <div>
            <Eyebrow>CHISEL · 002</Eyebrow>
            <h2
              className="mt-4 font-extrabold uppercase text-ink-0"
              style={{ fontSize: "clamp(52px, 6vw, 76px)", lineHeight: 0.9, letterSpacing: "0.01em" }}
            >
              CHISEL
            </h2>
            <div className="caps mt-4 text-[15px] font-medium text-ink-1">
              Contour Sculpt System
            </div>
            <p className="mt-5 max-w-md text-[18px] leading-[1.65] text-ink-1">
              A warming contour cream and a weighted steel tool. Massage it in for
              a firmer, more defined look — temporary, matte, and yours for as long
              as you need it to read sharp.
            </p>

            {/* Early-bird price callout */}
            <div
              className="mt-7 flex items-end justify-between gap-4 border-t pt-6"
              style={{ borderColor: "var(--hair)" }}
            >
              <div>
                <span className="caps inline-flex items-center gap-2 text-[10px] font-semibold text-ink-3">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: EMBER }}
                  />
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
                  {pct > 0 && (
                    <span className="caps rounded-xs bg-ink-0 px-2 py-1 text-[9px] font-semibold text-paper-0">
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
              <span className="caps text-[10px] font-semibold text-ink-3">
                Pre-order price rises to RRP in
              </span>
              <div className="mt-4">
                <Countdown />
              </div>
            </div>

            {/* tier selector with savings */}
            <div className="mt-8">
              <div className="caps text-[10px] font-semibold text-ink-3">Choose your set</div>
              <div className="mt-3 flex flex-col gap-2.5">
                {TIERS.map((t) => {
                  const selected = t.key === tier.key;
                  return (
                    <button
                      key={t.key}
                      onClick={() => setTierKey(t.key)}
                      className={`relative flex items-center justify-between rounded-sm border px-5 py-4 text-left transition-colors ${
                        selected
                          ? "border-ink-0 bg-ink-0 text-paper-0"
                          : "border-[color:var(--hair-strong)] bg-transparent text-ink-0 hover:border-ink-0"
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
                          <span className="caps text-[13px] font-semibold">{t.label}</span>
                        </span>
                        {t.badge && (
                          <span
                            className={`caps rounded-xs px-2 py-0.5 text-[8.5px] font-semibold ${
                              selected ? "bg-paper-0 text-ink-0" : "bg-ink-0 text-paper-0"
                            }`}
                          >
                            {t.badge}
                          </span>
                        )}
                      </span>
                      <span className="flex shrink-0 items-baseline gap-2 pl-3">
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
                onClick={onPreorder}
                disabled={loading}
                className="caps flex-1 rounded-sm border border-ink-0 bg-ink-0 px-6 py-[18px] text-[13px] font-semibold text-paper-0 transition-colors hover:bg-ink-1 disabled:opacity-50"
              >
                {loading ? "Opening Checkout…" : `Pre-order — £${total}`}
              </button>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <p className="caps text-[10.5px] font-medium text-ink-3">
                Ships {shipMonth} · Free UK delivery · 30-day returns
              </p>
              {saving > 0 && (
                <span className="caps text-[10.5px] font-semibold text-ink-0">
                  You save £{saving} ({pct}% off)
                </span>
              )}
            </div>
            {error && <p className="mt-2 text-[12px] text-ink-0">{error}</p>}

            {/* spec */}
            <div className="mt-12">
              <SectionHead n="—" title="Specification" />
              {[
                ["In the box", tier.unitLabel],
                ["Sensation", "Warming"],
                ["Finish", "Matte · Lightly Fragranced"],
                ["Tool", tier.contents === "cream" ? "Not included" : "Weighted Steel · Contoured"],
                ["Result", "A Firmer, More Defined Look (Temporary)"],
                ["Made By", "Vis Major · UK"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between border-b py-3"
                  style={{ borderColor: "var(--hair)" }}
                >
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
