"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SHELF, INGREDIENT_IMG } from "@/lib/ingredients";

/**
 * "The shelf" — the ingredient band on the home landing, between the product
 * cards and The Standard. Ingredient-first: the house's whole palette as one
 * short list, each raw material shown as a pencil specimen plate with what it
 * does and the products it serves. Warm names front-of-house; full INCI lives
 * per product. The plates are white-ground drawings melted onto the paper.
 */
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
          Six key ingredients.
        </h2>
        <p className="mt-5 max-w-xl text-[16.5px] leading-[1.6] text-ink-1">
          Natural ingredients that have worked for thousands of years.
        </p>

        <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 sm:gap-x-10 lg:grid-cols-3 lg:gap-x-14 lg:gap-y-16">
          {SHELF.map((ing, i) => (
            <motion.div
              key={ing.name}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease: [0.2, 0, 0, 1] }}
              className="flex flex-col"
            >
              {/* specimen plate */}
              <div className="relative mx-auto aspect-[4/5] w-[88%] sm:w-[72%] lg:w-[58%]">
                <Image
                  src={INGREDIENT_IMG[ing.name]}
                  alt={`${ing.name} — specimen illustration`}
                  fill
                  sizes="(max-width: 640px) 39vw, (max-width: 1024px) 30vw, 200px"
                  className="melt object-contain"
                />
              </div>

              <div
                className="mt-5 border-t pt-4"
                style={{ borderColor: "var(--hair)" }}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3
                    className="font-semibold uppercase font-serif text-ink-0"
                    style={{ fontSize: "clamp(17px, 1.9vw, 23px)", letterSpacing: "-0.005em" }}
                  >
                    {ing.name}
                  </h3>
                  <span className="caps font-mono text-[9px] font-medium text-ink-3">
                    {`0${i + 1}`}
                  </span>
                </div>
                <p className="mt-2.5 max-w-[28ch] text-[14px] leading-[1.5] text-ink-2">
                  {ing.role}
                </p>
                <div className="caps mt-3.5 text-[9px] font-semibold text-ink-3">
                  {ing.in.join(" · ")}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex items-center gap-3.5">
          <span className="h-px flex-1 bg-[var(--hair)]" />
          <span className="caps text-[11px] font-medium text-ink-3">
            Named ingredients · No fillers
          </span>
        </div>
      </Container>
    </section>
  );
}
