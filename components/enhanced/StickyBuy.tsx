"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHead } from "@/components/ui/Eyebrow";
import { Countdown } from "@/components/enhanced/Countdown";
import { useCart } from "@/lib/cart";

type Tier = {
  key: "1" | "2" | "3";
  label: string;
  unitLabel: string;
  price: number;
  reg?: number;
  note?: string;
};

// `price` = early-bird pre-order price. `reg` = RRP at launch.
const TIERS: Tier[] = [
  { key: "1", label: "20ml", unitLabel: "20ml", price: 24, reg: 32 },
  { key: "2", label: "40ml", unitLabel: "40ml", price: 42, reg: 56, note: "Most chosen" },
  { key: "3", label: "2-pack", unitLabel: "2 × 20ml", price: 44, reg: 64, note: "Best value" },
];

const GALLERY = [
  { src: "/product/front.png", label: "Front" },
  { src: "/product/back.png", label: "Back" },
  { src: "/product/squeeze.png", label: "Texture" },
  { src: "/product/detail.png", label: "Detail" },
];

/* ── Detail tabs ──────────────────────────────────────────────────
   Specification, plus Ingredients + Origin folded in (the old standalone
   section). Each tab defaults the gallery to a fitting shot: Ingredients →
   the rear label (where the INCI is printed); Origin → the open tube. */
const SPEC_TABS = [
  { key: "spec", label: "Specification", shot: 0 },
  { key: "ingredients", label: "Ingredients", shot: 1 },
  { key: "origin", label: "Origin", shot: 2 },
] as const;
type SpecTabKey = (typeof SPEC_TABS)[number]["key"];

const ACTIVES = [
  { name: "Caffeine", role: "For an awake, toned-feeling finish." },
  { name: "Menthol", role: "A clean cooling hit on contact." },
  { name: "Niacinamide", role: "A smooth, conditioned look." },
];

const INCI_LIST = [
  "Aqua",
  "Glycerin",
  "Menthol",
  "Caffeine",
  "Polyacrylate Crosspolymer-6",
  "Niacinamide",
  "Aloe Barbadensis Leaf Juice Powder",
  "Butylene Glycol",
  "Carbomer",
  "Phenoxyethanol",
  "Caprylyl Glycol",
  "Ethylhexylglycerin",
  "Parfum",
];
const INCI = INCI_LIST.join(", ") + ".";

const ORIGIN_ROWS: [string, string][] = [
  ["Origin", "United Kingdom"],
  ["Batch reference", "GY-NO · 001 · UK"],
  ["Standards", "UK Cosmetic Regulation"],
];
const BADGES = ["Made in the UK", "Cosmetic-Grade", "Cruelty-Free", "Vegan"];

