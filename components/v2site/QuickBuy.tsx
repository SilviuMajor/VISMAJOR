"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { useCart } from "@/lib/cart";

/**
 * CHANGE 2 — the short path to buying.
 *
 * The live PECTUS page puts its buy panel roughly nine sections deep, behind a
 * 320vh hero and two pinned scroll sequences. That is a lovely read for someone
 * browsing and a dead end for someone who already knows they want it.
 *
 * This is deliberately quiet: a single hairline band directly under the hero
 * carrying the name, the price, the rating and one button. It doesn't compete
 * with the editorial below it, it just means the page can be bought from at any
 * point. The full buy panel still lives further down for people who read.
 */
export function QuickBuy() {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    add({
      id: "pectus:1",
      product: "pectus",
      productName: "PECTUS",
      tier: "1",
      tierLabel: "20ml",
      price: 18,
      qty: 1,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section
      className="border-b bg-paper-0 py-5"
      style={{ borderColor: "var(--hair)" }}
    >
      <Container className="flex flex-wrap items-center gap-x-7 gap-y-4">
        <div className="relative h-14 w-14 shrink-0">
          <Image
            src="/product/front.png"
            alt=""
            fill
            sizes="56px"
            className="object-contain"
          />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span
              className="font-serif font-semibold uppercase text-ink-0"
              style={{ fontSize: "19px", letterSpacing: "-0.01em" }}
            >
              PECTUS
            </span>
            <span className="caps text-[10px] font-medium text-ink-3">
              Cooling Chest Primer · 20ml
            </span>
          </div>
          {/* Rating is placeholder scaffolding — see change 4. It renders only
              once real reviews exist; shown here so the layout can be judged. */}
          <div className="mt-1 flex items-center gap-2">
            <span aria-hidden className="text-[11px] tracking-[0.15em] text-ink-0">
              ★★★★★
            </span>
            <span className="caps text-[9.5px] font-medium text-ink-3">
              Awaiting first reviews
            </span>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-5">
          <span className="num text-[22px] font-bold text-ink-0">£18</span>
          <button
            onClick={onAdd}
            className="rounded-[5px] border border-ink-0 bg-ink-0 px-7 py-3 text-[13px] font-semibold text-paper-0 transition-colors hover:bg-ink-1"
          >
            {added ? "Added" : "Add to basket"}
          </button>
        </div>
      </Container>
    </section>
  );
}
