"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The "Meaning" band — the lore of the name, given the weight of an inscription.
 * Echoes the classical quote bands on the product pages: a big Cinzel mark, a
 * serif gloss beneath, then a quiet aphorism — each easing in on scroll.
 */
export function HouseMeaning() {
  const reduce = useReducedMotion();
  return (
    <section
      id="meaning"
      className="border-y bg-paper-1"
      style={{ borderColor: "var(--hair)" }}
    >
      <Container className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex items-center justify-center gap-3.5"
          >
            <span className="h-px w-7 bg-[var(--hair-strong)]" />
            <span className="caps-loose text-[11px] font-medium text-ink-3">
              Meaning
            </span>
            <span className="h-px w-7 bg-[var(--hair-strong)]" />
          </motion.div>

          {/* the mark — inscriptional, in caps, given real weight */}
          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, delay: 0.05, ease: EASE }}
            className="house mt-10 text-ink-0"
            style={{ fontWeight: 700, fontSize: "clamp(40px, 6.6vw, 80px)", lineHeight: 1.0 }}
          >
            VIS·MAJOR
          </motion.p>

          {/* the gloss — set like the classical quote on the product pages */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            className="serif mx-auto mt-8 max-w-2xl text-ink-1"
            style={{ fontSize: "clamp(17px, 2.15vw, 27px)", lineHeight: 1.45, letterSpacing: "0.015em" }}
          >
            The Roman name for &lsquo;AN UNSTOPPABLE FORCE&rsquo;, a power beyond
            resistance.
          </motion.p>

          {/* the aphorism */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.55, ease: "easeOut" }}
            className="mx-auto mt-8 max-w-md text-[15px] leading-[1.65] text-ink-2 md:text-[16px]"
          >
            Some things you cannot command. How you carry yourself is not one of
            them.
          </motion.p>
        </div>
      </Container>
    </section>
  );
}

/** The virtues strip — three words on a black band, high-contrast. */
export function HouseVirtues() {
  const virtues = ["Discipline", "Composure", "Strength"];
  return (
    <section className="bg-ink-0">
      <Container className="py-9 md:py-11">
        <div className="flex items-center justify-center gap-5 sm:gap-10">
          {virtues.map((v, i) => (
            <Fragment key={v}>
              {i > 0 && (
                <span
                  aria-hidden
                  className="h-1 w-1 rounded-full bg-paper-0/40"
                />
              )}
              <span className="caps-loose text-[12px] font-medium text-paper-0 md:text-[13px]">
                {v}
              </span>
            </Fragment>
          ))}
        </div>
      </Container>
    </section>
  );
}
