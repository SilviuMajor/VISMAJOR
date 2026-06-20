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

const EASE = [0.16, 1, 0.3, 1] as const;
const WORD = ["G", "Y", "-", "N", "O", "!"];

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
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

export function EnhancedHero({ shipMonth }: { shipMonth: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // ---- scroll-linked depth ----
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const wordScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.28]);
  const wordScrollY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -90]);
  const wordOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.16]);
  const prodScrollY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 130]);
  const prodScrollScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.22]);
  const fade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // ---- cursor parallax ----
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 50, damping: 18, mass: 0.5 });
  const tubeX = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [-18, 18]);
  const tubeCurY = useTransform(sy, [-0.5, 0.5], reduce ? [0, 0] : [-13, 13]);
  const tubeRot = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [-5, 5]);
  const wordPX = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [9, -9]);
  const glowX = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [14, -14]);

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

  // ---- letter stagger ----
  const wordContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.065, delayChildren: 0.28 } },
  };
  const letter: Variants = {
    hidden: { y: reduce ? 0 : "118%" },
    show: { y: 0, transition: { duration: 0.75, ease: EASE } },
  };

  const fadeUp = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={ref}
      id="top"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative flex min-h-[calc(100svh-104px)] flex-col items-center overflow-hidden py-4 md:py-6"
    >
      <Container className="relative flex w-full flex-1 flex-col items-center justify-center">
        {/* eyebrow */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          style={{ opacity: fade }}
          className="flex items-center gap-3.5"
        >
          <span className="h-px w-7 bg-[var(--hair-strong)]" />
          <span className="caps-loose text-[11px] font-semibold text-ink-2">
            Topicals for Men · Est. MMXXVI
          </span>
          <span className="h-px w-7 bg-[var(--hair-strong)]" />
        </motion.div>

        {/* giant kinetic wordmark + product */}
        <div className="relative mt-6 flex w-full flex-1 flex-col items-center justify-center overflow-hidden">
          {/* cool-accent signature glow — a faint, centred cold halo behind the
              tube (the single sanctioned cold accent, used as a whisper) */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.75 }}
            animate={reduce ? { opacity: 0.1, scale: 1 } : { opacity: [0, 0.34, 0.11], scale: [0.75, 1.04, 1] }}
            transition={{ duration: 2.4, delay: 0.7, ease: EASE, times: [0, 0.55, 1] }}
            style={{
              x: glowX,
              background: "radial-gradient(circle, rgba(55,138,221,0.20), transparent 62%)",
            }}
            className="pointer-events-none absolute left-1/2 top-[62%] z-0 h-[38vh] w-[38vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          />

          {/* wordmark — letter by letter */}
          <motion.h1
            style={{ scale: wordScale, y: wordScrollY, x: wordPX, opacity: wordOpacity }}
            className="pointer-events-none relative z-0 w-full select-none text-center font-extrabold uppercase leading-[0.92] tracking-[-0.04em] text-ink-0"
          >
            <motion.span
              variants={wordContainer}
              initial="hidden"
              animate="show"
              className="inline-flex whitespace-nowrap"
              style={{ fontSize: "clamp(66px, 20vw, 300px)" }}
            >
              {WORD.map((c, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden"
                  style={{ paddingTop: "0.1em", marginTop: "-0.1em" }}
                >
                  <motion.span variants={letter} className="inline-block">
                    {c}
                  </motion.span>
                </span>
              ))}
            </motion.span>
          </motion.h1>

          {/* product — scroll parallax › cursor › entrance › float */}
          <motion.div style={{ y: prodScrollY, scale: prodScrollScale }} className="relative z-10 -mt-[12vw]">
            <motion.div style={{ x: tubeX, y: tubeCurY, rotate: tubeRot }}>
              <motion.div
                initial={{ y: 76, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.95, delay: 0.5, ease: EASE }}
              >
                <motion.div
                  animate={reduce ? {} : { y: [0, -9, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative h-[34vh] w-[170px] md:h-[42vh] md:w-[230px]"
                >
                  <Image
                    src="/product/front.png"
                    alt="GY-NO! Nipple Tightening Cream"
                    fill
                    priority
                    sizes="280px"
                    className="object-contain drop-shadow-[0_30px_50px_rgba(20,19,15,0.22)]"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* tagline + CTAs */}
        <motion.div
          style={{ opacity: fade }}
          className="relative z-20 mt-2 flex flex-col items-center pb-10 text-center"
        >
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.95, ease: EASE }}
            className="caps text-[13px] font-semibold text-ink-1 md:text-[15px]"
          >
            Instant Confidence. Maximum Stiffness.
          </motion.p>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 1.05, ease: EASE }}
            className="mt-4 max-w-lg text-[16px] leading-[1.6] text-ink-2 md:text-[18px]"
          >
            A fast-acting cooling &amp; tightening cream. Works in minutes. Up to
            one hour of temporary firmness — undetectable under a shirt.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 1.15, ease: EASE }}
            className="mt-7 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Magnetic
              href="#buy"
              className="caps inline-flex items-center justify-center gap-2.5 rounded-sm border border-ink-0 bg-ink-0 px-9 py-[18px] text-[13px] font-semibold text-paper-0 transition-colors hover:bg-ink-1"
            >
              Pre-order — £24
            </Magnetic>
            <a
              href="#science"
              className="caps inline-flex items-center justify-center rounded-sm border border-ink-0 px-9 py-[18px] text-[13px] font-semibold text-ink-0 transition-colors hover:bg-ink-0 hover:text-paper-0"
            >
              The Science
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="mt-6 caps text-[10.5px] font-medium text-ink-3"
          >
            ● Join 2,000+ on the first-batch list · ships {shipMonth}
          </motion.p>
        </motion.div>
      </Container>

      {/* scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2"
      >
        <motion.span
          animate={reduce ? {} : { y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="caps block text-[9px] font-medium text-ink-3"
        >
          Scroll
        </motion.span>
      </motion.div>
    </section>
  );
}
