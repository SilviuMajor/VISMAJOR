import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { others, type ProductSlug } from "@/lib/products";
import { CreamTube } from "@/components/chisel/Art";
import { SharpBottle } from "@/components/sharp/Specimen";

/** Each product's own visual — GY-NO! has a real tube shot; SCULPT and STONE
 *  use their line-art renderings until photography exists. */
function ProductArt({ slug }: { slug: ProductSlug }) {
  if (slug === "gy-no") {
    return (
      <Image
        src="/product/front.png"
        alt=""
        fill
        sizes="150px"
        className="object-contain melt"
      />
    );
  }
  if (slug === "sculpt") return <CreamTube className="h-full w-full" />;
  if (slug === "stone") return <SharpBottle className="h-full w-full" />;
  return null;
}

/**
 * "See our other products" — the house cross-link band. Drops in at the foot
 * of any product page (just above the Footer). Shows the other two products,
 * each with its own product visual.
 */
export function OtherProducts({ current }: { current: ProductSlug }) {
  const rest = others(current);

  return (
    <section className="border-t bg-paper-1 py-20 md:py-28" style={{ borderColor: "var(--hair)" }}>
      <Container>
        <div className="flex items-center gap-3.5">
          <span className="h-px w-7 bg-[var(--hair-strong)]" />
          <span className="caps-loose text-[11px] font-semibold text-ink-2">
            The House · See our other products
          </span>
        </div>
        <h2
          className="mt-5 max-w-2xl font-extrabold uppercase text-ink-0"
          style={{ fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-0.03em", lineHeight: 0.98 }}
        >
          One standard, three jobs.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {rest.map((p) => (
            <Link
              key={p.slug}
              href={p.href}
              className="group relative block border-t pt-7 transition-colors"
              style={{ borderColor: "var(--hair)" }}
            >
              {/* ink rule grows along the top on hover */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-ink-0 transition-transform duration-300 group-hover:scale-x-100"
              />

              <div className="relative flex items-stretch gap-5">
                {/* copy */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <span className="caps text-[10px] font-semibold text-ink-3">{p.index}</span>
                    <span
                      className="caps inline-flex items-center gap-1.5 text-[10px] font-semibold"
                      style={{ color: p.accentHex }}
                    >
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ background: p.accentHex }}
                      />
                      {p.signature}
                    </span>
                  </div>

                  <div
                    className="mt-8 font-extrabold uppercase text-ink-0"
                    style={{ fontSize: "clamp(32px, 4.6vw, 56px)", letterSpacing: "-0.02em", lineHeight: 0.94 }}
                  >
                    {p.wordmark}
                  </div>
                  <div className="mt-3 caps text-[12px] font-semibold text-ink-1">
                    {p.category}
                  </div>
                  <p className="mt-4 max-w-md text-[15px] leading-[1.6] text-ink-2">
                    {p.short}
                  </p>

                  <div className="mt-7 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                    <span className="caps inline-flex items-center gap-2 text-[11px] font-semibold text-ink-0">
                      View {p.wordmark}
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                    <span className="caps text-[11px] font-semibold text-ink-3">
                      Pre-order from £{p.priceFrom}
                    </span>
                  </div>
                </div>

                {/* product visual */}
                <div className="flex w-[104px] shrink-0 items-center justify-center sm:w-[132px]">
                  <div className="relative h-[176px] w-full transition-transform duration-300 group-hover:-translate-y-1">
                    <ProductArt slug={p.slug} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
