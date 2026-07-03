"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

/**
 * A small classical quote band placed near the top of each product page.
 * The Latin is set in the house serif (Cinzel) — big and inscriptional — over
 * a faint marble-colonnade backdrop, with a lighter translation beneath. Both
 * ease in as the band scrolls into view. Lore lives in the framing, never in
 * the product or benefit copy.
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
    <section
      id="quote"
      className="relative overflow-hidden border-y"
      style={{ borderColor: "var(--hair)" }}
    >
      {/* classical colonnade backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/scenes/quote2.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          style={{ opacity: 0.8 }}
        />
      </div>

      <Container className="relative z-10 py-20 md:py-28">
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
