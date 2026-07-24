"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { PRODUCTS } from "@/lib/products";
import { INGREDIENTS } from "@/lib/ingredients";

/**
 * "What's in them." — the ingredient band on the home landing, between the
 * product cards (#products) and The Standard. Names the hero ingredients of
 * each topical as a short, spec-sheet list. Warm names front-of-house; the
 * full INCI lives on each product page. Mono, hairline-ruled, in the house
 * section rhythm (py-20 md:py-28, Container, eyebrow rule).
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
            The Formula · What goes in
          </span>
        </div>
        <h2
          className="mt-5 max-w-3xl font-bold uppercase text-ink-0"
          style={{ fontSize: "clamp(30px, 4.6vw, 64px)", letterSpacing: "-0.03em", lineHeight: 0.98 }}
        >
          What&rsquo;s in them.
        </h2>
        <p className="mt-5 max-w-xl text-[16.5px] leading-[1.6] text-ink-1">
          Short lists. Named ingredients. Nothing that doesn&rsquo;t earn its
          place.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3">
          {PRODUCTS.map((p, i) => {
            const story = INGREDIENTS[p.slug];
            return (
              <motion.div
                key={p.slug}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.2, 0, 0, 1] }}
                className="border-t pt-8 md:border-l md:border-t-0 md:px-9 md:pt-0 md:first:pl-0 md:last:pr-0"
                style={{ borderColor: "var(--hair)" }}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span
                    className="font-serif font-semibold uppercase text-ink-0"
                    style={{ fontSize: "clamp(22px, 2.4vw, 28px)", letterSpacing: "-0.01em" }}
                  >
                    {p.wordmark}
                  </span>
                  <span className="caps font-mono text-[9.5px] font-medium text-ink-3">
                    {p.index}
                  </span>
                </div>

                <div
                  className="mt-6 border-t"
                  style={{ borderColor: "var(--hair-strong)" }}
                >
                  {story.heroes.map((h) => (
                    <div
                      key={h.name}
                      className="flex gap-4 border-b py-4 last:border-b-0"
                      style={{ borderColor: "var(--hair)" }}
                    >
                      <span className="caps min-w-[92px] text-[11px] font-semibold text-ink-0">
                        {h.name}
                      </span>
                      <span className="text-[13.5px] leading-[1.5] text-ink-2">
                        {h.role}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
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
