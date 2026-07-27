"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHead } from "@/components/ui/Eyebrow";
import { ToolPhoto } from "@/components/steel/ToolPhoto";
import { useAddToCart } from "@/lib/cart";

// STEEL is one product: a single weighted steel blade.
const PRICE = 24;

const SPEC: [string, string][] = [
  ["Best for", "Carve · drain · press · hook"],
  ["Edges", "Point · long flat · hooked belly"],
  ["Material", "Machined stainless steel"],
  ["Finish", "Cold, weighted: it does the work"],
  ["Made By", "Vis Major · UK"],
];

export function SteelBuy({ shipMonth }: { shipMonth: string }) {
  const [qty, setQty] = useState(1);
  const { addToCart, adding } = useAddToCart();

  const total = PRICE * qty;

  const onAdd = () =>
    addToCart({
      id: "steel:blade",
      product: "steel",
      productName: "STEEL",
      tier: "blade",
      tierLabel: "Weighted steel tool",
      price: PRICE,
      qty,
    });

  return (
    <section id="buy" className="scroll-mt-[92px] border-t py-16 md:py-24" style={{ borderColor: "var(--hair)" }}>
      <Container>
        <SectionHead n="04" title="Buy STEEL" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14">
          {/* specimen */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div
              className="relative flex aspect-square items-center justify-center rounded-sm bg-paper-0"
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
                  Price
                </span>
                <div className="mt-3 flex items-baseline gap-3">
                  <span
                    className="num font-bold text-ink-0"
                    style={{ fontSize: "clamp(34px, 4.2vw, 48px)", letterSpacing: "-0.02em", lineHeight: 1 }}
                  >
                    £{PRICE}
                  </span>
                </div>
              </div>
              <span className="caps max-w-[44%] text-right text-[10px] font-medium leading-relaxed text-ink-3">
                Ships {shipMonth}
              </span>
            </div>

            {/* qty + CTA */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center rounded-sm border border-ink-0">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 text-base font-semibold text-ink-0 transition-colors hover:bg-ink-0/5" aria-label="Decrease quantity">
                  −
                </button>
                <span className="min-w-[2rem] text-center font-mono font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-3 text-base font-semibold text-ink-0 transition-colors hover:bg-ink-0/5" aria-label="Increase quantity">
                  +
                </button>
              </div>
              <button
                onClick={onAdd}
                disabled={adding}
                aria-busy={adding}
                className="flex-1 rounded-sm border border-ink-0 bg-ink-0 px-6 py-[18px] text-[13px] font-semibold text-paper-0 transition-colors hover:bg-ink-1 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70"
              >
                {adding ? (
                  "Adding…"
                ) : (
                  <>
                    Add to basket · <span className="font-semibold">£{total}</span>
                  </>
                )}
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="caps text-[10.5px] font-medium text-ink-3">
                Ships {shipMonth} · Free UK delivery · 30-day returns
              </p>
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
