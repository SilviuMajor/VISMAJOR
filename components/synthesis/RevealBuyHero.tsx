"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { AddToBag, type Tier } from "@/components/renditions/AddToBag";
import { ShotPlaceholder } from "@/components/renditions/ShotPlaceholder";

/**
 * The mask reveal, opening onto the buy section.
 *
 * Mechanically this is HeroTypeWindow: a 320vh pinned section, a scene at z-0,
 * a dark field at z-10 with the product word knocked out of it that scales and
 * dissolves on scroll, and the resolved content at z-30 fading up behind it.
 *
 * The one change is what sits at z-30. HeroTypeWindow resolves into a centred
 * lockup: floating tube, wordmark, tagline, two buttons. Here it resolves into
 * the offer itself, so the thing behind the mask is the thing you can buy
 * from. The scene stays exactly where it was, faint, at z-0.
 *
 * That collapses two sections into one and moves the first price from about
 * 3.3 screens down to the moment the reveal completes.
 *
 * HeroTypeWindow is left untouched, because the live site still uses it.
 */

const FIELD = "#14130F";
const VEIL =
  "radial-gradient(ellipse 62% 58% at 50% 48%, rgba(255,255,255,0.74) 0%, rgba(255,255,255,0.12) 74%)";

export function RevealBuyHero({
  word,
  scene,
  sceneObjectMobile = "object-center",
  index,
  category,
  line,
  tiers,
  defaultTier,
  product,
  cartPrefix,
  figure,
  figureAlt,
  figureFit = "cover",
  figurePosition = "50% 40%",
  productImg,
  productAlt,
  productBrief,
  mark,
}: {
  /** Catalogue number. Carried on the section so the review panel can scroll
   *  to the moment the offer is revealed rather than to the start of the pin. */
  mark?: string;
  word: string;
  scene: string;
  sceneObjectMobile?: string;
  index: string;
  category: string;
  line: string;
  tiers: Tier[];
  defaultTier?: string;
  product: "pectus" | "stone" | "sculpt" | "steel";
  cartPrefix: string;
  figure: string;
  figureAlt: string;
  figureFit?: "cover" | "contain";
  figurePosition?: string;
  productImg: string | null;
  productAlt: string;
  productBrief?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const uid = useId().replace(/:/g, "");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const { scrollY } = useScroll();

  // Hold the word dead-centre from the first frame: the section only pins once
  // it has scrolled past the announcement and nav, so counter-translate until
  // it does. Same approach as HeroTypeWindow, same timing.
  const [pin, setPin] = useState({ dist: 110, on: true });
  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const top = Math.max(
        0,
        Math.round(el.getBoundingClientRect().top + window.scrollY)
      );
      setPin({ dist: top, on: top < window.innerHeight * 0.6 });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const settleY = useTransform(scrollY, (y) =>
    reduce || !pin.on ? 0 : Math.min(0, Math.max(-pin.dist, y - pin.dist))
  );

  const p = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 34,
    restDelta: 0.0004,
  });
  const prog = reduce ? scrollYProgress : p;

  const maskScale = useTransform(prog, [0, 0.5], reduce ? [1, 1] : [1, 3.2]);
  const fieldOpacity = useTransform(prog, [0.04, 0.42], [1, 0]);
  const offerOpacity = useTransform(prog, [0.5, 0.7], [0, 1]);
  const offerY = useTransform(prog, [0.5, 0.7], reduce ? [0, 0] : [26, 0]);

  // The offer only becomes clickable once it is actually legible; until then
  // pointer events would land on an invisible buy button over the mask.
  const [live, setLive] = useState(false);
  useEffect(() => {
    const unsub = prog.on("change", (v) => setLive(v > 0.55));
    return () => unsub();
  }, [prog]);

  return (
    <section
      ref={ref}
      id="reveal"
      className="relative bg-paper-0"
      style={{ height: "320vh" }}
      data-mark={mark}
      data-mark-at="0.66"
    >
      <motion.div
        style={{ y: settleY }}
        className="sticky top-0 flex h-screen items-center overflow-hidden"
      >
        {/* the scene, exactly where it was: faint, behind everything */}
        <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={scene}
            alt=""
            fill
            priority
            sizes="100vw"
            className={`object-cover ${sceneObjectMobile} mix-blend-multiply md:object-center`}
            style={{
              opacity: 0.46,
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          />
          <div className="absolute inset-0" style={{ background: VEIL }} />
        </div>

        {/* the offer, revealed */}
        <motion.div
          style={{ opacity: offerOpacity, y: offerY }}
          className={`absolute inset-0 z-20 flex items-center ${
            live ? "" : "pointer-events-none"
          }`}
        >
          <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-8 px-6 md:px-12 lg:grid-cols-12 lg:gap-10">
            {/* the offer, on the left */}
            <div className="lg:col-span-5">
              <p
                className="text-[10px] font-semibold uppercase text-ink-2"
                style={{ letterSpacing: "0.06em" }}
              >
                {index}
              </p>

              <div className="mt-3 flex items-start justify-between gap-5 sm:justify-start sm:gap-8">
                <div>
                  <h1
                    className="serif text-ink-0"
                    style={{
                      fontSize: "clamp(40px,5vw,72px)",
                      lineHeight: 1.02,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {word}
                  </h1>
                  <p
                    className="mt-2 text-[12.5px] font-medium uppercase text-ink-2"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    {category}
                  </p>
                </div>

                {/* the tube, larger than it was */}
                <div className="relative h-[132px] w-[74px] shrink-0 md:h-[178px] md:w-[104px]">
                  {productImg ? (
                    <Image
                      src={productImg}
                      alt={productAlt}
                      fill
                      priority
                      sizes="104px"
                      className="object-contain drop-shadow-[0_20px_42px_rgba(20,19,15,0.22)]"
                    />
                  ) : (
                    <ShotPlaceholder
                      brief={productBrief ?? "Product on white"}
                      className="h-full w-full"
                    />
                  )}
                </div>
              </div>

              <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.58] text-ink-1">
                {line}
              </p>

              <AddToBag
                className="mt-6 max-w-[420px]"
                product={product}
                productName={word}
                cartPrefix={cartPrefix}
                tiers={tiers}
                defaultTier={defaultTier}
              />

              <ul
                className="mt-5 flex flex-wrap gap-x-6 gap-y-1.5 text-[10.5px] font-medium uppercase text-ink-2"
                style={{ letterSpacing: "0.05em" }}
              >
                <li>Free UK delivery</li>
                <li>30-day returns</li>
                <li>Made in the UK</li>
              </ul>
            </div>

            {/* the figure, on the right */}
            <div className="relative hidden h-[74vh] lg:col-span-6 lg:col-start-7 lg:block">
              <Image
                src={figure}
                alt={figureAlt}
                fill
                priority
                sizes="50vw"
                className={
                  figureFit === "cover"
                    ? "object-cover"
                    : "object-contain object-bottom"
                }
                style={
                  figureFit === "cover"
                    ? { objectPosition: figurePosition }
                    : undefined
                }
              />
            </div>
          </div>
        </motion.div>

        {/* the dark field with the word knocked out, over the offer */}
        <motion.div
          aria-hidden
          style={{
            opacity: fieldOpacity,
            scale: maskScale,
            willChange: "transform, opacity",
          }}
          className="pointer-events-none absolute inset-0 z-30"
        >
          <svg
            className="h-full w-full md:hidden"
            viewBox="0 0 440 900"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <mask id={`vm-${uid}`}>
                <rect width="440" height="900" fill="white" />
                <text
                  x="220"
                  y="450"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="black"
                  style={{
                    fontFamily: "var(--font-cinzel)",
                    fontWeight: 600,
                    letterSpacing: 3,
                    fontSize: 96,
                  }}
                >
                  {word}
                </text>
              </mask>
            </defs>
            <rect
              width="440"
              height="900"
              fill={FIELD}
              mask={`url(#vm-${uid})`}
            />
          </svg>
          <svg
            className="hidden h-full w-full md:block"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <mask id={`vd-${uid}`}>
                <rect width="1440" height="900" fill="white" />
                <text
                  x="720"
                  y="450"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="black"
                  style={{
                    fontFamily: "var(--font-cinzel)",
                    fontWeight: 600,
                    letterSpacing: 6,
                    fontSize: 300,
                  }}
                >
                  {word}
                </text>
              </mask>
            </defs>
            <rect
              width="1440"
              height="900"
              fill={FIELD}
              mask={`url(#vd-${uid})`}
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
