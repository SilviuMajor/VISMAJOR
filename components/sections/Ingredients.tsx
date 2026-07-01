import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

const INCI =
  "Aqua, Glycerin, Menthol, Caffeine, Polyacrylate Crosspolymer-6, Niacinamide, Aloe Barbadensis Leaf Juice Powder, Butylene Glycol, Carbomer, Phenoxyethanol, Caprylyl Glycol, Ethylhexylglycerin, Parfum.";

const BADGES = ["Made in the UK", "Cosmetic-Grade", "Cruelty-Free", "Vegan"];

export function Ingredients() {
  return (
    <section id="ingredients" className="py-16 md:py-24">
      <Container>
        <SectionHead n="05" title="Ingredients & origin." />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
          {/* Real back-label shot */}
          <Reveal>
            <div
              className="relative flex aspect-[1122/1402] items-center justify-center overflow-hidden border bg-paper-2"
              style={{ borderColor: "var(--hair)" }}
            >
              <div
                className="absolute inset-4 z-10 border"
                style={{ borderColor: "var(--hair-strong)" }}
                aria-hidden
              />
              <span className="absolute left-5 top-4 z-20 caps text-[9px] font-medium text-ink-3">
                Reverse Panel
              </span>
              <div className="relative h-[86%] w-[86%]">
                <Image
                  src="/product/back.png"
                  alt="PECTUS reverse label — directions, ingredients and barcode"
                  fill
                  sizes="(max-width: 1024px) 80vw, 420px"
                  className="object-contain"
                />
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <Reveal delay={0.05}>
            <h3
              className="font-bold uppercase text-ink-0"
              style={{
                fontSize: "clamp(40px, 5vw, 72px)",
                letterSpacing: "-0.025em",
                lineHeight: 0.96,
              }}
            >
              Made in the<br />United Kingdom.
            </h3>
            <p className="mt-7 max-w-xl text-[18px] leading-[1.65] text-ink-1">
              A water-based formula with caffeine, a menthol cooling complex,
              and a film-forming tightening system. Manufactured to UK cosmetic
              standards. No parabens. No sulphates. Never tested on animals.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {BADGES.map((b) => (
                <span
                  key={b}
                  className="caps inline-flex items-center gap-2 rounded-xs border px-3 py-2 text-[10.5px] font-semibold text-ink-0"
                  style={{ borderColor: "var(--hair-strong)" }}
                >
                  <span className="h-1 w-1 rounded-full bg-ink-0" />
                  {b}
                </span>
              ))}
            </div>

            <div className="mt-9">
              <Accordion
                items={[
                  {
                    q: "View Full Ingredients (INCI)",
                    a: (
                      <>
                        {INCI}
                        <span className="mt-3 block caps text-[10px] text-ink-3">
                          Final ingredient deck printed on outer carton.
                        </span>
                      </>
                    ),
                  },
                  {
                    q: "Directions",
                    a: "Apply a thin layer to clean, dry skin. Massage in until absorbed. Apply as needed. Avoid contact with eyes. For external use only.",
                  },
                  {
                    q: "Warnings",
                    a: "Patch test before first use. Discontinue if irritation occurs. Avoid broken skin. Keep out of reach of children. Store below 25°C.",
                  },
                ]}
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
