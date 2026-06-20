"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Eyebrow";

const EASE = [0.16, 1, 0.3, 1] as const;

/* The "isn't" claims — each gets a struck-through ghost line that wipes
   across on scroll, the typographic equivalent of crossing it off. */
const ISNT = ["A medicine", "A treatment", "A permanent fix"];

function Strike({ label, delay }: { label: string; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <li className="flex items-center gap-4 py-3.5">
      <span
        className="relative inline-block font-bold uppercase text-paper-0/90"
        style={{ fontSize: "clamp(20px, 2.4vw, 30px)", letterSpacing: "0.005em" }}
      >
        Not&nbsp;{label}
        {/* strike line wipes left→right */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute left-0 top-1/2 h-px bg-paper-0/70"
          style={{ transformOrigin: "left center" }}
          initial={reduce ? { width: "100%", scaleX: 1 } : { width: "100%", scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay, ease: EASE }}
        />
      </span>
    </li>
  );
}

export function IsIsntV2() {
  const reduce = useReducedMotion();

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHead n="04" title="Honesty." />

        <div
          className="grid grid-cols-1 overflow-hidden rounded-sm border md:grid-cols-[1.05fr_0.95fr]"
          style={{ borderColor: "var(--hair-strong)" }}
        >
          {/* IS — paper */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative bg-paper-0 p-10 md:p-14"
          >
            <div className="flex items-center gap-3.5">
              <span className="h-px w-7 bg-[var(--hair-strong)]" />
              <span className="caps text-[11px] font-semibold text-ink-2">
                What it is
              </span>
            </div>

            <p
              className="mt-7 max-w-md font-bold uppercase text-ink-0"
              style={{
                fontSize: "clamp(24px, 2.8vw, 36px)",
                letterSpacing: "0.005em",
                lineHeight: 1.1,
              }}
            >
              A cosmetic cooling and tightening cream — a temporary,
              firmer-looking finish, and a confident edge.
            </p>

            <p className="mt-7 max-w-sm text-[15.5px] leading-[1.6] text-ink-2">
              Designed to do one thing, cleanly: how you look and feel for the
              next hour.
            </p>
          </motion.div>

          {/* ISN'T — ink, struck-through list */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="relative bg-ink-0 p-10 text-paper-0 md:p-14"
            style={{ borderLeft: "1px solid var(--hair-strong)" }}
          >
            <div className="flex items-center gap-3.5">
              <span className="h-px w-7 bg-paper-0/35" />
              <span className="caps text-[11px] font-semibold text-paper-0/55">
                What it isn&apos;t
              </span>
            </div>

            <ul className="mt-6">
              {ISNT.map((label, i) => (
                <Strike key={label} label={label} delay={0.2 + i * 0.12} />
              ))}
            </ul>

            <p
              className="mt-7 max-w-xs text-[15.5px] leading-[1.6] text-paper-0/65"
              style={{ borderTop: "1px solid var(--hair-strong)", paddingTop: "1.5rem" }}
            >
              A precision cosmetic. Temporary by design.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
