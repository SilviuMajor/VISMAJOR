"use client";

import { ReactNode, useEffect, useId, useRef, useState } from "react";
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
      "A fast-acting cooling & tightening cream. Works in minutes. Up to one hour of temporary firmness, undetectable under a shirt.",
    price: "£18",
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
      "A recovery massage cream for men who train. Work it deep, by hand or with the steel tool, to ease worked muscle and keep a hard-trained body firm and defined.",
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
      "A natural matte cleanser for men: clay, charcoal and mint that lift the day's oil and grime, then rinse away for a clean, fresh, matte finish.",
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
    tagline: "Many Edges. One Tool.",
    description:
      "One weighted, machined-steel blade: several contoured edges for massage, recovery and working tension out of the muscle. By hand, or with the SCULPT cream.",
    price: "£24",
    primaryHref: "#buy",
    secondary: "The Edges",
    secondaryHref: "#edges",
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
   drawn tube/bottle for SCULPT/STONE, the single steel blade for STEEL. */
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
        <div className="relative h-[30vh] w-[300px] md:h-[36vh] md:w-[390px]">
          <ToolPhoto tool="sword" sizes="420px" priority />
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
  const { scrollY } = useScroll();

  // Hold the word dead-centre and still from the very first frame. The pinned
  // section only pins after it scrolls up past the announcement + nav; until
  // then we counter-translate it so it sits pinned at centre with no drift — the
  // reveal still begins as it pins (same timing). ~110px = announcement + nav.
  const [pin, setPin] = useState({ dist: 110, on: true });
  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const top = Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY));
      // only settle when this hero opens the page (product pages ≈ 110px); skip
      // it when the component sits far down a page (e.g. the stacked /hero-lab).
      setPin({ dist: top, on: top < window.innerHeight * 0.6 });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const settleY = useTransform(scrollY, (y) =>
    reduce || !pin.on ? 0 : Math.min(0, Math.max(-pin.dist, y - pin.dist)),
  );

  // Spring-smooth the reveal progress so a momentary main-thread hitch is
  // interpolated across frames instead of showing as a scale/opacity stutter.
  // (Reduced motion skips the spring so the reveal stays exact and instant.)
  const p = useSpring(scrollYProgress, { stiffness: 180, damping: 34, restDelta: 0.0004 });
  const prog = reduce ? scrollYProgress : p;

  // the word is centred + readable from first view; the instant you scroll it
  // grows and the dark field dissolves together — no initial hold, no dead gap.
  const maskScale = useTransform(prog, [0, 0.5], reduce ? [1, 1] : [1, 3.2]);
  const fieldOpacity = useTransform(prog, [0.04, 0.42], [1, 0]);
  // a white veil covers the bright scene (only when it isn't kept faint already)
  const veilOpacity = useTransform(prog, [0.5, 0.68], [0, 1]);
  // and the underline hero fades up
  const heroOpacity = useTransform(prog, [0.54, 0.74], [0, 1]);
  const heroY = useTransform(prog, [0.54, 0.74], reduce ? [0, 0] : [26, 0]);

  const VEIL = "radial-gradient(ellipse 62% 58% at 50% 48%, rgba(255,255,255,0.74) 0%, rgba(255,255,255,0.12) 74%)";

  return (
    <section ref={ref} id="reveal" className="relative bg-paper-0" style={{ height: "320vh" }}>
      <motion.div style={{ y: settleY }} className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* static scene, behind everything — faint throughout when overlayAlwaysOn */}
        <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
          <Image src={cfg.scene} alt="" fill priority sizes="100vw" className={`object-cover ${cfg.sceneObjectMobile} md:object-center ${overlayAlwaysOn ? "mix-blend-multiply" : ""}`} style={{ opacity: overlayAlwaysOn ? 0.46 : 1, transform: "translateZ(0)", backfaceVisibility: "hidden" }} />
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
                <text x="220" y="450" textAnchor="middle" dominantBaseline="middle" fill="black" style={{ fontFamily: "var(--font-cinzel)", fontWeight: 600, letterSpacing: 3, fontSize: 96 }}>
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
                <text x="720" y="450" textAnchor="middle" dominantBaseline="middle" fill="black" style={{ fontFamily: "var(--font-cinzel)", fontWeight: 600, letterSpacing: 6, fontSize: 300 }}>
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

        {/* the resolved underline hero */}
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center">
          <Container className="relative flex flex-col items-center">
            {/* eyebrow — Roman inscriptional (Cinzel) + Roman numerals */}
            <span className="serif uppercase text-ink-2" style={{ fontSize: "13px", letterSpacing: "0.16em" }}>
              {cfg.eyebrow}
            </span>

            {/* the signature object — a gentle float, no cursor drift */}
            <div className="relative mt-7">
              <motion.div animate={reduce ? {} : { y: [0, -9, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                <ProductVisual product={product} reduce={reduce} />
              </motion.div>
            </div>

            {/* the wordmark underlining the object — stationary */}
            <h2 className="pointer-events-none mt-3 select-none font-serif font-semibold uppercase leading-none tracking-[0.08em] text-ink-0">
              <span style={{ fontSize: "clamp(36px, 6.5vw, 70px)", display: "inline-block" }}>{cfg.word}</span>
            </h2>

            {/* tagline + blurb */}
            <p className="caps mt-5 text-[13px] font-medium text-ink-1 md:mt-6 md:text-[18px]">{cfg.tagline}</p>
            <p className="mt-3.5 max-w-xl text-[15px] leading-[1.6] text-ink-2 md:mt-4 md:text-[20px]">{cfg.description}</p>
            <div className="mt-7 flex flex-col items-center gap-2.5 sm:flex-row md:mt-8 md:gap-3">
              <Magnetic href={cfg.primaryHref} className="inline-flex items-center justify-center gap-2.5 rounded-[5px] border border-ink-0 bg-ink-0 px-8 py-[15px] text-[14px] font-semibold text-paper-0 transition-colors hover:bg-ink-1 md:px-10 md:py-[19px] md:text-[15px]">
                Pre-order {cfg.price}
              </Magnetic>
              <a href={cfg.secondaryHref} className="inline-flex items-center justify-center rounded-[5px] border border-ink-0 px-8 py-[15px] text-[14px] font-semibold text-ink-0 transition-colors hover:bg-ink-0 hover:text-paper-0 md:px-10 md:py-[19px] md:text-[15px]">
                {cfg.secondary}
              </a>
            </div>
          </Container>
        </motion.div>
      </motion.div>
    </section>
  );
}
