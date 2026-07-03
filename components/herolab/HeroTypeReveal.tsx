"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Concept 08 — "Type Reveal" (word only).
 * No product — the hero *is* the word. PECTUS is a see-through mask onto a
 * static temple; on scroll the letters grow while the dark field dissolves,
 * unveiling the scene, which then settles to the Cold Open backdrop (faint
 * temple) with the wordmark resolved on top.
 */
export function HeroTypeReveal() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const maskFontSize = useTransform(scrollYProgress, [0, 0.42], reduce ? [300, 300] : [300, 1150]);
  const fieldOpacity = useTransform(scrollYProgress, [0.18, 0.46], [1, 0]);
  const veilOpacity = useTransform(scrollYProgress, [0.44, 0.66], [0, 0.86]);
  const heroOpacity = useTransform(scrollYProgress, [0.52, 0.74], [0, 1]);
  const heroY = useTransform(scrollYProgress, [0.52, 0.74], reduce ? [0, 0] : [26, 0]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section ref={ref} className="relative bg-paper-0" style={{ height: "300vh" }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* static temple, behind everything */}
        <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
          <Image src="/scenes/pectus.png" alt="" fill priority sizes="100vw" className="object-cover object-center" />
        </div>

        {/* the dark field with PECTUS knocked out — the letters are the windows */}
        <motion.svg aria-hidden style={{ opacity: fieldOpacity }} className="absolute inset-0 z-10 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="pectusReveal">
              <rect width="1440" height="900" fill="white" />
              <motion.text
                x="720"
                y="470"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="black"
                style={{ fontFamily: "var(--font-cinzel)", fontWeight: 600, letterSpacing: 6, fontSize: maskFontSize }}
              >
                PECTUS
              </motion.text>
            </mask>
          </defs>
          <rect width="1440" height="900" fill="#14130F" mask="url(#pectusReveal)" />
        </motion.svg>

        {/* white veil — dims the revealed temple to the Cold Open backdrop */}
        <motion.div aria-hidden style={{ opacity: veilOpacity }} className="absolute inset-0 z-20 bg-paper-0" />
        {/* soft centre veil, so the resolved word reads cleanly */}
        <motion.div
          aria-hidden
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 z-20"
        >
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 58% 56% at 50% 50%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 68%)" }} />
        </motion.div>

        {/* intro chrome */}
        <motion.div style={{ opacity: introOpacity }} className="absolute top-[13vh] left-1/2 z-40 flex -translate-x-1/2 items-center gap-3.5">
          <span className="h-px w-8 bg-paper-0/30" />
          <span className="caps-loose text-[11px] font-semibold text-paper-0/70">Scroll to reveal</span>
          <span className="h-px w-8 bg-paper-0/30" />
        </motion.div>
        <motion.span style={{ opacity: introOpacity }} className="absolute bottom-6 left-1/2 z-40 -translate-x-1/2 caps text-[9px] font-medium text-paper-0/60">
          Scroll
        </motion.span>

        {/* the resolved word — no product */}
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center">
          <Container className="flex flex-col items-center">
            <span className="caps-loose text-[11px] font-semibold text-ink-2">Est. MMXXVI · No. 001</span>
            <h1 className="house mt-6 text-ink-0" style={{ fontSize: "clamp(56px, 10.5vw, 168px)", letterSpacing: "0.06em", fontWeight: 600, lineHeight: 0.96 }}>
              PECTUS
            </h1>
            <p className="serif mt-5 text-ink-1" style={{ fontSize: "clamp(16px, 2vw, 24px)", letterSpacing: "0.02em" }}>
              The Cooling Chest Primer.
            </p>
            <a href="#buy" className="mt-8 inline-flex rounded-[5px] bg-ink-0 px-9 py-[16px] text-[14px] font-semibold text-paper-0 transition-colors hover:bg-ink-1">
              Pre-order — £24
            </a>
          </Container>
        </motion.div>
      </div>
    </section>
  );
}
