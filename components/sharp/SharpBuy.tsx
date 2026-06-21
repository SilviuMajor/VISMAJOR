"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHead } from "@/components/ui/Eyebrow";
import { Countdown } from "@/components/enhanced/Countdown";
import { SharpBottle } from "@/components/sharp/Specimen";

const MINT = "rgba(47,158,134,1)";

type Tier = {
  key: "1" | "2" | "3";
  label: string;
  unitLabel: string;
  price: number;
  reg?: number;
  note?: string;
};

// `price` = early-bird pre-order. `reg` = RRP at launch. These MUST match the
// server amounts in app/api/checkout/route.ts (sharp): 2200 / 3800 / 4000.
const TIERS: Tier[] = [
  { key: "1", label: "50ml", unitLabel: "50ml", price: 22, reg: 30 },
  { key: "2", label: "100ml", unitLabel: "100ml", price: 38, reg: 52, note: "Most chosen" },
  { key: "3", label: "2 × 50ml", unitLabel: "2 × 50ml", price: 40, reg: 60, note: "Best value" },
];

/* Photo-free specimen "views" — line-art plates standing in for product shots.
   Each renders the SHARP bottle with a different read-out so the gallery feels
   like a real spec sheet, never a broken image. */
const VIEWS: { key: string; label: string; caption: string; shine: number }[] = [
  { key: "front", label: "Front", caption: "Front · matte jar", shine: 0.16 },
  { key: "reverse", label: "Reverse", caption: "Reverse · directions", shine: 0.0 },
  { key: "texture", label: "Texture", caption: "Texture · weightless cream", shine: 0.5 },
  { key: "detail", label: "Detail", caption: "Detail · flat cap", shine: 0.1 },
];

function PlateArt({ kind, shine }: { kind: string; shine: number }) {
  if (kind === "texture") {
    // a smear of cream + matte dot-grain swatch
    return (
      <svg viewBox="0 0 200 250" className="h-full w-full p-6" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <defs>
          <pattern id="sharp-grain" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.6" fill="rgba(20,19,15,0.12)" />
          </pattern>
        </defs>
        <rect x={30} y={40} width={140} height={170} rx={3} fill="var(--metal-50)" stroke="var(--hair-strong)" strokeWidth={1} />
        <rect x={30} y={40} width={140} height={170} rx={3} fill="url(#sharp-grain)" />
        {/* cream smear */}
        <path
          d="M48 150 Q70 96 110 110 Q150 124 152 150 Q150 178 110 176 Q66 182 48 150 Z"
          fill="var(--paper-2)"
          stroke="var(--ink-1)"
          strokeWidth={1}
        />
        <path d="M64 142 Q96 120 132 140" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth={2} opacity={shine} />
        <text x={100} y={206} textAnchor="middle" fontSize={6} letterSpacing="2" fill="var(--ink-3)" style={{ fontFamily: "var(--font-display), sans-serif" }}>
          MATTE · NON-GREASY
        </text>
      </svg>
    );
  }
  if (kind === "reverse") {
    // the reverse label plate — directions + barcode line-art
    return (
      <svg viewBox="0 0 200 250" className="h-full w-full p-6" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <rect x={44} y={36} width={112} height={178} rx={3} fill="var(--paper-2)" stroke="var(--ink-0)" strokeWidth={1.2} />
        <rect x={56} y={50} width={88} height={150} rx={2} fill="none" stroke="var(--hair-strong)" strokeWidth={0.8} />
        <text x={64} y={68} fontSize={7} fontWeight={700} letterSpacing="1" fill="var(--ink-0)" style={{ fontFamily: "var(--font-display), sans-serif" }}>
          DIRECTIONS
        </text>
        {[78, 86, 94, 102].map((y) => (
          <line key={y} x1={64} y1={y} x2={136} y2={y} stroke="var(--hair-strong)" strokeWidth={0.8} />
        ))}
        <text x={64} y={124} fontSize={7} fontWeight={700} letterSpacing="1" fill="var(--ink-0)" style={{ fontFamily: "var(--font-display), sans-serif" }}>
          INGREDIENTS
        </text>
        {[134, 142, 150, 158, 166].map((y) => (
          <line key={y} x1={64} y1={y} x2={136} y2={y} stroke="var(--hair)" strokeWidth={0.8} />
        ))}
        {/* barcode */}
        <g fill="var(--ink-0)">
          {[0, 3, 5, 9, 11, 12, 16, 19, 21, 25, 28, 31, 33].map((dx) => (
            <rect key={dx} x={64 + dx * 2} y={180} width={dx % 3 === 0 ? 1.6 : 0.8} height={14} />
          ))}
        </g>
      </svg>
    );
  }
  if (kind === "detail") {
    // a close crop of the flat cap with measurement ticks
    return (
      <svg viewBox="0 0 200 250" className="h-full w-full p-6" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <rect x={50} y={70} width={100} height={50} rx={2} fill="var(--paper-1)" stroke="var(--ink-0)" strokeWidth={1.4} />
        <line x1={50} y1={120} x2={150} y2={120} stroke="var(--ink-0)" strokeWidth={1.4} />
        <path d="M58 130 L142 130 L138 170 L62 170 Z" fill="var(--paper-2)" stroke="var(--ink-1)" strokeWidth={1} />
        {/* measure brackets */}
        <g stroke="var(--ink-2)" strokeWidth={0.8} fill="none">
          <path d="M44 70 L36 70 M36 70 L36 120 M44 120 L36 120" />
        </g>
        <text x={26} y={98} fontSize={6} fill="var(--ink-3)" textAnchor="middle" style={{ fontFamily: "var(--font-display), sans-serif" }} transform="rotate(-90 26 98)">
          FLAT CAP
        </text>
        <circle cx={150} cy={95} r={2.4} fill={MINT} />
      </svg>
    );
  }
  // front — the standard bottle
  return <SharpBottle className="h-full w-full p-6" shineOpacity={shine} />;
}

