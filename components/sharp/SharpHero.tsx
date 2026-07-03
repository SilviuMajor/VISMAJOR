"use client";

import { ReactNode, useRef } from "react";
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
import { SharpBottle } from "@/components/sharp/Specimen";

const EASE = [0.16, 1, 0.3, 1] as const;
const WORD = ["S", "T", "O", "N", "E"];

/* A button that leans toward the cursor — the house's magnetic CTA. */
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

export function SharpHero({ shipMonth }: { shipMonth: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // ---- scroll-linked depth ----
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const wordScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.22]);
  const wordScrollY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -80]);
  const wordOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.14]);
  const plateY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 120]);
  const plateScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.16]);
  const fade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // ---- cursor parallax ----
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 50, damping: 18, mass: 0.5 });
  const plateX = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [-16, 16]);
  const plateCurY = useTransform(sy, [-0.5, 0.5], reduce ? [0, 0] : [-11, 11]);
  const plateRot = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [-3.5, 3.5]);
  const wordPX = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [8, -8]);
  const sheenX = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [40, -40]);

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
    show: { transition: { staggerChildren: reduce ? 0 : 0.07, delayChildren: 0.28 } },
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
      <SceneBackdrop src="/scenes/stone.png" opacity={0.22} />
      <Container className="relative z-10 flex w-full flex-1 flex-col items-center justify-center">
        {/* eyebrow */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          style={{ opacity: fade }}
          className="flex items-center gap-3.5"
        >
          <span className="h-px w-7 bg-[var(--hair-strong)]" />
          <span className="caps-loose text-[11px] font-medium text-ink-2">
            The Matte Cleanser · No. 003
          </span>
          <span className="h-px w-7 bg-[var(--hair-strong)]" />
        </motion.div>

        {/* giant kinetic wordmark + specimen plate */}
        <div className="relative mt-6 flex w-full flex-1 flex-col items-center justify-center overflow-hidden">
          {/* wordmark — letter by letter, crisp and tight */}
          <motion.h1
            style={{ scale: wordScale, y: wordScrollY, x: wordPX, opacity: wordOpacity }}
            className="pointer-events-none relative z-0 w-full select-none text-center font-serif font-semibold uppercase leading-[0.9] tracking-[-0.05em] text-ink-0"
          >
            <motion.span
              variants={wordContainer}
              initial="hidden"
              animate="show"
              className="inline-flex whitespace-nowrap"
              style={{ fontSize: "clamp(72px, 22vw, 320px)" }}
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

          {/* specimen plate — scroll parallax › cursor › entrance › float */}
          <motion.div style={{ y: plateY, scale: plateScale }} className="relative z-10 -mt-[12vw]">
            <motion.div style={{ x: plateX, y: plateCurY, rotate: plateRot }}>
              <motion.div
                initial={{ y: 70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.95, delay: 0.5, ease: EASE }}
              >
                <motion.div
                  animate={reduce ? {} : { y: [0, -8, 0] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  {/* the photo-free specimen plate — open, no frame */}
                  <div className="relative h-[42vh] w-[210px] md:h-[50vh] md:w-[268px]">
                    <span className="absolute left-4 top-3 z-40 caps font-mono text-[9px] font-medium text-ink-3">
                      STONE / 003
                    </span>

                    {/* a single faint ink floor-glow — purely structural depth */}
                    <motion.div
                      aria-hidden
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={
                        reduce
                          ? { opacity: 0.12, scale: 1 }
                          : { opacity: [0, 0.22, 0.12], scale: [0.8, 1.02, 1] }
                      }
                      transition={{ duration: 2.4, delay: 0.8, ease: EASE, times: [0, 0.55, 1] }}
                      style={{
                        x: sheenX,
                        background:
                          "radial-gradient(circle, rgba(20,19,15,0.06), transparent 64%)",
                      }}
                      className="pointer-events-none absolute bottom-[14%] left-1/2 z-0 h-[34%] w-[70%] -translate-x-1/2 rounded-full blur-2xl"
                    />

                    <SharpBottle className="relative z-10 h-full w-full p-4" shineOpacity={reduce ? 0.18 : 0.42} />
                  </div>
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
            className="caps text-[13px] font-medium text-ink-1 md:text-[15px]"
          >
            Lift the Day. Clean Slate.
          </motion.p>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 1.05, ease: EASE }}
            className="mt-4 max-w-lg text-[16px] leading-[1.6] text-ink-2 md:text-[18px]"
          >
            A natural matte cleanser for men — clay, charcoal and mint that lift
            the day's oil and grime, then rinse away for a clean, fresh, matte
            finish.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 1.15, ease: EASE }}
            className="mt-7 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Magnetic
              href="#buy"
              className="inline-flex items-center justify-center gap-2.5 rounded-[5px] border border-ink-0 bg-ink-0 px-9 py-[18px] text-[13px] font-semibold text-paper-0 transition-colors hover:bg-ink-1"
            >
              Pre-order — <span className="num">£22</span>
            </Magnetic>
            <a
              href="#how"
              className="inline-flex items-center justify-center rounded-[5px] border border-ink-0 px-9 py-[18px] text-[13px] font-semibold text-ink-0 transition-colors hover:bg-ink-0 hover:text-paper-0"
            >
              The Daily
            </a>
          </motion.div>

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
