"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;
const CURTAIN_EASE = [0.7, 0, 0.2, 1] as const;
const CURTAIN = "repeating-linear-gradient(90deg, #14130f 0px, #1d1c18 26px, #100f0c 52px)";
const VIEW = { once: true, margin: "-30%" } as const;

/**
 * Concept 10 — "The Unveiling".
 * A stage: two drapes part to reveal the tube in a spotlight. Theatrical and
 * ceremonial — the product presented, not just placed. Triggers on scroll-in.
 */
export function HeroUnveiling() {
  const reduce = useReducedMotion();
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-ink-0 py-20">
      {/* spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[74vh] w-[62vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(244,242,236,0.15), transparent 66%)" }}
      />

      <Container className="relative z-10 flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={VIEW} transition={{ duration: 1.2, delay: 0.85, ease: EASE }} className="relative">
          <motion.div animate={reduce ? {} : { y: [0, -9, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }} className="relative h-[48vh] max-h-[540px] w-[224px] md:w-[270px]">
            <Image src="/product/front.png" alt="PECTUS Cooling Chest Primer" fill priority sizes="320px" className="object-contain drop-shadow-[0_46px_66px_rgba(0,0,0,0.6)]" />
          </motion.div>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEW} transition={{ duration: 0.9, delay: 1.1, ease: EASE }} className="house mt-9 text-paper-0" style={{ fontSize: "clamp(34px, 6vw, 72px)", letterSpacing: "0.16em", fontWeight: 600, lineHeight: 1 }}>
          PECTUS
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VIEW} transition={{ duration: 0.8, delay: 1.25 }} className="mt-4 max-w-md text-[15px] leading-[1.6] text-paper-0/70 md:text-[17px]">
          A cooling, tightening primer — composed, and ready for the stage.
        </motion.p>
        <motion.a href="#buy" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEW} transition={{ duration: 0.7, delay: 1.4, ease: EASE }} className="mt-7 inline-flex rounded-[5px] border border-paper-0 bg-paper-0 px-9 py-[16px] text-[14px] font-semibold text-ink-0 transition-colors hover:bg-transparent hover:text-paper-0">
          Pre-order — £24
        </motion.a>
      </Container>

      {/* the drapes part */}
      <motion.div
        aria-hidden
        className="absolute inset-y-0 left-0 z-30 w-1/2 border-r border-paper-0/10"
        style={{ background: CURTAIN }}
        initial={{ x: 0 }}
        whileInView={{ x: "-100%" }}
        viewport={VIEW}
        transition={{ duration: 1.7, delay: 0.2, ease: CURTAIN_EASE }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-y-0 right-0 z-30 w-1/2 border-l border-paper-0/10"
        style={{ background: CURTAIN }}
        initial={{ x: 0 }}
        whileInView={{ x: "100%" }}
        viewport={VIEW}
        transition={{ duration: 1.7, delay: 0.2, ease: CURTAIN_EASE }}
      />
    </section>
  );
}
