"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Concept 05 — "The Oculus".
 * A Pantheon reference: a disc of light and a soft descending beam pick the
 * tube out of the dark, catching a pool of light on the floor. The oculus
 * brightens and opens on load; the tube rises into the beam.
 */
export function HeroOculus() {
  const reduce = useReducedMotion();
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-ink-0 py-20">
      {/* the oculus — a disc of light overhead */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-15vh] z-0 h-[54vh] w-[54vh] -translate-x-1/2 rounded-full blur-2xl"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={reduce ? { opacity: 0.6, scale: 1 } : { opacity: [0, 0.75, 0.58], scale: [0.6, 1.06, 1] }}
        transition={{ duration: 2.6, ease: EASE, times: [0, 0.6, 1] }}
        style={{ background: "radial-gradient(circle, rgba(244,242,236,0.5), rgba(244,242,236,0.12) 45%, transparent 70%)" }}
      />
      {/* the beam */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 z-0 h-[92vh] w-[72vw] -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.4 }}
        style={{ background: "radial-gradient(ellipse 38% 82% at 50% 0%, rgba(244,242,236,0.15), transparent 62%)" }}
      />
      {/* the pool of light on the floor */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[11vh] left-1/2 z-0 h-[26vh] w-[48vh] -translate-x-1/2 rounded-[50%] blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.9 }}
        style={{ background: "radial-gradient(circle, rgba(244,242,236,0.12), transparent 66%)" }}
      />

      <Container className="relative z-10 flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: EASE }} className="flex items-center gap-3.5">
          <span className="h-px w-8 bg-paper-0/30" />
          <span className="caps-loose text-[11px] font-semibold text-paper-0/70">In the light of Rome</span>
          <span className="h-px w-8 bg-paper-0/30" />
        </motion.div>

        <motion.div initial={{ y: reduce ? 0 : 52, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.3, delay: 0.7, ease: EASE }} className="relative mt-8">
          <motion.div animate={reduce ? {} : { y: [0, -9, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }} className="relative h-[46vh] max-h-[520px] w-[220px] md:w-[266px]">
            <Image src="/product/front.png" alt="PECTUS Cooling Chest Primer" fill priority sizes="320px" className="object-contain drop-shadow-[0_46px_66px_rgba(0,0,0,0.6)]" />
          </motion.div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1, ease: EASE }} className="house mt-9 text-paper-0" style={{ fontSize: "clamp(34px, 6vw, 72px)", letterSpacing: "0.16em", fontWeight: 600, lineHeight: 1 }}>
          PECTUS
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.15 }} className="mt-4 max-w-md text-[15px] leading-[1.6] text-paper-0/70 md:text-[17px]">
          A cooling, tightening primer — composure, brought into the light.
        </motion.p>
        <motion.a href="#buy" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.3, ease: EASE }} className="mt-7 inline-flex rounded-[5px] border border-paper-0 bg-paper-0 px-9 py-[16px] text-[14px] font-semibold text-ink-0 transition-colors hover:bg-transparent hover:text-paper-0">
          Pre-order — £24
        </motion.a>
      </Container>
    </section>
  );
}