export function StickyBuy({ shipMonth }: { shipMonth: string }) {
  const [tierKey, setTierKey] = useState<Tier["key"]>("2");
  const [qty, setQty] = useState(1);
  const [shot, setShot] = useState(0);
  const [specTab, setSpecTab] = useState<SpecTabKey>("spec");
  const { add } = useCart();

  // Switching tab also defaults the gallery to that tab's shot.
  const selectSpecTab = (t: (typeof SPEC_TABS)[number]) => {
    setSpecTab(t.key);
    setShot(t.shot);
  };

  // Header nav "Ingredients" → #ingredients: open that tab (+ rear shot) on arrival.
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === "#ingredients") {
        setSpecTab("ingredients");
        setShot(1);
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const tier = useMemo(() => TIERS.find((t) => t.key === tierKey) ?? TIERS[0], [tierKey]);
  const total = tier.price * qty;
  const saving = tier.reg ? (tier.reg - tier.price) * qty : 0;
  const pct = tier.reg ? Math.round((1 - tier.price / tier.reg) * 100) : 0;

  const onAdd = () =>
    add({
      id: `gy-no:${tier.key}`,
      product: "gy-no",
      productName: "GY-NO!",
      tier: tier.key,
      tierLabel: tier.label,
      price: tier.price,
      qty,
    });

  return (
    <section id="buy" className="py-16 md:py-24">
      <Container>
        <SectionHead n="04" title="Pre-order GY-NO!" />

        <div id="product" className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14">
          {/* Sticky gallery */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative flex aspect-square items-center justify-center">
              <span className="absolute left-0.5 top-0 z-20 caps text-[9px] font-medium text-ink-3">GY-NO! / 001</span>
              <span className="absolute bottom-0 right-0.5 z-20 caps text-[9px] font-medium text-ink-3">
                {GALLERY[shot].label}
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={shot}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
                  className="relative h-[78%] w-[78%]"
                >
                  <Image
                    src={GALLERY[shot].src}
                    alt={`GY-NO! — ${GALLERY[shot].label}`}
                    fill
                    sizes="(max-width: 1024px) 80vw, 520px"
                    className="object-contain"
                    priority={shot === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {GALLERY.map((g, i) => (
                <button
                  key={g.src}
                  onClick={() => setShot(i)}
                  className={`relative flex aspect-square items-center justify-center transition-opacity ${
                    i === shot ? "opacity-100" : "opacity-40 hover:opacity-100"
                  }`}
                  aria-label={`View ${g.label}`}
                >
                  <div className="relative h-[82%] w-[82%]">
                    <Image src={g.src} alt="" fill sizes="120px" className="object-contain" />
                  </div>
                  {i === shot && (
                    <span className="absolute inset-x-3 bottom-0 h-px bg-ink-0" aria-hidden />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Scrolling buy details */}
          <div>
            <Eyebrow>GY-NO! · 001</Eyebrow>
            <h2
              className="mt-4 font-extrabold uppercase text-ink-0"
              style={{ fontSize: "clamp(56px, 6vw, 76px)", lineHeight: 0.9, letterSpacing: "0.01em" }}
            >
              GY-NO!
            </h2>
            <div className="caps mt-4 text-[15px] font-medium text-ink-1">Nipple Tightening Cream</div>
            <p className="mt-5 max-w-md text-[18px] leading-[1.65] text-ink-1">
              Works in minutes. Up to one hour of temporary firmness. With caffeine
              and menthol agents — matte, lightly fragranced, undetectable.
            </p>

            {/* Early-bird price callout */}
            <div
              className="mt-7 flex items-end justify-between gap-4 border-t pt-6"
              style={{ borderColor: "var(--hair)" }}
            >
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

            {/* Details — tabbed: specification / ingredients / origin.
                Selecting a tab also swings the gallery to a fitting shot.
                #ingredients anchors the header nav here. */}
            <div id="ingredients" className="mt-12 scroll-mt-28">
              <div
                className="flex flex-wrap gap-x-7 gap-y-2 border-b"
                style={{ borderColor: "var(--hair-strong)" }}
                role="tablist"
                aria-label="Product details"
              >
                {SPEC_TABS.map((t) => {
                  const active = specTab === t.key;
                  return (
                    <button
                      key={t.key}
                      role="tab"
                      aria-selected={active}
                      onClick={() => selectSpecTab(t)}
                      className={`relative -mb-px pb-3 caps text-[11px] font-semibold transition-colors ${
                        active ? "text-ink-0" : "text-ink-3 hover:text-ink-1"
                      }`}
                    >
                      {t.label}
                      {active && (
                        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-ink-0" aria-hidden />
                      )}
                    </button>
                  );
                })}
              </div>

              <motion.div
                key={specTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
                className="mt-6"
                role="tabpanel"
              >
                {specTab === "spec" &&
                  (
                    [
                      ["Net Quantity", tier.unitLabel],
                      ["Finish", "Matte · Lightly Fragranced"],
                      ["Onset", "Within Minutes"],
                      ["Duration", "Up to 1 Hour (Temporary)"],
                      ["Made By", "Vis Major · UK"],
                    ] as [string, string][]
                  ).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between border-b py-3" style={{ borderColor: "var(--hair)" }}>
                      <span className="caps text-[11px] font-semibold text-ink-2">{k}</span>
                      <span className="caps text-[11px] font-semibold text-ink-0">{v}</span>
                    </div>
                  ))}

                {specTab === "ingredients" && (
                  <div className="space-y-7">
                    <p className="text-[15px] leading-[1.6] text-ink-1">
                      A water-based formula with caffeine, a menthol cooling complex
                      and a film-forming tightening system — matte, lightly fragranced.
                    </p>
                    <div>
                      <span className="caps text-[10px] font-semibold text-ink-3">Three actives</span>
                      <div className="mt-3">
                        {ACTIVES.map((a) => (
                          <div
                            key={a.name}
                            className="flex items-baseline justify-between gap-5 border-b py-3"
                            style={{ borderColor: "var(--hair)" }}
                          >
                            <span className="caps text-[11px] font-semibold text-ink-0">{a.name}</span>
                            <span className="text-right text-[12.5px] leading-[1.4] text-ink-2">{a.role}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="caps text-[10px] font-semibold text-ink-3">Full formula · INCI</span>
                      <p className="mt-2.5 text-[12.5px] leading-[1.75] text-ink-2">{INCI}</p>
                    </div>
                    <div>
                      <span className="caps text-[10px] font-semibold text-ink-3">Directions</span>
                      <p className="mt-2.5 text-[13.5px] leading-[1.6] text-ink-1">
                        Apply a thin layer to clean, dry skin. Massage in until absorbed.
                        Apply as needed. Avoid contact with eyes. For external use only.
                      </p>
                    </div>
                  </div>
                )}

                {specTab === "origin" && (
                  <div className="space-y-7">
                    <p className="text-[15px] leading-[1.6] text-ink-1">
                      Made in the United Kingdom and manufactured to UK cosmetic
                      standards. No parabens. No sulphates. Never tested on animals.
                    </p>
                    <div>
                      {ORIGIN_ROWS.map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between border-b py-3" style={{ borderColor: "var(--hair)" }}>
                          <span className="caps text-[11px] font-semibold text-ink-2">{k}</span>
                          <span className="caps text-[11px] font-semibold text-ink-0">{v}</span>
                        </div>
                      ))}
                    </div>
                    <ul className="flex flex-wrap gap-x-5 gap-y-2.5">
                      {BADGES.map((b) => (
                        <li key={b} className="caps inline-flex items-center gap-2 text-[10px] font-semibold text-ink-2">
                          <span className="inline-block h-1 w-1 rounded-full bg-ink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
