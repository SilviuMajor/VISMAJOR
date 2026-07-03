"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Concept 09 — "The Seal".
 * A struck-coin idea: a heraldic medallion — concentric rules and a circular
 * inscription in Cinzel — turns slowly behind the tube, framing it like a
 * seal. Heraldic, classical, quietly kinetic.
 */
export function HeroSeal() {
  const reduce = useReducedMotion();
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-paper-0 py-20">
      <Container className="relative z-10 flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: EASE }} className="flex items-center gap-3.5">
          <span className="h-px w-8 bg-[var(--hair-strong)]" />
          <span className="caps-loose text-[11px] font-semibold text-ink-2">Sealed &amp; numbered</span>
          <span className="h-px w-8 bg-[var(--hair-strong)]" />
        </motion.div>

        {/* the seal + the tube */}
        <div className="relative mt-8 flex items-center justify-center">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
          >
            <motion.svg
              viewBox="0 0 400 400"
              className="h-[min(82vh,660px)] w-[min(82vh,660px)]"
              animate={reduce ? {} : { rotate: 360 }}
              transition={{ duration: 64, repeat: Infinity, ease: "linear" }}
              style={{ opacity: 0.55 }}
            >
              <defs>
                <path id="sealPath" d="M200,200 m-158,0 a158,158 0 1,1 316,0 a158,158 0 1,1 -316,0" fill="none" />
              </defs>
              <circle cx="200" cy="200" r="188" fill="none" stroke="rgba(20,19,15,0.28)" strokeWidth="1" />
              <circle cx="200" cy="200" r="132" fill="none" stroke="rgba(20,19,15,0.16)" strokeWidth="1" />
              <text fill="#14130F" style={{ fontFamily: "var(--font-cinzel)", fontWeight: 600, fontSize: 15, letterSpacing: 6 }}>
                <textPath href="#sealPath" startOffset="0">
                  VIS · MAJOR · PECTUS · COOLING CHEST PRIMER ·
                </textPath>
              </text>
            </motion.svg>
          </motion.div>

          <motion.div initial={{ y: reduce ? 0 : 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 0.6, ease: EASE }} className="relative z-10">
            <motion.div animate={reduce ? {} : { y: [0, -8, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }} className="relative h-[42vh] max-h-[460px] w-[196px] md:w-[236px]">
              <Image src="/product/front.png" alt="PECTUS Cooling Chest Primer" fill priority sizes="280px" className="object-contain drop-shadow-[0_36px_50px_rgba(20,19,15,0.2)]" />
            </motion.div>
          </motion.div>
        </div>

        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9, ease: EASE }} className="house mt-9 text-ink-0" style={{ fontSize: "clamp(30px, 5vw, 60px)", letterSpacing: "0.16em", fontWeight: 600, lineHeight: 1 }}>
          PECTUS
        </motion.h1>
        <motion.a href="#buy" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.05, ease: EASE }} className="mt-6 inline-flex rounded-[5px] bg-ink-0 px-9 py-[16px] text-[14px] font-semibold text-paper-0 transition-colors hover:bg-ink-1">
          Pre-order — £24
        </motion.a>
      </Container>
    </section>
  );
}
