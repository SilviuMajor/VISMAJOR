"use client";

import { ReactNode, useId, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

/* A button that leans toward the cursor — from the /pectus hero. */
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
 * Concept 03 — "Type Window" (mask reveal → underline hero).
 * A static temple sits behind a dark field; the PECTUS letters are see-through
 * holes that grow on scroll while the field dissolves, revealing the temple —
 * then it resolves into the /pectus underline hero (tube + PECTUS beneath it,
 * both drifting opposite on the cursor).
 *
 * `overlayAlwaysOn` (concept 3.5): keep the temple faint the whole time rather
 * than fading the white overlay in after the reveal.
 */
export function HeroTypeWindow({ overlayAlwaysOn = false }: { overlayAlwaysOn?: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const uid = useId().replace(/:/g, "");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // the word holds at its readable size for a beat, then the letter-holes grow…
  const maskFontSize = useTransform(scrollYProgress, [0, 0.22, 0.55], reduce ? [300, 300, 300] : [300, 300, 1150]);
  const maskFontSizeM = useTransform(scrollYProgress, [0, 0.22, 0.55], reduce ? [96, 96, 96] : [96, 96, 360]);
  // …while the dark field dissolves (smooth, no black gaps)
  const fieldOpacity = useTransform(scrollYProgress, [0.26, 0.52], [1, 0]);
  // a white veil covers the bright temple (only when it isn't kept faint already)
  const veilOpacity = useTransform(scrollYProgress, [0.5, 0.68], [0, 1]);
  // and the underline hero fades up
  const heroOpacity = useTransform(scrollYProgress, [0.54, 0.74], [0, 1]);
  const heroY = useTransform(scrollYProgress, [0.54, 0.74], reduce ? [0, 0] : [26, 0]);
  const introOpacity = useTransform(scrollYProgress, [0.14, 0.24], [1, 0]);

  // cursor parallax — the word drifts opposite the tube
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 16, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 60, damping: 16, mass: 0.5 });
  const tubeX = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [-42, 42]);
  const tubeCurY = useTransform(sy, [-0.5, 0.5], reduce ? [0, 0] : [-28, 28]);
  const tubeRot = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [-9, 9]);
  const wordPX = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [26, -26]);
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

  const VEIL = "radial-gradient(ellipse 58% 54% at 50% 48%, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0) 70%)";

  return (
    <section ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="relative bg-paper-0" style={{ height: "320vh" }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* static temple, behind everything — faint throughout when overlayAlwaysOn */}
        <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
          <Image src="/scenes/pectus.png" alt="" fill priority sizes="100vw" className={`object-cover object-center ${overlayAlwaysOn ? "mix-blend-multiply" : ""}`} style={{ opacity: overlayAlwaysOn ? 0.46 : 1 }} />
          {overlayAlwaysOn && <div className="absolute inset-0" style={{ background: VEIL }} />}
        </div>

        {/* the dark field with PECTUS knocked out — portrait (mobile) + landscape */}
        <motion.svg aria-hidden style={{ opacity: fieldOpacity }} className="absolute inset-0 z-10 h-full w-full md:hidden" viewBox="0 0 440 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id={`m-${uid}`}>
              <rect width="440" height="900" fill="white" />
              <motion.text x="220" y="466" textAnchor="middle" dominantBaseline="middle" fill="black" style={{ fontFamily: "var(--font-cinzel)", fontWeight: 600, letterSpacing: 3, fontSize: maskFontSizeM }}>
                PECTUS
              </motion.text>
            </mask>
          </defs>
          <rect width="440" height="900" fill="#14130F" mask={`url(#m-${uid})`} />
        </motion.svg>
        <motion.svg aria-hidden style={{ opacity: fieldOpacity }} className="absolute inset-0 z-10 hidden h-full w-full md:block" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id={`d-${uid}`}>
              <rect width="1440" height="900" fill="white" />
              <motion.text x="720" y="470" textAnchor="middle" dominantBaseline="middle" fill="black" style={{ fontFamily: "var(--font-cinzel)", fontWeight: 600, letterSpacing: 6, fontSize: maskFontSize }}>
                PECTUS
              </motion.text>
            </mask>
          </defs>
          <rect width="1440" height="900" fill="#14130F" mask={`url(#d-${uid})`} />
        </motion.svg>

        {/* white veil — only when it fades in after the reveal */}
        {!overlayAlwaysOn && <motion.div aria-hidden style={{ opacity: veilOpacity }} className="absolute inset-0 z-20 bg-paper-0" />}

        {/* intro chrome */}
        <motion.div style={{ opacity: introOpacity }} className="absolute top-[13vh] left-1/2 z-40 flex -translate-x-1/2 items-center gap-3.5">
          <span className="h-px w-8 bg-paper-0/30" />
          <span className="caps-loose text-[11px] font-semibold text-paper-0/70">Scroll to reveal</span>
          <span className="h-px w-8 bg-paper-0/30" />
        </motion.div>
        <motion.span style={{ opacity: introOpacity }} className="absolute bottom-6 left-1/2 z-40 -translate-x-1/2 caps text-[9px] font-medium text-paper-0/60">
          Scroll
        </motion.span>

        {/* the resolved underline hero */}
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center">
          {/* its own faint backdrop, unless the temple is already kept faint */}
          {!overlayAlwaysOn && (
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <Image src="/scenes/pectus.png" alt="" fill sizes="100vw" className="object-cover object-center mix-blend-multiply" style={{ opacity: 0.46 }} />
              <div className="absolute inset-0" style={{ background: VEIL }} />
            </div>
          )}
          <Container className="relative flex flex-col items-center">
            <span className="caps-loose text-[11px] font-medium text-ink-2">Topicals for Men · Est. MMXXVI</span>

            {/* tube */}
            <motion.div style={{ x: tubeX, y: tubeCurY, rotate: tubeRot }} className="relative mt-7">
              <motion.div animate={reduce ? {} : { y: [0, -9, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative h-[28vh] w-[152px] md:h-[34vh] md:w-[204px]">
                <Image src="/product/front.png" alt="PECTUS Cooling Chest Primer" fill sizes="280px" className="object-contain drop-shadow-[0_30px_50px_rgba(20,19,15,0.22)]" />
              </motion.div>
            </motion.div>

            {/* the wordmark underlining the tube — drifts opposite the tube */}
            <motion.h2 style={{ x: wordPX }} className="pointer-events-none mt-3 select-none font-serif font-semibold uppercase leading-none tracking-[0.08em] text-ink-0">
              <span style={{ fontSize: "clamp(30px, 5.4vw, 58px)", display: "inline-block" }}>PECTUS</span>
            </motion.h2>

            {/* tagline + CTAs — from the /pectus hero */}
            <p className="caps mt-6 text-[13px] font-medium text-ink-1 md:text-[15px]">Instant Confidence. Cool &amp; Composed.</p>
            <p className="mt-4 max-w-lg text-[15px] leading-[1.6] text-ink-2 md:text-[17px]">
              A fast-acting cooling &amp; tightening cream. Works in minutes. Up to
              one hour of temporary firmness — undetectable under a shirt.
            </p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
              <Magnetic href="#buy" className="inline-flex items-center justify-center gap-2.5 rounded-[5px] border border-ink-0 bg-ink-0 px-9 py-[16px] text-[13px] font-semibold text-paper-0 transition-colors hover:bg-ink-1">
                Pre-order — £24
              </Magnetic>
              <a href="#science" className="inline-flex items-center justify-center rounded-[5px] border border-ink-0 px-9 py-[16px] text-[13px] font-semibold text-ink-0 transition-colors hover:bg-ink-0 hover:text-paper-0">
                The Science
              </a>
            </div>
          </Container>
        </motion.div>
      </div>
    </section>
  );
}
