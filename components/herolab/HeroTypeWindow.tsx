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
import { CreamTube } from "@/components/chisel/Art";
import { SharpBottle } from "@/components/sharp/Specimen";
import { ToolPhoto } from "@/components/steel/ToolPhoto";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Each product wears the same mask-reveal hero — its own word knocked out of the
   dark field over its own scene, then resolving to its own tube/bottle/tool. */
export type MaskProduct = "pectus" | "sculpt" | "stone" | "steel";

type MaskConfig = {
  word: string; // the letters knocked out of the field + the wordmark
  scene: string; // the temple revealed through the holes
  sceneObjectMobile: string; // portrait crop (desktop is always centred)
  eyebrow: string; // Roman inscriptional line
  tagline: string; // the caps promise
  description: string;
  price: string; // suffixes "Pre-order — …"
  primaryHref: string;
  secondary: string; // second CTA label
  secondaryHref: string;
};

const CONFIG: Record<MaskProduct, MaskConfig> = {
  pectus: {
    word: "PECTUS",
    scene: "/scenes/pectus.png",
    sceneObjectMobile: "object-right",
    eyebrow: "Topicals for Men · Est. MMXXVI",
    tagline: "Instant Confidence. Cool & Composed.",
    description:
      "A fast-acting cooling & tightening cream. Works in minutes. Up to one hour of temporary firmness — undetectable under a shirt.",
    price: "£24",
    primaryHref: "#buy",
    secondary: "The Science",
    secondaryHref: "#science",
  },
  sculpt: {
    word: "SCULPT",
    scene: "/scenes/sculpt.png",
    sceneObjectMobile: "object-center",
    eyebrow: "Massage & Recovery Cream · No. II",
    tagline: "The Contour & Recovery Cream",
    description:
      "A recovery massage cream for men who train. Work it deep — by hand, or with the steel tools — to ease worked muscle and keep a hard-trained body firm and defined.",
    price: "from £28",
    primaryHref: "#buy",
    secondary: "The Ritual",
    secondaryHref: "#how",
  },
  stone: {
    word: "STONE",
    scene: "/scenes/stone.png",
    sceneObjectMobile: "object-center",
    eyebrow: "The Matte Cleanser · No. III",
    tagline: "Lift the Day. Clean Slate.",
    description:
      "A natural matte cleanser for men — clay, charcoal and mint that lift the day's oil and grime, then rinse away for a clean, fresh, matte finish.",
    price: "£22",
    primaryHref: "#buy",
    secondary: "The Daily",
    secondaryHref: "#how",
  },
  steel: {
    word: "STEEL",
    scene: "/scenes/steel.png",
    sceneObjectMobile: "object-center",
    eyebrow: "Massage & Therapy · Machined Steel",
    tagline: "Many Edges. One Job.",
    description:
      "Weighted, machined steel — for massage, recovery and working tension out of the muscle. The Sword, the Axe and the Dagger.",
    price: "from £24",
    primaryHref: "#buy",
    secondary: "The Range",
    secondaryHref: "#range",
  },
};

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

/* The signature object that underlines each word — a PNG for PECTUS, the house's
   drawn tube/bottle for SCULPT/STONE, the flagship Axe for STEEL. */
function ProductVisual({ product, reduce }: { product: MaskProduct; reduce: boolean | null }) {
  switch (product) {
    case "sculpt":
      return (
        <div className="relative h-[34vh] w-[150px] md:h-[41vh] md:w-[200px]">
          <CreamTube className="h-full w-full drop-shadow-[0_34px_56px_rgba(20,19,15,0.20)]" />
        </div>
      );
    case "stone":
      return (
        <div className="relative h-[36vh] w-[190px] md:h-[43vh] md:w-[242px]">
          <SharpBottle className="h-full w-full p-2" shineOpacity={reduce ? 0.18 : 0.42} />
        </div>
      );
    case "steel":
      return (
        <div className="relative h-[30vh] w-[240px] md:h-[36vh] md:w-[316px]">
          <ToolPhoto tool="axe" sizes="360px" priority />
        </div>
      );
    default:
      return (
        <div className="relative h-[34vh] w-[182px] md:h-[41vh] md:w-[245px]">
          <Image src="/product/front.png" alt="PECTUS Cooling Chest Primer" fill sizes="340px" className="object-contain drop-shadow-[0_34px_56px_rgba(20,19,15,0.22)]" />
        </div>
      );
  }
}

/**
 * Concept 03 — "Type Window" (mask reveal → underline hero), now shared across
 * the house. A static scene sits behind a dark field; the product's letters are
 * see-through holes that grow on scroll while the field dissolves, revealing the
 * scene — then it resolves into that product's underline hero (its object above
 * its wordmark, both drifting opposite on the cursor).
 *
 * `product` picks the word, scene, object and copy (defaults to PECTUS).
 * `overlayAlwaysOn` (concept 3.5): keep the scene faint the whole time rather
 * than fading the white overlay in after the reveal.
 */
