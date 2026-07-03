"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

const ROWS = [
  { dur: 48, dir: 1, op: 0.05 },
  { dur: 38, dir: -1, op: 0.08 },
  { dur: 54, dir: 1, op: 0.05 },
];

/**
 * Concept 06 — "Kinetic Name".
 * The name, at colossal scale, drifts as a continuous marquee on three rows at
 * different speeds; the tube stands sharp and still in front, held clear by a
 * centre veil. Motion as texture, product as anchor.
 */
export function HeroColossus() {
  const reduce = useReducedMotion();
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-paper-0 py-20">
      {/* the drifting name */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 flex flex-col justify-center gap-1">
        {ROWS.map((r, i) => (
          <motion.div
            key={i}
            className="flex whitespace-nowrap"
            animate={reduce ? {} : { x: r.dir > 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
            transition={{ duration: r.dur, repeat: Infinity, ease: "linear" }}
          >
            {[0, 1].map((k) => (
              <span
                key={k}
                className="house text-ink-0"
                style={{ fontSize: "clamp(80px, 16vw, 224px)", fontWeight: 600, letterSpacing: "0.04em", lineHeight: 1.04, opacity: r.op, paddingRight: "0.24em" }}
              >
                {"PECTUS · ".repeat(6)}
              </span>
            ))}
          </motion.div>
        ))}
      </div>
      {/* centre veil so the tube reads */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "radial-gradient(ellipse 46% 62% at 50% 50%, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.32) 46%, rgba(255,255,255,0) 72%)" }}
      />

      <Container className="relative z-10 flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: EASE }} className="flex items-center gap-3.5">
          <span className="h-px w-8 bg-[var(--hair-strong)]" />
          <span className="caps-loose text-[11px] font-semibold text-ink-2">One name. One job.</span>
          <span className="h-px w-8 bg-[var(--hair-strong)]" />
        </motion.div>

        <motion.div initial={{ y: reduce ? 0 : 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 0.4, ease: EASE }} className="relative mt-8">
          <motion.div animate={reduce ? {} : { y: [0, -9, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }} className="relative h-[46vh] max-h-[500px] w-[214px] md:w-[260px]">
            <Image src="/product/front.png" alt="PECTUS Cooling Chest Primer" fill priority sizes="320px" className="object-contain drop-shadow-[0_40px_58px_rgba(20,19,15,0.22)]" />
          </motion.div>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }} className="serif mt-8 text-ink-1" style={{ fontSize: "clamp(16px, 2vw, 23px)", letterSpacing: "0.02em" }}>
          The Cooling Chest Primer.
        </motion.p>
        <motion.a href="#buy" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.85, ease: EASE }} className="mt-6 inline-flex rounded-[5px] bg-ink-0 px-9 py-[16px] text-[14px] font-semibold text-paper-0 transition-colors hover:bg-ink-1">
          Pre-order — £24
        </motion.a>
      </Container>
    </section>
  );
}
