"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SHELF, type ShelfIngredient } from "@/lib/ingredients";

/**
 * "The shelf" — the ingredient band on the home landing, between the product
 * cards and The Standard. Ingredient-first: the house's whole palette as one
 * short list, each raw material with a hairline mark, what it does, and the
 * products it serves. Warm names front-of-house; full INCI lives per product.
 * Mono, hairline-ruled, in the house section rhythm.
 */

function Mark({ kind }: { kind: ShelfIngredient["diagram"] }) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor" as const,
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-10 w-10 text-ink-2",
    "aria-hidden": true,
  };
  switch (kind) {
    case "coffee":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="6" />
          <path d="M24 6v6M24 36v6M6 24h6M36 24h6M12 12l4 4M32 32l4 4M36 12l-4 4M16 32l-4 4" />
        </svg>
      );
    case "mint":
      return (
        <svg {...common}>
          <path d="M24 8C34 18 36 30 24 42C12 30 14 18 24 8Z" />
          <path d="M24 12v28" opacity={0.5} />
        </svg>
      );
    case "clay":
      return (
        <svg {...common}>
          <path d="M10 30q14-10 28 0" />
          <path d="M10 36q14-10 28 0" opacity={0.55} />
          <path d="M14 22l4-6 5 5 4-7 5 6" />
        </svg>
      );
    case "charcoal":
      return (
        <svg {...common}>
          <path d="M14 26l8-8 10 3 2 11-9 5-10-4z" />
          <path d="M22 18l3 8 9 3M25 26l-3 9" />
        </svg>
      );
    case "olive":
      return (
        <svg {...common}>
          <path d="M24 8c7 8 11 14 11 21a11 11 0 0 1-22 0c0-7 4-13 11-21z" />
        </svg>
      );
    case "shea":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="14" />
          <path d="M24 10v28M10 24h28" opacity={0.5} />
        </svg>
      );
  }
}

export function HouseIngredients() {
  const reduce = useReducedMotion();

  return (
    <section
      className="border-t bg-paper-0 py-20 md:py-28"
      style={{ borderColor: "var(--hair)" }}
    >
      <Container>
        <div className="flex items-center gap-3.5">
          <span className="h-px w-7 bg-[var(--hair-strong)]" />
          <span className="caps-loose text-[11px] font-medium text-ink-2">
            The Formula · The shelf
          </span>
        </div>
        <h2
          className="mt-5 max-w-3xl font-bold uppercase text-ink-0"
          style={{ fontSize: "clamp(30px, 4.6vw, 64px)", letterSpacing: "-0.03em", lineHeight: 0.98 }}
        >
          Six ingredients.
        </h2>
        <p className="mt-5 max-w-xl text-[16.5px] leading-[1.6] text-ink-1">
          Everything the three are built from. Named, and nothing else.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {SHELF.map((ing, i) => (
            <motion.div
              key={ing.name}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.06, ease: [0.2, 0, 0, 1] }}
              className="flex gap-5 border-t py-7 pr-6"
              style={{ borderColor: "var(--hair)" }}
            >
              <div className="shrink-0 pt-0.5">
                <Mark kind={ing.diagram} />
              </div>
              <div>
                <h3
                  className="font-semibold uppercase font-serif text-ink-0"
                  style={{ fontSize: "clamp(18px, 1.9vw, 22px)", letterSpacing: "-0.005em" }}
                >
                  {ing.name}
                </h3>
                <p className="mt-2 max-w-[26ch] text-[14px] leading-[1.5] text-ink-2">
                  {ing.role}
                </p>
                <div className="caps mt-3.5 text-[9px] font-semibold text-ink-3">
                  {ing.in.join(" · ")}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-3.5">
          <span className="h-px flex-1 bg-[var(--hair)]" />
          <span className="caps text-[11px] font-medium text-ink-3">
            Named ingredients · No fillers
          </span>
        </div>
      </Container>
    </section>
  );
}
