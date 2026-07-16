"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHead } from "@/components/ui/Eyebrow";
import { ToolPhoto } from "@/components/steel/ToolPhoto";
import { useCart } from "@/lib/cart";

// STEEL is one product — a single weighted steel blade. Early-bird / RRP.
const PRICE = 24;
const REG = 34;

const SPEC: [string, string][] = [
  ["Best for", "Carve · drain · press · hook"],
  ["Edges", "Point · long flat · hooked belly"],
  ["Material", "Machined stainless steel"],
  ["Finish", "Cold, weighted: it does the work"],
  ["Made By", "Vis Major · UK"],
];

export function SteelBuy({ shipMonth }: { shipMonth: string }) {
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  const total = PRICE * qty;
  const saving = (REG - PRICE) * qty;
  const pct = Math.round((1 - PRICE / REG) * 100);

  const onAdd = () =>
    add({
      id: "steel:blade",
      product: "steel",
      productName: "STEEL",
      tier: "blade",
      tierLabel: "Weighted steel tool",
      price: PRICE,
      qty,
    });

  return (
    <section id="buy" className="border-t py-16 md:py-24" style={{ borderColor: "var(--hair)" }}>
      <Container>
        <SectionHead n="04" title="Pre-order STEEL" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14">
          {/* specimen */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div
              className="relative flex aspect-square items-center justify-center rounded-[4px] bg-paper-0"
              style={{ boxShadow: "0 28px 64px -32px rgba(20,19,15,0.38)" }}
            >
              <span className="absolute left-3 top-2.5 z-20 caps font-mono text-[9px] font-medium text-ink-3">
                STEEL / IV
              </span>
              <span className="absolute bottom-2.5 right-3 z-20 caps text-[9px] font-medium text-ink-3">
                The Blade
              </span>
              <div className="relative flex h-[82%] w-[82%] items-center justify-center">
                <ToolPhoto tool="sword" sizes="(max-width: 1024px) 70vw, 480px" priority />
              </div>
            </div>
          </div>

          {/* details */}
          <div>
            <Eyebrow>STEEL · No. IV</Eyebrow>
            <h2
              className="mt-4 font-semibold uppercase font-serif text-ink-0"
              style={{ fontSize: "clamp(48px, 5.4vw, 72px)", lineHeight: 0.92, letterSpacing: "-0.01em" }}
            >
              STEEL
            </h2>
            <div className="caps mt-4 text-[15px] font-medium text-ink-1">
              Weighted massage &amp; therapy tool
            </div>
            <p className="mt-5 max-w-md text-[18px] leading-[1.65] text-ink-1">
              One cold, machined-steel blade with several contoured edges: a fine
              point, a long flat and a hooked belly. Heavy enough to do the work
              for you: carve, drain, hook and press, by hand or with the cream.
            </p>

            {/* price */}
            <div className="mt-7 flex items-end justify-between gap-4 border-t pt-6" style={{ borderColor: "var(--hair)" }}>
              <div>
                <span className="caps inline-flex items-center gap-2 text-[10px] font-medium text-ink-3">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-ink-0" />
                  Early-bird pre-order
                </span>
                <div className="mt-3 flex items-baseline gap-3">
                  <span
                    className="num font-bold text-ink-0"
                    style={{ fontSize: "clamp(34px, 4.2vw, 48px)", letterSpacing: "-0.02em", lineHeight: 1 }}
                  >
                    £{PRICE}
                  </span>
                  <span className="num text-[18px] text-ink-3 line-through">£{REG}</span>
                  <span className="caps rounded-xs bg-ink-0 px-2 py-1 text-[9px] font-medium text-paper-0">
                    Save {pct}%
                  </span>
                </div>
              </div>
              <span className="caps max-w-[44%] text-right text-[10px] font-medium leading-relaxed text-ink-3">
                RRP £{REG} once the first batch ships
              </span>
            </div>

            {/* qty + CTA */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center rounded-sm border border-ink-0">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 text-base font-semibold hover:bg-ink-0/5" aria-label="Decrease quantity">
                  −
                </button>
                <span className="min-w-[2rem] text-center font-mono font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-3 text-base font-semibold hover:bg-ink-0/5" aria-label="Increase quantity">
                  +
                </button>
              </div>
              <button
                onClick={onAdd}
                className="flex-1 rounded-[5px] border border-ink-0 bg-ink-0 px-6 py-[18px] text-[13px] font-semibold text-paper-0 transition-colors hover:bg-ink-1"
              >
                Add to basket · <span className="font-semibold">£{total}</span>
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between">
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
              <SectionHead n="·" title="Specification" />
              {SPEC.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between border-b py-3" style={{ borderColor: "var(--hair)" }}>
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
