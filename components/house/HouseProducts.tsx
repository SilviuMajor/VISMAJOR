"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { PRODUCTS, type ProductSlug } from "@/lib/products";

/* A minimal line-art mark per product — stands in, on-brand, for the
   photography to come. Cool snowflake / warm chisel / sharp facet. */
function Glyph({ slug, hex }: { slug: ProductSlug; hex: string }) {
  const common = {
    width: 66,
    height: 66,
    viewBox: "0 0 80 80",
    fill: "none",
    stroke: hex,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (slug === "gy-no") {
    return (
      <svg {...common} strokeWidth={1.4}>
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <g key={a} transform={`rotate(${a} 40 40)`}>
            <path d="M40 40 L40 13" />
            <path d="M40 21 L46 15" />
            <path d="M40 21 L34 15" />
          </g>
        ))}
        <circle cx={40} cy={40} r={3} fill={hex} stroke="none" />
      </svg>
    );
  }

  if (slug === "sculpt") {
    return (
      <svg {...common} strokeWidth={1.6}>
        {/* the steel tool — a sculpting blade */}
        <path d="M33 14 L47 14 L47 58 L33 47 Z" />
        <path d="M40 49 L47 55" strokeWidth={1.1} />
        {/* the contour it works */}
        <path d="M18 67 Q40 59 62 69" strokeWidth={1.2} opacity={0.85} />
        <path d="M52 40 L58 38" strokeWidth={1.1} opacity={0.7} />
        <path d="M54 47 L60 46" strokeWidth={1.1} opacity={0.7} />
      </svg>
    );
  }

  // sharp — a crisp four-point facet
  return (
    <svg {...common} strokeWidth={1.5}>
      <path d="M40 8 L45 35 L72 40 L45 45 L40 72 L35 45 L8 40 L35 35 Z" />
      <circle cx={40} cy={40} r={2.4} fill={hex} stroke="none" />
    </svg>
  );
}

export function HouseProducts() {
  const reduce = useReducedMotion();

  return (
    <section
      id="products"
      className="border-t bg-paper-0 py-20 md:py-28"
      style={{ borderColor: "var(--hair)" }}
    >
      <Container>
        <div className="flex items-center gap-3.5">
          <span className="h-px w-7 bg-[var(--hair-strong)]" />
          <span className="caps-loose text-[11px] font-medium text-ink-2">
            The House · Three topicals
          </span>
        </div>
        <h2
          className="mt-5 max-w-3xl font-bold uppercase text-ink-0"
          style={{ fontSize: "clamp(30px, 4.6vw, 64px)", letterSpacing: "-0.03em", lineHeight: 0.98 }}
        >
          One job each. Done well.
        </h2>
        <p className="mt-5 max-w-xl text-[16.5px] leading-[1.6] text-ink-1">
          Pick your problem. Each one is cosmetic, temporary by design, and built
          to do exactly one thing.
        </p>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.12 } } }}
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6"
        >
          {PRODUCTS.map((p) => (
            <motion.div
              key={p.slug}
              variants={{
                hidden: { opacity: 0, y: reduce ? 0 : 22 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0, 0, 1] } },
              }}
            >
              <Link
                href={p.href}
                className="group relative flex h-full flex-col transition-colors"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                  style={{ background: p.accentHex }}
                />

                <div className="relative flex items-center justify-between">
                  <span className="caps font-mono text-[10px] font-medium text-ink-3">{p.index}</span>
                  <span
                    className="caps inline-flex items-center gap-1.5 text-[10px] font-medium"
                    style={{ color: p.accentHex }}
                  >
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: p.accentHex }}
                    />
                    {p.signature}
                  </span>
                </div>

                {/* glyph specimen — where photography will later sit */}
                <div className="relative mt-6 flex aspect-[5/4] items-center justify-center">
                  <motion.div
                    initial={false}
                    whileHover={reduce ? undefined : { scale: 1.06, rotate: p.slug === "gy-no" ? 30 : 0 }}
                    transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
                  >
                    <Glyph slug={p.slug} hex={p.accentHex} />
                  </motion.div>
                  <span className="absolute bottom-3 left-4 caps text-[8.5px] font-medium text-ink-3">
                    VIS MAJOR / {p.index}
                  </span>
                </div>

                <div
                  className="relative mt-7 font-serif font-bold uppercase text-ink-0"
                  style={{ fontSize: "clamp(30px, 3.4vw, 42px)", letterSpacing: "-0.02em", lineHeight: 0.95 }}
                >
                  {p.wordmark}
                </div>
                <div className="relative mt-2.5 caps text-[11.5px] font-medium text-ink-1">
                  {p.category}
                </div>
                <p className="relative mt-4 flex-1 text-[14.5px] leading-[1.6] text-ink-2">
                  {p.short}
                </p>

                <div
                  className="relative mt-7 flex items-center justify-between border-t pt-5"
                  style={{ borderColor: "var(--hair)" }}
                >
                  <span className="caps font-mono text-[11px] font-medium text-ink-3">
                    Pre-order from £{p.priceFrom}
                  </span>
                  <span className="caps inline-flex items-center gap-2 text-[11px] font-medium text-ink-0">
                    View
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
