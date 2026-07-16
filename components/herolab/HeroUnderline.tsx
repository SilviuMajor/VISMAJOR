"use client";

import { ReactNode, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SceneBackdrop } from "@/components/ui/SceneBackdrop";

const EASE = [0.16, 1, 0.3, 1] as const;
const WORD = ["P", "E", "C", "T", "U", "S"];

/* A button that leans toward the cursor — subtle, premium. */
function Magnetic({
  children,
  href,
  className,
  strength = 0.3,
}: {
  children: ReactNode;
  href: string;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.3 });
  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.a ref={ref} href={href} onMouseMove={onMove} onMouseLeave={reset} style={{ x: sx, y: sy }} className={className}>
      {children}
    </motion.a>
  );
}

/**
 * Concept 12 — "Underline".
 * The current /pectus hero, but the giant PECTUS is shrunk and moved beneath
 * the tube — underlining it — while keeping its letter-stagger entrance and its
 * counter-cursor drift (it slides opposite the tube). Tagline unchanged.
 */
export function HeroUnderline() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const wordScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.12]);
  const wordOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.16]);
  const prodScrollY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 120]);
  const prodScrollScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.18]);
  const fade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // cursor parallax — the word slides opposite the tube
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 16, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 60, damping: 16, mass: 0.5 });
  const tubeX = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [-46, 46]);
  const tubeCurY = useTransform(sy, [-0.5, 0.5], reduce ? [0, 0] : [-32, 32]);
  const tubeRot = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [-10, 10]);
  const wordPX = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [26, -26]);
  const glowX = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [24, -24]);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const wordContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.065, delayChildren: 0.55 } },
  };
  const letter: Variants = {
    hidden: { y: reduce ? 0 : "118%" },
    show: { y: 0, transition: { duration: 0.75, ease: EASE } },
  };
  const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative flex min-h-[100svh] flex-col items-center overflow-hidden py-6"
    >
      <SceneBackdrop src="/scenes/pectus.png" opacity={0.22} />
      <Container className="relative z-10 flex w-full flex-1 flex-col items-center justify-center">
        {/* eyebrow */}
        <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.1, ease: EASE }} style={{ opacity: fade }} className="flex items-center gap-3.5">
          <span className="h-px w-7 bg-[var(--hair-strong)]" />
          <span className="caps-loose text-[11px] font-medium text-ink-2">Topicals for Men · Est. MMXXVI</span>
          <span className="h-px w-7 bg-[var(--hair-strong)]" />
        </motion.div>

        {/* tube, then the wordmark underlining it */}
        <div className="relative mt-8 flex w-full flex-col items-center overflow-hidden">
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.75 }}
            animate={reduce ? { opacity: 0.1, scale: 1 } : { opacity: [0, 0.34, 0.11], scale: [0.75, 1.04, 1] }}
            transition={{ duration: 2.4, delay: 0.7, ease: EASE, times: [0, 0.55, 1] }}
            style={{ x: glowX, background: "radial-gradient(circle, rgba(20,19,15,0.06), transparent 62%)" }}
            className="pointer-events-none absolute left-1/2 top-[42%] z-0 h-[38vh] w-[38vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          />

          {/* product — first */}
          <motion.div style={{ y: prodScrollY, scale: prodScrollScale }} className="relative z-10">
            <motion.div style={{ x: tubeX, y: tubeCurY, rotate: tubeRot }}>
              <motion.div initial={{ y: 76, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.95, delay: 0.5, ease: EASE }}>
                <motion.div animate={reduce ? {} : { y: [0, -9, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative h-[30vh] w-[164px] md:h-[38vh] md:w-[224px]">
                  <Image src="/product/front.png" alt="PECTUS Cooling Chest Primer" fill priority sizes="280px" className="object-contain drop-shadow-[0_30px_50px_rgba(20,19,15,0.22)]" />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* wordmark — shrunk, underlining the tube; drifts opposite the tube */}
          <motion.h1
            style={{ scale: wordScale, y: prodScrollY, x: wordPX, opacity: wordOpacity }}
            className="pointer-events-none relative z-20 mt-3 w-full select-none text-center font-semibold uppercase font-serif leading-[0.92] tracking-[0.08em] text-ink-0"
          >
            <motion.span variants={wordContainer} initial="hidden" animate="show" className="inline-flex justify-center whitespace-nowrap" style={{ fontSize: "clamp(34px, 6vw, 62px)" }}>
              {WORD.map((c, i) => (
                <span key={i} className="inline-block overflow-hidden" style={{ paddingTop: "0.1em", marginTop: "-0.1em" }}>
                  <motion.span variants={letter} className="inline-block">
                    {c}
                  </motion.span>
                </span>
              ))}
            </motion.span>
          </motion.h1>
        </div>

        {/* tagline + CTAs — unchanged */}
        <motion.div style={{ opacity: fade }} className="relative z-20 mt-6 flex flex-col items-center text-center">
          <motion.p {...fadeUp} transition={{ duration: 0.6, delay: 0.95, ease: EASE }} className="caps text-[13px] font-medium text-ink-1 md:text-[15px]">
            Instant Confidence. Cool &amp; Composed.
          </motion.p>
          <motion.p {...fadeUp} transition={{ duration: 0.6, delay: 1.05, ease: EASE }} className="mt-4 max-w-lg text-[16px] leading-[1.6] text-ink-2 md:text-[18px]">
            A fast-acting cooling &amp; tightening cream. Works in minutes. Up to
            one hour of temporary firmness, undetectable under a shirt.
          </motion.p>
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 1.15, ease: EASE }} className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
            <Magnetic href="#buy" className="inline-flex items-center justify-center gap-2.5 rounded-[5px] border border-ink-0 bg-ink-0 px-9 py-[18px] text-[13px] font-semibold text-paper-0 transition-colors hover:bg-ink-1">
              Pre-order, £24
            </Magnetic>
            <a href="#science" className="inline-flex items-center justify-center rounded-[5px] border border-ink-0 px-9 py-[18px] text-[13px] font-semibold text-ink-0 transition-colors hover:bg-ink-0 hover:text-paper-0">
              The Science
            </a>
          </motion.div>
        </motion.div>
      </Container>

      {/* scroll cue */}
      <motion.div style={{ opacity: fade }} className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2">
        <motion.span animate={reduce ? {} : { y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} className="caps block text-[9px] font-medium text-ink-3">
          Scroll
        </motion.span>
      </motion.div>
    </section>
  );
}
