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
];

export function HorizontalUseBefore() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setMaxScroll(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    x.set(-v * maxScroll);
  });

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-ink-0 text-paper-0">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex items-center gap-0 will-change-transform">
          {/* intro panel */}
          <div className="flex min-w-[78vw] flex-col justify-center pl-6 pr-[8vw] md:min-w-[46vw] md:pl-16">
            <div className="flex items-center gap-3.5">
              <span className="h-px w-8 bg-paper-0/40" />
              <span className="caps-loose text-[11px] font-semibold text-paper-0/70">
                Use Before
              </span>
            </div>
            <h2
              className="mt-7 font-extrabold uppercase text-paper-0"
              style={{ fontSize: "clamp(40px, 6vw, 92px)", letterSpacing: "-0.03em", lineHeight: 0.92 }}
            >
              Four<br />moments.
            </h2>
            <p className="mt-6 max-w-xs text-[14px] leading-[1.6] text-paper-0/55">
              Keep your composure on hand. Scroll →
            </p>
          </div>

          {/* occasion panels */}
          {OCCASIONS.map((o, i) => (
            <div
              key={o}
              className="flex min-w-[80vw] flex-col justify-center border-l pr-[6vw] pl-[6vw] md:min-w-[42vw]"
              style={{ borderColor: "rgba(244,242,236,0.16)" }}
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
          <div className="flex min-w-[70vw] flex-col justify-center border-l pl-[6vw] pr-[10vw] md:min-w-[40vw]"
            style={{ borderColor: "rgba(244,242,236,0.16)" }}
          >
            <p className="caps text-[12px] font-medium text-paper-0/55">
              Whenever you want to feel
            </p>
            <p
              className="mt-3 font-extrabold uppercase text-paper-0"
              style={{ fontSize: "clamp(34px, 4.4vw, 68px)", letterSpacing: "-0.025em", lineHeight: 1 }}
            >
              Sharper.
            </p>
            <a
              href="#buy"
              className="caps mt-9 inline-flex w-fit items-center gap-2.5 rounded-sm border border-paper-0 bg-paper-0 px-8 py-4 text-[12px] font-semibold text-ink-0 transition-colors hover:bg-transparent hover:text-paper-0"
            >
              Pre-order — £24
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
