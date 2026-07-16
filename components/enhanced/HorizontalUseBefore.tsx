"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

const OCCASIONS = [
  "The shirt that matters.",
  "The beach.",
  "The night out.",
  "The gym mirror.",
  "The stage.",
];

const HAIR = "rgba(244,242,236,0.16)";

/**
 * "Five moments" — a pinned pan. Desktop pans horizontally; mobile pans
 * vertically (same idea, rotated) so the moments still glide by one at a time.
 */
export function HorizontalUseBefore() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackX = useRef<HTMLDivElement>(null);
  const trackY = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [maxX, setMaxX] = useState(0);
  const [maxY, setMaxY] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const measure = () => {
      if (trackX.current) setMaxX(Math.max(0, trackX.current.scrollWidth - window.innerWidth));
      if (trackY.current) setMaxY(Math.max(0, trackY.current.scrollHeight - window.innerHeight));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    x.set(-v * maxX);
    y.set(-v * maxY);
  });

  return (
    <section id="moments" ref={sectionRef} className="relative h-[480vh] bg-ink-0 text-paper-0 lg:h-[600vh]">
      {/* ---- Mobile / tablet: a vertical pinned pan ---- */}
      <div className="sticky top-0 h-screen overflow-hidden lg:hidden">
        <motion.div ref={trackY} style={{ y }} className="flex w-full flex-col will-change-transform">
          {/* intro */}
          <div className="flex min-h-[82vh] flex-col justify-center px-6">
            <div className="flex items-center gap-3.5">
              <span className="h-px w-8 bg-paper-0/40" />
              <span className="caps-loose text-[11px] font-medium text-paper-0/70">
                Use Before
              </span>
            </div>
            <h2
              className="mt-6 font-bold uppercase text-paper-0"
              style={{ fontSize: "clamp(44px, 13vw, 76px)", letterSpacing: "-0.03em", lineHeight: 0.95 }}
            >
              Five
              <br />
              moments.
            </h2>
            <p className="mt-5 max-w-xs text-[15px] leading-[1.6] text-paper-0/55">
              Keep your composure on hand, for the moments that ask for it.
            </p>
          </div>

          {/* occasions */}
          {OCCASIONS.map((o, i) => (
            <div
              key={o}
              className="flex min-h-[62vh] flex-col justify-center border-t px-6"
              style={{ borderColor: HAIR }}
            >
              <span className="caps text-[12px] font-medium text-paper-0/45">
                0{i + 1}
              </span>
              <p
                className="mt-3 font-bold uppercase text-paper-0"
                style={{ fontSize: "clamp(34px, 10vw, 56px)", letterSpacing: "-0.025em", lineHeight: 1.02 }}
              >
                {o}
              </p>
            </div>
          ))}

          {/* outro */}
          <div
            className="flex min-h-[82vh] flex-col justify-center border-t px-6"
            style={{ borderColor: HAIR }}
          >
            <p className="caps text-[12px] font-medium text-paper-0/55">
              Whenever you want to feel
            </p>
            <p
              className="mt-3 font-bold uppercase text-paper-0"
              style={{ fontSize: "clamp(44px, 14vw, 68px)", letterSpacing: "-0.025em", lineHeight: 1 }}
            >
              Sharper.
            </p>
            <a
              href="#buy"
              className="caps mt-8 inline-flex w-fit items-center gap-2.5 rounded-sm border border-paper-0 bg-paper-0 px-8 py-4 text-[12px] font-semibold text-ink-0 transition-colors hover:bg-transparent hover:text-paper-0"
            >
              Pre-order £18
            </a>
          </div>
        </motion.div>
      </div>

      {/* ---- Desktop: the cinematic horizontal pan ---- */}
      <div className="sticky top-0 hidden h-screen items-center overflow-hidden lg:flex">
        <motion.div
          ref={trackX}
          style={{ x }}
          className="flex items-center gap-0 will-change-transform"
        >
          {/* intro panel */}
          <div className="flex min-w-[58vw] flex-col justify-center pl-[16vw] pr-[8vw]">
            <div className="flex items-center gap-3.5">
              <span className="h-px w-8 bg-paper-0/40" />
              <span className="caps-loose text-[11px] font-semibold text-paper-0/70">
                Use Before
              </span>
            </div>
            <h2
              className="mt-7 font-bold uppercase text-paper-0"
              style={{ fontSize: "clamp(40px, 6vw, 92px)", letterSpacing: "-0.03em", lineHeight: 0.92 }}
            >
              Five
              <br />
              moments.
            </h2>
            <p className="mt-6 max-w-xs text-[14px] leading-[1.6] text-paper-0/55">
              Keep your composure on hand. Scroll →
            </p>
          </div>

          {/* occasion panels */}
          {OCCASIONS.map((o, i) => (
            <div
              key={o}
              className="flex min-w-[48vw] flex-col items-center justify-center border-l px-[6vw] text-center"
              style={{ borderColor: HAIR }}
            >
              <span className="caps text-[12px] font-medium text-paper-0/45">
                0{i + 1}
              </span>
              <p
                className="mt-5 font-bold uppercase text-paper-0"
                style={{ fontSize: "clamp(34px, 4.6vw, 72px)", letterSpacing: "-0.025em", lineHeight: 1.02 }}
              >
                {o}
              </p>
            </div>
          ))}

          {/* outro */}
          <div
            className="flex min-w-[40vw] flex-col justify-center border-l pl-[6vw] pr-[10vw]"
            style={{ borderColor: HAIR }}
          >
            <p className="caps text-[12px] font-medium text-paper-0/55">
              Whenever you want to feel
            </p>
            <p
              className="mt-3 font-bold uppercase text-paper-0"
              style={{ fontSize: "clamp(34px, 4.4vw, 68px)", letterSpacing: "-0.025em", lineHeight: 1 }}
            >
              Sharper.
            </p>
            <a
              href="#buy"
              className="caps mt-9 inline-flex w-fit items-center gap-2.5 rounded-sm border border-paper-0 bg-paper-0 px-8 py-4 text-[12px] font-semibold text-ink-0 transition-colors hover:bg-transparent hover:text-paper-0"
            >
              Pre-order £18
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
