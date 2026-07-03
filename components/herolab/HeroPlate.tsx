"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Concept 04 — "The Plate".
 * Editorial diptych (Celine / auction-catalogue): the tube presented as a
 * framed catalogue plate on one side, stark type stacked on the other. The
 * plate slides in; the type reveals line by line.
 */
export function HeroPlate() {
  const reduce = useReducedMotion();
  const stack: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.5 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-paper-0 py-20">
      <Container className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* the plate */}
        <motion.div
          initial={{ opacity: 0, x: reduce ? 0 : -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
          className="order-2 lg:order-1"
        >
          <div
            className="relative mx-auto flex aspect-[4/5] max-w-[420px] items-center justify-center rounded-[4px] bg-paper-0"
            style={{ boxShadow: "0 40px 80px -40px rgba(20,19,15,0.4)" }}
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[4px]">
              <Image src="/scenes/pectus.png" alt="" fill sizes="420px" className="object-cover object-center mix-blend-multiply" style={{ opacity: 0.1 }} />
            </div>
            <span className="absolute left-4 top-3.5 caps font-mono text-[9px] font-medium text-ink-3">PECTUS / 001</span>
            <span className="absolute right-4 top-3.5 caps text-[9px] font-medium text-ink-3">Cooling Chest Primer</span>
            <span className="absolute bottom-3.5 left-4 caps text-[9px] font-medium text-ink-3">Vis·Major</span>
            <span className="absolute bottom-3.5 right-4 caps font-mono text-[9px] font-medium text-ink-3">28 ml e</span>
            <motion.div
              animate={reduce ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-[74%] w-[52%]"
            >
              <Image src="/product/front.png" alt="PECTUS Cooling Chest Primer" fill priority sizes="240px" className="object-contain drop-shadow-[0_28px_44px_rgba(20,19,15,0.18)]" />
            </motion.div>
          </div>
        </motion.div>

        {/* the type */}
        <motion.div variants={stack} initial="hidden" animate="show" className="order-1 text-center lg:order-2 lg:text-left">
          <motion.div variants={item} className="flex items-center justify-center gap-3.5 lg:justify-start">
            <span className="h-px w-8 bg-[var(--hair-strong)]" />
            <span className="caps-loose text-[11px] font-semibold text-ink-2">Est. MMXXVI · No. 001</span>
          </motion.div>
          <motion.h1 variants={item} className="house mt-6 text-ink-0" style={{ fontSize: "clamp(52px, 7vw, 104px)", letterSpacing: "0.05em", fontWeight: 600, lineHeight: 0.98 }}>
            PECTUS
          </motion.h1>
          <motion.p variants={item} className="serif mt-5 text-ink-1" style={{ fontSize: "clamp(17px, 2vw, 24px)", letterSpacing: "0.02em" }}>
            The Cooling Chest Primer.
          </motion.p>
          <motion.p variants={item} className="mx-auto mt-5 max-w-md text-[16px] leading-[1.65] text-ink-2 md:text-[18px] lg:mx-0">
            Cools and tightens in minutes — a firmer-looking chest for up to an
            hour, undetectable under a shirt.
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
            <a href="#buy" className="rounded-[5px] bg-ink-0 px-9 py-[17px] text-[14px] font-semibold text-paper-0 transition-colors hover:bg-ink-1">
              Pre-order — £24
            </a>
            <a href="#science" className="rounded-[5px] border border-ink-0 px-9 py-[17px] text-[14px] font-semibold text-ink-0 transition-colors hover:bg-ink-0 hover:text-paper-0">
              The science
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
