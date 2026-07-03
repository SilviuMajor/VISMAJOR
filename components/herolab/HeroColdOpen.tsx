"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Concept 01 — "Cold Open".
 * The product is the hero. Concentric frost rings pulse outward from the tube
 * and a cold halo breathes behind it — the cooling made visible — while the
 * wordmark stays a quiet caption. Cursor parallax on the tube.
 */
export function HeroColdOpen() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 50, damping: 18, mass: 0.5 });
  const tubeX = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [-28, 28]);
  const tubeY = useTransform(sy, [-0.5, 0.5], reduce ? [0, 0] : [-18, 18]);
  const tubeRot = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [-6, 6]);

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
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-paper-0 py-20"
    >
      {/* faint temple + centre veil */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/scenes/pectus.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center mix-blend-multiply"
          style={{ opacity: 0.16 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 58% 56% at 50% 50%, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0) 70%)",
          }}
        />
      </div>

      <Container className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="flex items-center gap-3.5"
        >
          <span className="h-px w-8 bg-[var(--hair-strong)]" />
          <span className="caps-loose text-[11px] font-semibold text-ink-2">
            Cooling Chest Primer
          </span>
          <span className="h-px w-8 bg-[var(--hair-strong)]" />
        </motion.div>

        {/* the tube + its cold aura */}
        <div className="relative mt-9 flex items-center justify-center">
          {/* frost pulse rings */}
          {!reduce &&
            [0, 1, 2].map((i) => (
              <motion.span
                key={i}
                aria-hidden
                className="absolute rounded-full"
                style={{
                  width: 300,
                  height: 300,
                  border: "1px solid rgba(20,19,15,0.16)",
                }}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: [0.5, 1.7], opacity: [0, 0.55, 0] }}
                transition={{
                  duration: 4.8,
                  delay: i * 1.6,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          {/* breathing halo */}
          <motion.span
            aria-hidden
            className="absolute rounded-full blur-3xl"
            style={{
              width: 320,
              height: 320,
              background:
                "radial-gradient(circle, rgba(20,19,15,0.07), transparent 66%)",
            }}
            animate={reduce ? {} : { scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* the tube */}
          <motion.div style={{ x: tubeX, y: tubeY, rotate: tubeRot }} className="relative z-10">
            <motion.div
              initial={{ y: 64, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
            >
              <motion.div
                animate={reduce ? {} : { y: [0, -10, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-[42vh] max-h-[500px] w-[220px] md:w-[268px]"
              >
                <Image
                  src="/product/front.png"
                  alt="PECTUS Cooling Chest Primer"
                  fill
                  priority
                  sizes="320px"
                  className="object-contain drop-shadow-[0_40px_58px_rgba(20,19,15,0.22)]"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
          className="house mt-10 text-ink-0"
          style={{ fontSize: "clamp(34px, 6vw, 72px)", letterSpacing: "0.16em", fontWeight: 600, lineHeight: 1 }}
        >
          PECTUS
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          className="mt-5 max-w-md text-[16px] leading-[1.6] text-ink-2 md:text-[18px]"
        >
          A cooling, tightening primer. Works in minutes — a firmer-looking chest
          for up to an hour, undetectable under a shirt.
        </motion.p>
        <motion.a
          href="#buy"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1, ease: EASE }}
          className="mt-8 inline-flex rounded-[5px] bg-ink-0 px-9 py-[17px] text-[14px] font-semibold text-paper-0 transition-colors hover:bg-ink-1"
        >
          Pre-order — £24
        </motion.a>
      </Container>
    </section>
  );
}
