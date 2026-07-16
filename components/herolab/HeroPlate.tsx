"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Concept 04 — "The Plate".
 * Editorial diptych over a full-bleed scene: the tube floats free (no frame)
 * on the left with a soft ground shadow, stark type on the right. A strong
 * central white veil keeps the product and text clear while the scene frames
 * the edges.
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
      {/* the scene behind everything + central white veil */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image src="/scenes/pectus.png" alt="" fill priority sizes="100vw" className="object-cover object-center mix-blend-multiply" style={{ opacity: 0.2 }} />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 64% 62% at 50% 50%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.45) 44%, rgba(255,255,255,0) 74%)",
          }}
        />
      </div>

      <Container className="relative z-10 grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* the product — floating, no frame */}
        <motion.div
          initial={{ opacity: 0, x: reduce ? 0 : -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
          className="relative order-2 flex justify-center lg:order-1"
        >
          <span
            aria-hidden
            className="absolute bottom-[7%] left-1/2 h-8 w-[44%] -translate-x-1/2 rounded-[50%] blur-lg"
            style={{ background: "rgba(20,19,15,0.14)" }}
          />
          <motion.div
            animate={reduce ? {} : { y: [0, -9, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-[52vh] max-h-[560px] w-[218px] md:w-[266px]"
          >
            <Image src="/product/front.png" alt="PECTUS Cooling Chest Primer" fill priority sizes="300px" className="object-contain drop-shadow-[0_40px_58px_rgba(20,19,15,0.22)]" />
          </motion.div>
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
            Cools and tightens in minutes, a firmer-looking chest for up to an
            hour, undetectable under a shirt.
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
            <a href="#buy" className="rounded-[5px] bg-ink-0 px-9 py-[17px] text-[14px] font-semibold text-paper-0 transition-colors hover:bg-ink-1">
              Pre-order, £24
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
