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
 * Concept 03 — "Type Window" (scroll-driven).
 * A tall, pinned section. On scroll the wordmark — with the temple clipped
 * inside it — zooms toward the viewer and dissolves, revealing the full temple
 * as a background; a second title then rises. Scrolling on continues the page.
 */
export function HeroTypeWindow() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // the word zooms in and fades
  const wordScale = useTransform(scrollYProgress, [0, 0.5], reduce ? [1, 1] : [1, 9]);
  const wordOpacity = useTransform(scrollYProgress, [0.32, 0.5], [1, 0]);
  // the tube leads, then clears out
  const tubeScale = useTransform(scrollYProgress, [0, 0.5], reduce ? [1, 1] : [1, 2.3]);
  const tubeOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  // the background hero image is revealed
  const revealOpacity = useTransform(scrollYProgress, [0.3, 0.52], [0, 1]);
  const revealScale = useTransform(scrollYProgress, [0.3, 1], reduce ? [1, 1] : [1.22, 1]);
  // the second title rises after the reveal
  const titleOpacity = useTransform(scrollYProgress, [0.54, 0.68], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.54, 0.68], reduce ? [0, 0] : [30, 0]);
  // the intro chrome fades out immediately
  const introOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section ref={ref} className="relative bg-ink-0" style={{ height: "300vh" }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* revealed background hero image (light temple) */}
        <motion.div aria-hidden style={{ opacity: revealOpacity }} className="absolute inset-0 z-0 bg-paper-0" />
        <motion.div aria-hidden style={{ opacity: revealOpacity, scale: revealScale }} className="absolute inset-0 z-0 overflow-hidden">
          <Image src="/scenes/pectus.png" alt="" fill priority sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 54%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)" }} />
        </motion.div>

        {/* intro eyebrow */}
        <motion.div
          style={{ opacity: introOpacity }}
          className="absolute top-[14vh] left-1/2 z-20 flex -translate-x-1/2 items-center gap-3.5"
        >
          <span className="h-px w-8 bg-paper-0/30" />
          <span className="caps-loose text-[11px] font-semibold text-paper-0/70">Topicals for Men · Est. MMXXVI</span>
          <span className="h-px w-8 bg-paper-0/30" />
        </motion.div>

        {/* the zooming word — temple clipped inside */}
        <motion.h1
          aria-label="PECTUS"
          style={{ scale: wordScale, opacity: wordOpacity }}
          className="house z-10 select-none whitespace-nowrap text-center"
          initial={{ clipPath: reduce ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <span
            style={{
              fontSize: "clamp(64px, 17vw, 260px)",
              lineHeight: 0.9,
              fontWeight: 600,
              letterSpacing: "0.01em",
              backgroundImage: "url(/scenes/pectus.png)",
              backgroundSize: "150% auto",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
            }}
          >
            PECTUS
          </span>
        </motion.h1>

        {/* the tube, floating in front, leading the zoom */}
        <motion.div style={{ scale: tubeScale, opacity: tubeOpacity }} className="pointer-events-none absolute z-10">
          <motion.div
            initial={{ y: reduce ? 0 : 70, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
          >
            <div className="relative h-[44vh] max-h-[500px] w-[210px] md:w-[260px]">
              <Image src="/product/front.png" alt="PECTUS Cooling Chest Primer" fill priority sizes="300px" className="object-contain drop-shadow-[0_44px_64px_rgba(0,0,0,0.55)]" />
            </div>
          </motion.div>
        </motion.div>

        {/* the second title, revealed over the image */}
        <motion.div style={{ opacity: titleOpacity, y: titleY }} className="absolute z-20 flex flex-col items-center px-6 text-center">
          <Container className="flex flex-col items-center">
            <span className="caps-loose text-[11px] font-semibold text-ink-3">Pectus · No. 001</span>
            <p className="serif mt-4 text-ink-0" style={{ fontSize: "clamp(34px, 6vw, 78px)", letterSpacing: "0.02em", lineHeight: 1.04 }}>
              Composure, on hand.
            </p>
            <a href="#buy" className="mt-8 inline-flex rounded-[5px] bg-ink-0 px-9 py-[16px] text-[14px] font-semibold text-paper-0 transition-colors hover:bg-ink-1">
              Pre-order — £24
            </a>
          </Container>
        </motion.div>

        {/* scroll cue */}
        <motion.span
          style={{ opacity: introOpacity }}
          className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 caps text-[9px] font-medium text-paper-0/60"
        >
          Scroll
        </motion.span>
      </div>
    </section>
  );
}
