"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Concept 02 — "The Niche".
 * The tube presented as an artifact in a temple niche: a prominent colonnade
 * (slow Ken-Burns), the tube rising onto a drawn plinth with a cast shadow, and
 * the wordmark carved beneath like a pedestal inscription.
 */
export function HeroNiche() {
  const reduce = useReducedMotion();
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-paper-0 py-20">
      {/* the temple facade — grand, slowly settling */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: reduce ? 1 : 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.8, ease: EASE }}
        >
          <Image
            src="/scenes/pectus.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center mix-blend-multiply"
            style={{ opacity: 0.46 }}
          />
        </motion.div>
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 58% 54% at 50% 48%, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0) 70%)" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{ background: "linear-gradient(to top, rgba(255,255,255,0.5), transparent)" }}
        />
      </div>

      <Container className="relative z-10 flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          className="caps-loose text-[11px] font-semibold text-ink-3"
        >
          Vis·Major · No. 001
        </motion.span>

        {/* the tube on a plinth */}
        <div className="mt-8 flex flex-col items-center">
          <div className="relative">
            {/* cast shadow */}
            <span
              aria-hidden
              className="absolute bottom-[-4px] left-1/2 h-6 w-[72%] -translate-x-1/2 rounded-[50%] blur-md"
              style={{ background: "rgba(20,19,15,0.16)" }}
            />
            <motion.div
              initial={{ y: 44, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.15, delay: 0.5, ease: EASE }}
              className="relative"
            >
              <motion.div
                animate={reduce ? {} : { y: [0, -7, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-[40vh] max-h-[440px] w-[200px] md:w-[240px]"
              >
                <Image
                  src="/product/front.png"
                  alt="PECTUS Cooling Chest Primer"
                  fill
                  priority
                  sizes="280px"
                  className="object-contain drop-shadow-[0_36px_48px_rgba(20,19,15,0.2)]"
                />
              </motion.div>
            </motion.div>
          </div>
          {/* the plinth line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 1, ease: EASE }}
            className="mt-5 h-px w-[min(70vw,300px)] origin-center bg-[var(--hair-strong)]"
          />
        </div>

        {/* the pedestal inscription */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: EASE }}
          className="house mt-7 text-ink-0"
          style={{ fontSize: "clamp(46px, 7.8vw, 104px)", letterSpacing: "0.14em", fontWeight: 600, lineHeight: 0.96 }}
        >
          PECTUS
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.1, ease: "easeOut" }}
          className="serif mt-4 text-ink-1"
          style={{ fontSize: "clamp(15px, 1.9vw, 22px)", letterSpacing: "0.04em" }}
        >
          The Cooling Chest Primer — cool, firm, composed.
        </motion.p>
        <motion.a
          href="#buy"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.25, ease: EASE }}
          className="mt-8 inline-flex rounded-[5px] border border-ink-0 bg-ink-0 px-9 py-[17px] text-[14px] font-semibold text-paper-0 transition-colors hover:bg-transparent hover:text-ink-0"
        >
          Pre-order — £24
        </motion.a>
      </Container>
    </section>
  );
}
