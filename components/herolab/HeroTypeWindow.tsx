"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Concept 03 — "Type Window".
 * A dark hero. The wordmark is a window: the temple scene is clipped inside the
 * letters (background-clip: text) and drifts with the cursor, while the tube
 * floats in front, lit against the black. The letters wipe in on load.
 */
export function HeroTypeWindow() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 40, damping: 18, mass: 0.6 });

  // the scene inside the letters drifts one way…
  const bgX = useTransform(sx, [-0.5, 0.5], reduce ? [50, 50] : [42, 58]);
  const bgY = useTransform(sy, [-0.5, 0.5], reduce ? [50, 50] : [44, 56]);
  const bgPos = useMotionTemplate`${bgX}% ${bgY}%`;
  // …the tube the other, for depth
  const tubeX = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [22, -22]);
  const tubeY = useTransform(sy, [-0.5, 0.5], reduce ? [0, 0] : [14, -14]);
  const tubeRot = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [5, -5]);

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

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-ink-0 py-20"
    >
      <Container className="relative z-10 flex w-full flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="flex items-center gap-3.5"
        >
          <span className="h-px w-8 bg-paper-0/30" />
          <span className="caps-loose text-[11px] font-semibold text-paper-0/70">
            Topicals for Men · Est. MMXXVI
          </span>
          <span className="h-px w-8 bg-paper-0/30" />
        </motion.div>

        {/* the type window + tube in front — the stage reserves the tube's height */}
        <div className="relative mt-8 flex min-h-[56vh] w-full items-center justify-center">
          {/* wordmark, temple clipped inside, wipes in */}
          <motion.h1
            aria-label="PECTUS"
            initial={{ clipPath: reduce ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            transition={{ duration: 1.3, delay: 0.25, ease: EASE }}
            className="house select-none whitespace-nowrap text-center"
            style={{
              fontSize: "clamp(64px, 17vw, 260px)",
              lineHeight: 0.9,
              fontWeight: 600,
              letterSpacing: "0.01em",
              backgroundImage: "url(/scenes/pectus.png)",
              backgroundSize: "150% auto",
              backgroundPosition: bgPos,
              backgroundRepeat: "no-repeat",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
            }}
          >
            PECTUS
          </motion.h1>

          {/* the tube, floating in front */}
          <motion.div
            style={{ x: tubeX, y: tubeY, rotate: tubeRot }}
            className="pointer-events-none absolute"
          >
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 -z-10 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(244,242,236,0.14), transparent 68%)" }}
            />
            <motion.div
              initial={{ y: 70, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.7, ease: EASE }}
            >
              <motion.div
                animate={reduce ? {} : { y: [0, -11, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-[44vh] max-h-[500px] w-[210px] md:w-[260px]"
              >
                <Image
                  src="/product/front.png"
                  alt="PECTUS Cooling Chest Primer"
                  fill
                  priority
                  sizes="300px"
                  className="object-contain drop-shadow-[0_44px_64px_rgba(0,0,0,0.55)]"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1, ease: "easeOut" }}
          className="mt-10 max-w-lg text-center text-[16px] leading-[1.6] text-paper-0/70 md:text-[18px]"
        >
          A cooling, tightening primer. Cosmetic, temporary by design, engineered
          to do exactly one thing — well.
        </motion.p>
        <motion.a
          href="#buy"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.15, ease: EASE }}
          className="mt-7 inline-flex rounded-[5px] border border-paper-0 bg-paper-0 px-9 py-[17px] text-[14px] font-semibold text-ink-0 transition-colors hover:bg-transparent hover:text-paper-0"
        >
          Pre-order — £24
        </motion.a>
      </Container>
    </section>
  );
}