export function HeroTypeWindow({
  product = "pectus",
  overlayAlwaysOn = false,
}: {
  product?: MaskProduct;
  overlayAlwaysOn?: boolean;
}) {
  const cfg = CONFIG[product];
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const uid = useId().replace(/:/g, "");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // the holes hold at their readable size, then the whole field scales up — a GPU
  // transform (not font-size), so the reveal stays smooth. Kept modest so the
  // cached mask texture stays small; the field dissolve carries the rest.
  const maskScale = useTransform(scrollYProgress, [0, 0.22, 0.55], reduce ? [1, 1, 1] : [1, 1, 3.2]);
  // …while the dark field dissolves (smooth, no black gaps)
  const fieldOpacity = useTransform(scrollYProgress, [0.26, 0.52], [1, 0]);
  // a white veil covers the bright scene (only when it isn't kept faint already)
  const veilOpacity = useTransform(scrollYProgress, [0.5, 0.68], [0, 1]);
  // and the underline hero fades up
  const heroOpacity = useTransform(scrollYProgress, [0.54, 0.74], [0, 1]);
  const heroY = useTransform(scrollYProgress, [0.54, 0.74], reduce ? [0, 0] : [26, 0]);
  const introOpacity = useTransform(scrollYProgress, [0.14, 0.24], [1, 0]);

  // cursor parallax — the word drifts opposite the object
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

  const VEIL = "radial-gradient(ellipse 62% 58% at 50% 48%, rgba(255,255,255,0.74) 0%, rgba(255,255,255,0.12) 74%)";

  return (
    <section ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="relative bg-paper-0" style={{ height: "320vh" }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* static scene, behind everything — faint throughout when overlayAlwaysOn */}
        <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
          <Image src={cfg.scene} alt="" fill priority sizes="100vw" className={`object-cover ${cfg.sceneObjectMobile} md:object-center ${overlayAlwaysOn ? "mix-blend-multiply" : ""}`} style={{ opacity: overlayAlwaysOn ? 0.46 : 1 }} />
          {overlayAlwaysOn && <div className="absolute inset-0" style={{ background: VEIL }} />}
        </div>

        {/* the dark field with the word knocked out. The field + holes scale together
            as one GPU transform (not font-size) so the reveal is smooth; the field
            also dissolves. Portrait mask on mobile, landscape on desktop. */}
        <motion.div aria-hidden style={{ opacity: fieldOpacity, scale: maskScale, z: 0, willChange: "transform, opacity" }} className="absolute inset-0 z-10">
          <svg className="h-full w-full md:hidden" viewBox="0 0 440 900" preserveAspectRatio="xMidYMid slice">
            <defs>
              <mask id={`m-${uid}`}>
                <rect width="440" height="900" fill="white" />
                <text x="220" y="466" textAnchor="middle" dominantBaseline="middle" fill="black" style={{ fontFamily: "var(--font-cinzel)", fontWeight: 600, letterSpacing: 3, fontSize: 96 }}>
                  {cfg.word}
                </text>
              </mask>
            </defs>
            <rect width="440" height="900" fill="#14130F" mask={`url(#m-${uid})`} />
          </svg>
          <svg className="hidden h-full w-full md:block" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
            <defs>
              <mask id={`d-${uid}`}>
                <rect width="1440" height="900" fill="white" />
                <text x="720" y="470" textAnchor="middle" dominantBaseline="middle" fill="black" style={{ fontFamily: "var(--font-cinzel)", fontWeight: 600, letterSpacing: 6, fontSize: 300 }}>
                  {cfg.word}
                </text>
              </mask>
            </defs>
            <rect width="1440" height="900" fill="#14130F" mask={`url(#d-${uid})`} />
          </svg>
        </motion.div>

        {/* dim the one scene to a faint backdrop (no second image) */}
        {!overlayAlwaysOn && (
          <motion.div
            aria-hidden
            style={{ opacity: veilOpacity, background: "radial-gradient(ellipse 66% 62% at 50% 50%, rgba(255,255,255,0.93) 0%, rgba(255,255,255,0.58) 100%)" }}
            className="absolute inset-0 z-20"
          />
        )}

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
          <Container className="relative flex flex-col items-center">
            {/* eyebrow — Roman inscriptional (Cinzel) + Roman numerals */}
            <span className="serif uppercase text-ink-2" style={{ fontSize: "13px", letterSpacing: "0.16em" }}>
              {cfg.eyebrow}
            </span>

            {/* the signature object — ~20% larger */}
            <motion.div style={{ x: tubeX, y: tubeCurY, rotate: tubeRot }} className="relative mt-7">
              <motion.div animate={reduce ? {} : { y: [0, -9, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                <ProductVisual product={product} reduce={reduce} />
              </motion.div>
            </motion.div>

            {/* the wordmark underlining the object — drifts opposite the object */}
            <motion.h2 style={{ x: wordPX }} className="pointer-events-none mt-3 select-none font-serif font-semibold uppercase leading-none tracking-[0.08em] text-ink-0">
              <span style={{ fontSize: "clamp(36px, 6.5vw, 70px)", display: "inline-block" }}>{cfg.word}</span>
            </motion.h2>

            {/* tagline + CTAs — ~20% larger */}
            <p className="caps mt-6 text-[16px] font-medium text-ink-1 md:text-[18px]">{cfg.tagline}</p>
            <p className="mt-4 max-w-xl text-[18px] leading-[1.6] text-ink-2 md:text-[20px]">{cfg.description}</p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              <Magnetic href={cfg.primaryHref} className="inline-flex items-center justify-center gap-2.5 rounded-[5px] border border-ink-0 bg-ink-0 px-10 py-[19px] text-[15px] font-semibold text-paper-0 transition-colors hover:bg-ink-1">
                Pre-order — {cfg.price}
              </Magnetic>
              <a href={cfg.secondaryHref} className="inline-flex items-center justify-center rounded-[5px] border border-ink-0 px-10 py-[19px] text-[15px] font-semibold text-ink-0 transition-colors hover:bg-ink-0 hover:text-paper-0">
                {cfg.secondary}
              </a>
            </div>
          </Container>
        </motion.div>
      </div>
    </section>
  );
}
