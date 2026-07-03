"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

const NOTES = [
  { top: "20%", label: "Cooling in minutes" },
  { top: "49%", label: "Menthol · Caffeine" },
  { top: "76%", label: "Matte · undetectable" },
];

/**
 * Concept 05 — "The Specimen".
 * Apothecary / watchmaking precision (Aesop, Rams): the tube is a labelled
 * specimen on a faint blueprint grid, with a dimension line and annotation
 * leaders that draw themselves in. Ties to "precision topicals, engineered".
 */
export function HeroSpecimen() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-paper-0 py-20">
      {/* blueprint grid + centre veil */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(20,19,15,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(20,19,15,0.045) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "radial-gradient(ellipse 54% 56% at 50% 50%, rgba(255,255,255,0.62), transparent 70%)" }}
      />

      <Container className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="flex items-center gap-3.5"
        >
          <span className="h-px w-8 bg-[var(--hair-strong)]" />
          <span className="caps-loose text-[11px] font-semibold text-ink-2">Specimen · No. 001</span>
          <span className="h-px w-8 bg-[var(--hair-strong)]" />
        </motion.div>

        {/* the specimen */}
        <div className="relative mt-12 flex items-center justify-center">
          {/* left dimension line */}
          <div className="absolute left-[-64px] top-0 hidden h-full md:block">
            <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.9, delay: 0.7, ease: EASE }} className="absolute left-1/2 top-0 h-full w-px origin-top bg-[var(--hair-strong)]" />
            <span className="absolute left-[-5px] top-0 h-px w-2.5 bg-[var(--hair-strong)]" />
            <span className="absolute left-[-5px] bottom-0 h-px w-2.5 bg-[var(--hair-strong)]" />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute left-[-34px] top-1/2 -translate-y-1/2 -rotate-90 caps font-mono text-[9px] font-medium text-ink-3">
              132 mm
            </motion.span>
          </div>

          {/* tube */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: EASE }}>
            <motion.div animate={reduce ? {} : { y: [0, -7, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="relative h-[44vh] max-h-[470px] w-[204px] md:w-[248px]">
              <Image src="/product/front.png" alt="PECTUS Cooling Chest Primer" fill priority sizes="300px" className="object-contain drop-shadow-[0_34px_48px_rgba(20,19,15,0.18)]" />
            </motion.div>
          </motion.div>

          {/* annotation leaders — right */}
          {NOTES.map((a, i) => (
            <div key={a.label} className="absolute left-full hidden items-center md:flex" style={{ top: a.top }}>
              <span className="h-1 w-1 rounded-full bg-ink-0" />
              <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.9 + i * 0.15, ease: EASE }} className="h-px w-11 origin-left bg-[var(--hair-strong)]" />
              <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.15 + i * 0.15 }} className="ml-2 caps text-[10px] font-medium text-ink-2">
                {a.label}
              </motion.span>
            </div>
          ))}
        </div>

        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9, ease: EASE }} className="house mt-12 text-ink-0" style={{ fontSize: "clamp(36px, 6vw, 74px)", letterSpacing: "0.15em", fontWeight: 600, lineHeight: 1 }}>
          PECTUS
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.1 }} className="mt-4 max-w-md text-[15px] leading-[1.6] text-ink-2 md:text-[17px]">
          Precision topicals for men — engineered to do exactly one thing, well.
        </motion.p>
        <motion.a href="#buy" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.25, ease: EASE }} className="mt-7 inline-flex rounded-[5px] bg-ink-0 px-9 py-[16px] text-[14px] font-semibold text-paper-0 transition-colors hover:bg-ink-1">
          Pre-order — £24
        </motion.a>
      </Container>
    </section>
  );
}
