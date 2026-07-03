"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Concept 06 — "The Cast".
 * Campaign framing (luxury houses pairing classical sculpture with product):
 * a drawn classical chest — product already in hand — is the image; the type
 * sits to the left over a paper fade. The cast eases in like a slow pan.
 */
export function HeroCast() {
  const reduce = useReducedMotion();
  const stack: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: 0.55 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
  };

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-paper-0">
      {/* the cast */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-0 w-full lg:w-[64%]">
        <motion.div
          className="relative h-full w-full"
          initial={{ opacity: 0, scale: reduce ? 1 : 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.2, ease: EASE }}
        >
          <Image
            src="/product/david.png"
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 64vw"
            className="object-contain object-right-top mix-blend-multiply"
            style={{ opacity: 0.92 }}
          />
        </motion.div>
        {/* fade so the type reads over the cast */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, var(--paper-0) 6%, rgba(255,255,255,0.55) 30%, transparent 58%)" }}
        />
        <div
          className="absolute inset-0 lg:hidden"
          style={{ background: "linear-gradient(to top, var(--paper-0) 14%, rgba(255,255,255,0.35) 44%, transparent 72%)" }}
        />
      </div>

      <Container className="relative z-10 w-full py-20">
        <motion.div variants={stack} initial="hidden" animate="show" className="max-w-xl text-center lg:text-left">
          <motion.div variants={item} className="flex items-center justify-center gap-3.5 lg:justify-start">
            <span className="h-px w-8 bg-[var(--hair-strong)]" />
            <span className="caps-loose text-[11px] font-semibold text-ink-2">The classical ideal</span>
          </motion.div>
          <motion.h1 variants={item} className="house mt-6 text-ink-0" style={{ fontSize: "clamp(56px, 8vw, 128px)", letterSpacing: "0.04em", fontWeight: 600, lineHeight: 0.94 }}>
            PECTUS
          </motion.h1>
          <motion.p variants={item} className="serif mt-5 text-ink-1" style={{ fontSize: "clamp(17px, 2.1vw, 26px)", letterSpacing: "0.02em" }}>
            The chest, composed.
          </motion.p>
          <motion.p variants={item} className="mx-auto mt-5 max-w-md text-[16px] leading-[1.65] text-ink-2 md:text-[18px] lg:mx-0">
            A cooling, tightening primer. Works in minutes — the sculpted look,
            for the hour that asks for it.
          </motion.p>
          <motion.div variants={item} className="mt-8">
            <a href="#buy" className="inline-flex rounded-[5px] bg-ink-0 px-9 py-[17px] text-[14px] font-semibold text-paper-0 transition-colors hover:bg-ink-1">
              Pre-order — £24
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
