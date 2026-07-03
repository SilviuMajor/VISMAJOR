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

/**
 * Concept 11 — "The Turntable".
 * A pinned section where scrolling turns the specimen: the tube cross-fades
 * through its faces (front → three-quarter → side), like inspecting an object
 * on a plinth. Product as artefact.
 */
export function HeroTurntable() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const o1 = useTransform(scrollYProgress, [0, 0.32, 0.5], [1, 1, 0]);
  const o2 = useTransform(scrollYProgress, [0.32, 0.5, 0.7], [0, 1, 0]);
  const o3 = useTransform(scrollYProgress, [0.5, 0.7, 1], [0, 1, 1]);
  const hint = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const FACES = [
    { src: "/product/front.png", o: o1 },
    { src: "/product/front-angle.png", o: o2 },
    { src: "/product/angle.png", o: o3 },
  ];

  return (
    <section ref={ref} className="relative bg-paper-0" style={{ height: "240vh" }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* faint scene — like the Niche */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <Image src="/scenes/pectus.png" alt="" fill priority sizes="100vw" className="object-cover object-center mix-blend-multiply" style={{ opacity: 0.46 }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 58% 54% at 50% 48%, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0) 70%)" }} />
        </div>

        <Container className="relative z-10 flex flex-col items-center text-center">
          <span className="caps-loose text-[11px] font-semibold text-ink-2">Turn to inspect</span>

          <div className="relative mt-8 h-[46vh] max-h-[500px] w-[244px] md:w-[286px]">
            {FACES.map((f, i) => (
              <motion.div key={f.src} style={{ opacity: f.o }} className="absolute inset-0">
                <Image src={f.src} alt="PECTUS Cooling Chest Primer" fill priority={i === 0} sizes="320px" className="object-contain drop-shadow-[0_38px_54px_rgba(20,19,15,0.2)]" />
              </motion.div>
            ))}
          </div>

          <h1 className="house mt-9 text-ink-0" style={{ fontSize: "clamp(34px, 6vw, 72px)", letterSpacing: "0.16em", fontWeight: 600, lineHeight: 1 }}>
            PECTUS
          </h1>
          <motion.span style={{ opacity: hint }} className="mt-5 caps text-[10px] font-medium text-ink-3">
            Scroll to turn ↓
          </motion.span>
        </Container>
      </div>
    </section>
  );
}
