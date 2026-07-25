import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { INGREDIENTS, INGREDIENT_IMG } from "@/lib/ingredients";
import type { ProductSlug } from "@/lib/products";

/**
 * "What's in it." — a product's named hero ingredients, each as a pencil
 * specimen plate with its INCI and one line on what it does. Shared by PECTUS
 * and SCULPT so the two can't drift; STONE tells the same story through its
 * pinned Formula rail. The full INCI lives in the buy panel, where the
 * "View full ingredients" link points.
 *
 * Claim-safe: nourishes, conditions, cools on contact, a firmer-LOOKING finish.
 */
export function ProductFormula({
  product,
  intro,
  href = "#buy",
}: {
  product: Extract<ProductSlug, "pectus" | "sculpt">;
  /** One line framing the list, in the product's own voice. */
  intro: string;
  /** Where "View full ingredients" points (PECTUS opens its INCI tab). */
  href?: string;
}) {
  const { heroes } = INGREDIENTS[product];
  // two heroes sit as a pair, three across the row
  const cols = heroes.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3";

  return (
    <section
      id="formula"
      className="scroll-mt-24 border-t bg-paper-1 py-16 md:py-24"
      style={{ borderColor: "var(--hair)" }}
    >
      <Container>
        <div className="flex items-center gap-3.5">
          <span className="h-px w-7 bg-[var(--hair-strong)]" />
          <span className="caps-loose text-[11px] font-medium text-ink-2">
            The Formula · What goes in
          </span>
        </div>
        <h2
          className="mt-5 max-w-2xl font-bold uppercase text-ink-0"
          style={{ fontSize: "clamp(30px, 4.4vw, 60px)", letterSpacing: "-0.03em", lineHeight: 0.98 }}
        >
          What&rsquo;s in it.
        </h2>
        <p className="mt-5 max-w-xl text-[16.5px] leading-[1.65] text-ink-1">{intro}</p>

        <div className={`mt-14 grid grid-cols-1 gap-x-10 gap-y-11 ${cols}`}>
          {heroes.map((h, i) => (
            <Reveal key={h.name} delay={i * 0.06}>
              <div
                className="flex h-full flex-col border-t pt-7"
                style={{ borderColor: "var(--hair)" }}
              >
                <div className="relative mb-7 aspect-[4/5] w-[70%] self-center">
                  <Image
                    src={INGREDIENT_IMG[h.name]}
                    alt={`${h.name} — specimen illustration`}
                    fill
                    sizes="(max-width: 640px) 59vw, 240px"
                    className="melt object-contain"
                  />
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <h3
                    className="font-semibold uppercase font-serif text-ink-0"
                    style={{ fontSize: "clamp(22px,2.4vw,30px)", letterSpacing: "-0.01em" }}
                  >
                    {h.name}
                  </h3>
                  <span className="caps font-mono text-[10px] font-medium text-ink-3">
                    {`0${i + 1}`}
                  </span>
                </div>
                <span className="mt-2 font-mono text-[10.5px] leading-[1.5] text-ink-3">
                  {h.inci}
                </span>
                <p className="mt-4 text-[15px] leading-[1.6] text-ink-2">{h.role}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Link
          href={href}
          className="caps mt-12 inline-flex items-center gap-2.5 text-[11px] font-medium text-ink-0"
        >
          View full ingredients
          <span className="transition-transform duration-300 hover:translate-x-1">→</span>
        </Link>
      </Container>
    </section>
  );
}
