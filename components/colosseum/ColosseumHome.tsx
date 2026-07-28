import Image from "next/image";
import { Body, Colossal, Eyebrow, Hair, PAD, Slab, Wide } from "./kit";
import { PRODUCTS } from "@/lib/products";
import { SHELF, INGREDIENT_IMG } from "@/lib/ingredients";

const PANEL: Record<string, { img: string; fit: string }> = {
  pectus: { img: "/product/david.png", fit: "object-cover object-[50%_62%]" },
  stone: { img: "/men/stone-finish.png", fit: "object-cover object-[50%_30%]" },
  sculpt: { img: "/men/sculpt-carved.png", fit: "object-cover object-center" },
};

export function ColosseumHome() {
  return (
    <>
      {/* ── 45 · An ink slab, and a wordmark the screen cannot hold ── */}
      <Slab dark className="overflow-hidden" data-mark="45">
        <div className="flex min-h-[calc(100vh-74px)] flex-col justify-between pt-16 md:pt-24">
          <Wide>
            <Eyebrow data-mark="46" data-mark-tone="dark">
              Performance topicals for men · London · Est. MMXXVI
            </Eyebrow>
          </Wide>

          <div className="mt-10 whitespace-nowrap px-6 md:px-12">
            <Colossal
              as="h1"
              size="clamp(64px,17vw,300px)"
              data-mark="47"
              data-mark-tone="dark"
            >
              VIS&middot;MAJOR
            </Colossal>
          </div>

          <Wide className="mb-0 mt-12 pb-0">
            <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-12">
              <div className="md:col-span-5">
                <Body className="text-[18px]">
                  Four things, each engineered to do exactly one job and to stop
                  when it is done. Cosmetic, temporary on purpose, made in the
                  UK.
                </Body>
                <a
                  href="/pectus"
                  className="mt-8 inline-flex items-center bg-white px-9 py-4 text-[13px] font-semibold uppercase text-[#14130F]"
                  style={{ letterSpacing: "0.05em" }}
                >
                  Start with PECTUS · £18
                </a>
              </div>
              {/* the product, lit and rising out of the bottom edge */}
              <div className="relative h-[300px] md:col-span-6 md:col-start-7 md:h-[420px]">
                <Image
                  src="/product/front.png"
                  alt="PECTUS, 20ml"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </Wide>
        </div>
      </Slab>

      {/* ── 48 · A scene at full bleed, edge to edge ───────────────── */}
      <section
        className="relative h-[52vh] min-h-[320px] w-full overflow-hidden"
        data-mark="48"
      >
        <Image
          src="/scenes/extra.png"
          alt="A Roman interior, drawn"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </section>

      {/* ── 49 · The catalogue as full-bleed alternating panels ────── */}
      <Slab data-mark="49">
        <div className={PAD}>
          <Wide>
            <Eyebrow>The house</Eyebrow>
          </Wide>
        </div>
        {PRODUCTS.map((p, i) => {
          const flip = i % 2 === 1;
          const panel = PANEL[p.slug];
          return (
            <a
              key={p.slug}
              href={p.href}
              className={`group grid grid-cols-1 border-t md:grid-cols-2 ${
                flip ? "" : ""
              }`}
              style={{ borderColor: "var(--hairline)" }}
            >
              <div
                className={`relative h-[46vh] min-h-[300px] overflow-hidden bg-white md:h-[62vh] ${
                  flip ? "md:order-2" : ""
                }`}
              >
                <Image
                  src={panel.img}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`${panel.fit} transition-transform duration-700 group-hover:scale-[1.03]`}
                />
              </div>
              <div
                className={`flex flex-col justify-center px-6 py-14 md:px-14 ${
                  flip ? "md:order-1" : ""
                }`}
              >
                <p
                  className="num text-[12px] font-semibold tabular-nums text-ink-3"
                  style={{ letterSpacing: "0.05em" }}
                >
                  {p.index}
                </p>
                <Colossal className="mt-4" size="clamp(42px,6vw,92px)">
                  {p.wordmark}
                </Colossal>
                <p
                  className="mt-4 text-[12px] font-semibold uppercase text-ink-2"
                  style={{ letterSpacing: "0.05em" }}
                >
                  {p.category}
                </p>
                <Body className="mt-6">{p.short}</Body>
                <p className="num mt-7 text-[20px] font-semibold tabular-nums text-ink-0">
                  £{p.priceFrom}
                </p>
              </div>
            </a>
          );
        })}
      </Slab>

      {/* ── 50 · The standard, inverted ───────────────────────────── */}
      <Slab dark className="overflow-hidden" data-mark="50">
        <div className={PAD}>
          <Wide>
            <Eyebrow data-mark-tone="dark">The standard</Eyebrow>
          </Wide>
          <div className="mt-8 whitespace-nowrap px-6 md:px-12">
            <Colossal size="clamp(48px,11vw,190px)">MADE SMALL</Colossal>
          </div>
          <Wide className="mt-12">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
              <div className="md:col-span-5">
                <Body>
                  VIS MAJOR is a young house, run out of the UK, making in small
                  batches. Everything here is cosmetic: it changes how skin
                  looks and feels for a stated length of time, and then it
                  stops.
                </Body>
              </div>
              <div className="md:col-span-5 md:col-start-7">
                <Body>
                  We will always tell you how long that is, and we will never
                  describe a topical as a treatment. The drawings are ours. So
                  is the decision not to photograph a model wearing something
                  you cannot see.
                </Body>
              </div>
            </div>
          </Wide>
        </div>
      </Slab>

      {/* ── 51 · Materials, dense on paper ────────────────────────── */}
      <Slab data-mark="51">
        <div className={PAD}>
          <Wide>
            <Eyebrow>The materials</Eyebrow>
            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-6">
              {SHELF.map((s) => (
                <figure key={s.name}>
                  <div className="relative aspect-square w-full">
                    <Image
                      src={INGREDIENT_IMG[s.name]}
                      alt={`${s.name}, drawn`}
                      fill
                      sizes="(max-width: 768px) 44vw, 200px"
                      className="melt object-contain"
                    />
                  </div>
                  <figcaption className="mt-4">
                    <Hair />
                    <p
                      className="mt-3 text-[13px] font-bold uppercase text-ink-0"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {s.name}
                    </p>
                    <p
                      className="mt-2 font-mono text-[10px] uppercase text-ink-3"
                      style={{ letterSpacing: "0.05em" }}
                    >
                      {s.in.join(" · ")}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Wide>
        </div>
      </Slab>

      {/* ── 52 · Close ───────────────────────────────────────────── */}
      <Slab dark className="overflow-hidden" data-mark="52">
        <div className={PAD}>
          <Wide>
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
              <div className="md:col-span-7">
                <Colossal size="clamp(44px,6.4vw,104px)">ONE JOB.</Colossal>
                <Colossal size="clamp(44px,6.4vw,104px)">DONE WELL.</Colossal>
              </div>
              <div className="md:col-span-4 md:col-start-9">
                <Body>
                  Most people start with PECTUS. It is the cheapest way to find
                  out whether any of this is for you.
                </Body>
                <a
                  href="/pectus"
                  className="mt-7 inline-flex items-center bg-white px-9 py-4 text-[13px] font-semibold uppercase text-[#14130F]"
                  style={{ letterSpacing: "0.05em" }}
                >
                  PECTUS · £18
                </a>
              </div>
            </div>
            <Hair className="mt-16" />
            <p className="mt-6 text-[12px] leading-[1.7] text-white/45">
              Cosmetic use only. Temporary effect. Not a treatment for any
              medical condition.
            </p>
          </Wide>
        </div>
      </Slab>
    </>
  );
}
