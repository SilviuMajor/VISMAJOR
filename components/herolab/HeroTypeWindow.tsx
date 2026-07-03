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
 * Concept 03 — "Type Window" (mask reveal → product hero).
 * The temple image is static behind a solid dark field; the PECTUS letters are
 * see-through holes in that field. On scroll the holes expand until the field
 * is gone and the full image is revealed — then it resolves into the product
 * hero (faint temple, tube with frost-pulse rings, wordmark, CTA).
 */
export function HeroTypeWindow() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // the word holds at its readable size for a beat (time to read it), then the
  // letter-holes grow (moderately — via font-size, centred on the anchor)…
  const maskFontSize = useTransform(scrollYProgress, [0, 0.22, 0.55], reduce ? [300, 300, 300] : [300, 300, 1150]);
  // …while the dark field dissolves, so the reveal is smooth (no black gaps)
  const fieldOpacity = useTransform(scrollYProgress, [0.26, 0.52], [1, 0]);
  // then a white veil fully covers the bright temple (the resolve brings its own)
  const veilOpacity = useTransform(scrollYProgress, [0.5, 0.68], [0, 1]);
  // and the product hero fades up
  const heroOpacity = useTransform(scrollYProgress, [0.54, 0.74], [0, 1]);
  const heroY = useTransform(scrollYProgress, [0.54, 0.74], reduce ? [0, 0] : [26, 0]);
  // intro chrome stays through the read, then clears
  const introOpacity = useTransform(scrollYProgress, [0.14, 0.24], [1, 0]);

  return (
    <section ref={ref} className="relative bg-paper-0" style={{ height: "320vh" }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* static temple, behind everything */}
        <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
          <Image src="/scenes/pectus.png" alt="" fill priority sizes="100vw" className="object-cover object-center" />
        </div>

        {/* the dark field with PECTUS knocked out — letters are the windows */}
        <motion.svg
          aria-hidden
          style={{ opacity: fieldOpacity }}
          className="absolute inset-0 z-10 h-full w-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <mask id="pectusWindow">
              <rect width="1440" height="900" fill="white" />
              <motion.text
                x="720"
                y="470"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="black"
                style={{
                  fontFamily: "var(--font-cinzel)",
                  fontWeight: 600,
                  letterSpacing: 6,
                  fontSize: maskFontSize,
                }}
              >
                PECTUS
              </motion.text>
            </mask>
          </defs>
          <rect width="1440" height="900" fill="#14130F" mask="url(#pectusWindow)" />
        </motion.svg>

        {/* white veil — dims the revealed temple to a faint backdrop */}
        <motion.div aria-hidden style={{ opacity: veilOpacity }} className="absolute inset-0 z-20 bg-paper-0" />

        {/* intro chrome */}
        <motion.div style={{ opacity: introOpacity }} className="absolute top-[13vh] left-1/2 z-40 flex -translate-x-1/2 items-center gap-3.5">
          <span className="h-px w-8 bg-paper-0/30" />
          <span className="caps-loose text-[11px] font-semibold text-paper-0/70">Scroll to reveal</span>
          <span className="h-px w-8 bg-paper-0/30" />
        </motion.div>
        <motion.span style={{ opacity: introOpacity }} className="absolute bottom-6 left-1/2 z-40 -translate-x-1/2 caps text-[9px] font-medium text-paper-0/60">
          Scroll
        </motion.span>

        {/* the resolved product hero — a faithful Cold Open, with its own faint backdrop */}
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center">
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <Image src="/scenes/pectus.png" alt="" fill sizes="100vw" className="object-cover object-center mix-blend-multiply" style={{ opacity: 0.46 }} />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 58% 54% at 50% 48%, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0) 70%)" }} />
          </div>
          <Container className="relative flex flex-col items-center">
            <span className="caps-loose text-[11px] font-semibold text-ink-2">Cooling Chest Primer</span>
            <div className="relative mt-8 flex items-center justify-center">
              {!reduce &&
                [0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    aria-hidden
                    className="absolute rounded-full"
                    style={{ width: 300, height: 300, border: "1px solid rgba(20,19,15,0.16)" }}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [0.5, 1.7], opacity: [0, 0.5, 0] }}
                    transition={{ duration: 4.8, delay: i * 1.6, repeat: Infinity, ease: "easeOut" }}
                  />
                ))}
              <motion.div animate={reduce ? {} : { y: [0, -10, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }} className="relative h-[40vh] max-h-[440px] w-[196px] md:w-[238px]">
                <Image src="/product/front.png" alt="PECTUS Cooling Chest Primer" fill sizes="300px" className="object-contain drop-shadow-[0_40px_58px_rgba(20,19,15,0.22)]" />
              </motion.div>
            </div>
            <h2 className="house mt-8 text-ink-0" style={{ fontSize: "clamp(32px, 5.4vw, 66px)", letterSpacing: "0.16em", fontWeight: 600, lineHeight: 1 }}>
              PECTUS
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-[1.6] text-ink-2 md:text-[17px]">
              Cools and tightens in minutes — a firmer-looking chest for up to an
              hour, undetectable under a shirt.
            </p>
            <a href="#buy" className="mt-7 inline-flex rounded-[5px] bg-ink-0 px-9 py-[16px] text-[14px] font-semibold text-paper-0 transition-colors hover:bg-ink-1">
              Pre-order — £24
            </a>
          </Container>
        </motion.div>
      </div>
    </section>
  );
}
