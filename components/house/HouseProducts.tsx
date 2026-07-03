"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { PRODUCTS, type ProductSlug } from "@/lib/products";
import { CreamTube } from "@/components/chisel/Art";
import { SharpBottle } from "@/components/sharp/Specimen";

/* The product's own shot for the shop grid — PECTUS uses its real tube photo;
   SCULPT / STONE use their line-art specimens until photography lands. */
function ProductImage({ slug }: { slug: ProductSlug }) {
  if (slug === "pectus") {
    return (
      <Image
        src="/product/front.png"
        alt="PECTUS tube"
        width={220}
        height={330}
        className="h-[82%] w-auto object-contain drop-shadow-[0_18px_32px_rgba(20,19,15,0.14)]"
      />
    );
  }
  if (slug === "sculpt") return <CreamTube className="h-[80%] w-auto" />;
  return <SharpBottle className="h-[76%] w-auto" />;
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

                {/* product shot — shop-style */}
                <div className="relative mt-6 flex aspect-[4/5] items-center justify-center overflow-hidden">
                  <motion.div
                    initial={false}
                    whileHover={reduce ? undefined : { scale: 1.04, y: -5 }}
                    transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
                    className="flex h-full w-full items-center justify-center"
                  >
                    <ProductImage slug={p.slug} />
                  </motion.div>
                  <span className="absolute bottom-2 left-0 caps text-[8.5px] font-medium text-ink-3">
                    VIS MAJOR / {p.index}
                  </span>
                </div>

                <div
                  className="relative mt-7 font-serif font-semibold uppercase text-ink-0"
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
