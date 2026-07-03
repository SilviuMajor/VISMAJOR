"use client";

import { useRef, type MouseEvent } from "react";
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
 * Concept 07 — "The Diorama".
 * Three depth planes — temple far behind, the tube in the middle, a colonnade
 * in front — each parallaxing at a different rate on cursor, so the hero reads
 * as a scene you look *into*, through the columns.
 */
export function HeroDiorama() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 50, damping: 18, mass: 0.5 });

  const bgX = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [14, -14]);
  const bgY = useTransform(sy, [-0.5, 0.5], reduce ? [0, 0] : [10, -10]);
  const midX = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [-30, 30]);
  const midY = useTransform(sy, [-0.5, 0.5], reduce ? [0, 0] : [-18, 18]);
  const fgX = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [-62, 62]);
  const fgY = useTransform(sy, [-0.5, 0.5], reduce ? [0, 0] : [-28, 28]);

  const onMove = (e: MouseEvent) => {
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
      {/* deepest — the pectus hero scene, at the Niche's visibility */}
      <motion.div aria-hidden style={{ x: bgX, y: bgY }} className="pointer-events-none absolute inset-0 z-0 scale-110 overflow-hidden">
        <Image src="/scenes/pectus.png" alt="" fill priority sizes="100vw" className="object-cover object-center mix-blend-multiply" style={{ opacity: 0.46 }} />
      </motion.div>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse 58% 54% at 50% 48%, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0) 70%)" }} />

      {/* closest — the colonnade, framing the edges */}
      <motion.div aria-hidden style={{ x: fgX, y: fgY }} className="pointer-events-none absolute inset-0 z-20 scale-125 overflow-hidden">
        <Image src="/scenes/quote2.png" alt="" fill sizes="100vw" className="object-cover object-center mix-blend-multiply" style={{ opacity: 0.42 }} />
      </motion.div>

      {/* middle — the product + type */}
      <Container className="relative z-10 flex flex-col items-center text-center">
        <motion.div style={{ x: midX, y: midY }} className="flex flex-col items-center">
          <span className="caps-loose text-[11px] font-semibold text-ink-2">A study in depth</span>
          <motion.div initial={{ y: reduce ? 0 : 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 0.4, ease: EASE }} className="relative mt-8">
            <motion.div animate={reduce ? {} : { y: [0, -9, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }} className="relative h-[44vh] max-h-[480px] w-[206px] md:w-[250px]">
              <Image src="/product/front.png" alt="PECTUS Cooling Chest Primer" fill priority sizes="300px" className="object-contain drop-shadow-[0_40px_58px_rgba(20,19,15,0.22)]" />
            </motion.div>
          </motion.div>
          <h1 className="house mt-8 text-ink-0" style={{ fontSize: "clamp(34px, 6vw, 72px)", letterSpacing: "0.16em", fontWeight: 600, lineHeight: 1 }}>
            PECTUS
          </h1>
          <a href="#buy" className="mt-7 inline-flex rounded-[5px] bg-ink-0 px-9 py-[16px] text-[14px] font-semibold text-paper-0 transition-colors hover:bg-ink-1">
            Pre-order — £24
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