export function SharpBuy({ shipMonth }: { shipMonth: string }) {
  const [tierKey, setTierKey] = useState<Tier["key"]>("2");
  const [qty, setQty] = useState(1);
  const [view, setView] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tier = useMemo(() => TIERS.find((t) => t.key === tierKey) ?? TIERS[0], [tierKey]);
  const total = tier.price * qty;
  const saving = tier.reg ? (tier.reg - tier.price) * qty : 0;
  const pct = tier.reg ? Math.round((1 - tier.price / tier.reg) * 100) : 0;

  const onPreorder = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: "sharp", tier: tier.key }),
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
        <SectionHead n="02" title="Pre-order SHARP" />

        <div id="product" className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14">
          {/* Sticky specimen gallery (photo-free) */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div
              className="relative flex aspect-square items-center justify-center overflow-hidden border bg-paper-2"
              style={{ borderColor: "var(--hair)" }}
            >
              <div className="absolute inset-4 z-30 border" style={{ borderColor: "var(--hair-strong)" }} aria-hidden />
              <span className="absolute left-5 top-4 z-40 caps text-[9px] font-medium text-ink-3">SHARP / 003</span>
              <span className="absolute bottom-4 right-5 z-40 caps text-[9px] font-medium text-ink-3">
                {VIEWS[view].caption}
              </span>
              {/* faint mint floor glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-[16%] left-1/2 z-0 h-[28%] w-[56%] -translate-x-1/2 rounded-full blur-2xl"
                style={{ background: "radial-gradient(circle, rgba(47,158,134,0.14), transparent 64%)" }}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={view}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
                  className="relative z-10 h-[82%] w-[82%]"
                >
                  <PlateArt kind={VIEWS[view].key} shine={VIEWS[view].shine} />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {VIEWS.map((g, i) => (
                <button
                  key={g.key}
                  onClick={() => setView(i)}
                  className={`relative flex aspect-square items-center justify-center border bg-paper-2 transition-colors ${
                    i === view ? "border-ink-0" : "border-[color:var(--hair)] hover:border-[color:var(--hair-strong)]"
                  }`}
                  aria-label={`View ${g.label}`}
                >
                  <div className="relative h-[76%] w-[76%]">
                    <PlateArt kind={g.key} shine={g.shine * 0.6} />
                  </div>
                </button>
              ))}
            </div>
            <p className="mt-3 caps text-[9px] font-medium text-ink-3">
              Specimen renderings · photography to follow
            </p>
          </div>

          {/* Scrolling buy details */}
          <div>
            <Eyebrow>SHARP · 003</Eyebrow>
            <h2
              className="mt-4 font-extrabold uppercase text-ink-0"
              style={{ fontSize: "clamp(56px, 6vw, 76px)", lineHeight: 0.9, letterSpacing: "-0.02em" }}
            >
              SHARP
            </h2>
            <div className="caps mt-4 text-[15px] font-medium text-ink-1">Matte Daily Moisturiser</div>
            <p className="mt-5 max-w-md text-[18px] leading-[1.65] text-ink-1">
              A lightweight daily face moisturiser for men. Hydrates, sets to a
              clean matte finish, and sharpens the look of your features. Use it
              every morning — never greasy, no shine.
            </p>

            {/* Early-bird price callout */}
            <div
              className="mt-7 flex items-end justify-between gap-4 border-t pt-6"
              style={{ borderColor: "var(--hair)" }}
            >
              <div>
                <span className="caps inline-flex items-center gap-2 text-[10px] font-semibold text-ink-3">
                  <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: MINT }} />
                  Early-bird pre-order
                </span>
                <div className="mt-3 flex items-baseline gap-3">
                  <span
                    className="font-extrabold text-ink-0"
                    style={{ fontSize: "clamp(36px, 4.4vw, 52px)", letterSpacing: "-0.02em", lineHeight: 1 }}
                  >
                    £{tier.price}
                  </span>
                  {tier.reg && (
                    <span className="text-[18px] text-ink-3 line-through">£{tier.reg}</span>
                  )}
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

            {/* size selector with savings */}
            <div className="mt-8">
              <div className="caps text-[10px] font-semibold text-ink-3">Size</div>
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
                        {t.reg && (
                          <span className={`text-[12px] line-through ${selected ? "text-paper-0/45" : "text-ink-3"}`}>
                            £{t.reg}
                          </span>
                        )}
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
            {error && <p className="mt-2 text-[12px] text-ink-0">{error}</p>}

            {/* spec */}
            <div className="mt-12">
              <SectionHead n="—" title="Specification" />
              {[
                ["Net Quantity", tier.unitLabel],
                ["Type", "Daily Face Moisturiser"],
                ["Finish", "Matte · Fragrance-Light"],
                ["Use", "Every Morning · AM"],
                ["Skin", "All Skin Types · Men"],
                ["Made By", "Vis Major · UK"],
              ].map(([k, v]) => (
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
