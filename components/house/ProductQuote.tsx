"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

/**
 * A small classical quote band placed near the top of each product page.
 * The Latin is set in the house serif (Cinzel) — big and inscriptional — with
 * a lighter translation beneath. Both ease in as the band scrolls into view.
 * Lore lives in the framing, never in the product or benefit copy.
 */
export function ProductQuote({
  latin,
  translation,
}: {
  latin: string;
  translation: string;
}) {
  const reduce = useReducedMotion();

  return (
    <section className="border-b" style={{ borderColor: "var(--hair)" }}>
      <Container className="py-12 md:py-16">
        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
          className="serif text-center text-ink-0"
          style={{
            fontSize: "clamp(27px, 4.6vw, 50px)",
            lineHeight: 1.12,
            letterSpacing: "0.005em",
          }}
        >
          {latin}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
          className="caps-loose mt-5 text-center text-[10.5px] font-medium text-ink-3"
        >
          {translation}
        </motion.p>
      </Container>
    </section>
  );
}
