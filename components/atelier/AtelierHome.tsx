import Image from "next/image";
import { Body, Display, Eyebrow, Frame, Head, Margin, Rule, Section } from "./kit";
import { PRODUCTS } from "@/lib/products";
import { SHELF, INGREDIENT_IMG } from "@/lib/ingredients";

// Only PECTUS has photography; the other two would show the wrong tube.
const PLATE: Record<string, string | undefined> = {
  pectus: "/product/front.png",
};

export function AtelierHome() {
  return (
    <>
      {/* ── 1 · An inset plate, not a full-bleed scroll hero ────────── */}
      <section className="pt-16 md:pt-24" data-mark="1">
        <Frame>
          <div className="mx-auto max-w-[640px] text-center">
            <Eyebrow>Performance topicals for men · London</Eyebrow>
            <Display className="mt-6" size="clamp(38px,5vw,66px)" data-mark="2">
              VIS&middot;MAJOR
            </Display>
            <Body className="mx-auto mt-6 text-center">
              A small house of precision topicals. Each one engineered to do
              exactly one thing, and to stop when it is done.
            </Body>
          </div>
        </Frame>

        {/* the villa, padded onto the page rather than cropped to fill it */}
        <Frame className="mt-14">
          <div className="relative aspect-[16/9] w-full" data-mark="3">
            <Image
              src="/scenes/home.png"
              alt="A neoclassical villa, drawn"
              fill
              priority
              sizes="(max-width: 1100px) 100vw, 1050px"
              className="object-contain"
            />
          </div>
          <p
            className="mt-4 text-center font-mono text-[10.5px] uppercase text-ink-3"
            style={{ letterSpacing: "0.05em" }}
            data-mark="4"
          >
            Pl. I &mdash; The house, graphite on paper
          </p>
        </Frame>
      </section>

      {/* ── 5 · One sentence, given a whole screen ─────────────────── */}
      <Section data-mark="5">
        <Frame>
          <div className="mx-auto max-w-[760px] text-center">
            <Head>One job. Done well.</Head>
            <Body className="mx-auto mt-7 text-center">
              Most grooming asks you to believe in a routine. We would rather
              make four things that each do one job, tell you exactly how long
              the effect lasts, and let you decide whether that is worth
              eighteen pounds.
            </Body>
          </div>
        </Frame>
      </Section>

      {/* ── 6 · The catalogue as a ruled index, not cards ──────────── */}
      <Section band data-mark="6">
        <Frame>
          <Eyebrow>The house</Eyebrow>
          <ul className="mt-10">
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                <a
                  href={p.href}
                  className="group grid grid-cols-12 items-center gap-4 border-t py-7 transition-colors hover:bg-white/60"
                  style={{ borderColor: "var(--hair-strong)" }}
                >
                  <span
                    className="col-span-2 font-mono text-[11px] text-ink-3 sm:col-span-1"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    {p.index}
                  </span>
                  <span className="col-span-7 sm:col-span-4">
                    <span className="serif block text-[clamp(21px,2.4vw,30px)] text-ink-0">
                      {p.wordmark}
                    </span>
                    <span
                      className="mt-1 block text-[11px] uppercase text-ink-2"
                      style={{ letterSpacing: "0.05em" }}
                    >
                      {p.category}
                    </span>
                  </span>
                  <span className="col-span-12 hidden text-[14.5px] leading-[1.55] text-ink-1 sm:col-span-5 sm:block">
                    {p.short}
                  </span>
                  <span className="col-span-3 flex items-center justify-end gap-5 sm:col-span-2">
                    <span className="num text-[15px] font-semibold tabular-nums text-ink-0">
                      £{p.priceFrom}
                    </span>
                    {PLATE[p.slug] && (
                      <span className="relative hidden h-[54px] w-[24px] shrink-0 sm:block">
                        <Image
                          src={PLATE[p.slug] as string}
                          alt=""
                          fill
                          sizes="24px"
                          className="object-contain"
                        />
                      </span>
                    )}
                  </span>
                </a>
              </li>
            ))}
            <li>
              <a
                href="/steel"
                className="grid grid-cols-12 items-center gap-4 border-y py-7 transition-colors hover:bg-white/60"
                style={{ borderColor: "var(--hair-strong)" }}
              >
                <span
                  className="col-span-2 font-mono text-[11px] text-ink-3 sm:col-span-1"
                  style={{ letterSpacing: "0.05em" }}
                >
                  004
                </span>
                <span className="col-span-7 sm:col-span-4">
                  <span className="serif block text-[clamp(21px,2.4vw,30px)] text-ink-0">
                    STEEL
                  </span>
                  <span
                    className="mt-1 block text-[11px] uppercase text-ink-2"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    Machined Tool
                  </span>
                </span>
                <span className="col-span-12 hidden text-[14.5px] leading-[1.55] text-ink-1 sm:col-span-5 sm:block">
                  A weighted stainless tool for working SCULPT into the skin.
                  Optional, and made to outlast the cream by some decades.
                </span>
                <span className="col-span-3 flex items-center justify-end sm:col-span-2">
                  <span className="num text-[15px] font-semibold tabular-nums text-ink-0">
                    £24
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </Frame>
      </Section>

      {/* ── 7 · Materials, as a herbarium ─────────────────────────── */}
      <Section data-mark="7">
        <Frame>
          <Margin note={<>Materials<br />Six, across four products</>}>
            <Head>What we build with.</Head>
            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 sm:gap-x-12">
              {SHELF.map((s, i) => (
                <figure key={s.name}>
                  <div className="relative aspect-square w-full">
                    <Image
                      src={INGREDIENT_IMG[s.name]}
                      alt={`${s.name}, drawn`}
                      fill
                      sizes="(max-width: 640px) 44vw, 240px"
                      className="melt object-contain"
                    />
                  </div>
                  <figcaption className="mt-4">
                    <p className="serif text-[19px] text-ink-0">{s.name}</p>
                    <p className="mt-1.5 max-w-[24ch] text-[13.5px] leading-[1.5] text-ink-2">
                      {s.role}
                    </p>
                    <p
                      className="mt-2.5 font-mono text-[10px] uppercase text-ink-3"
                      style={{ letterSpacing: "0.05em" }}
                    >
                      Pl. {i + 1} &mdash; in {s.in.join(", ")}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Margin>
        </Frame>
      </Section>

      {/* ── 8 · The standard, with the house story folded in ──────── */}
      <Section band data-mark="8">
        <Frame>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Eyebrow>The standard</Eyebrow>
              <Head className="mt-6">Made small, on purpose.</Head>
              <Body className="mt-6">
                VIS MAJOR is a young house, run out of the UK, making in small
                batches. Everything here is cosmetic: it changes how skin looks
                and feels for a stated length of time, and then it stops. We
                will always tell you how long that is, and we will never
                describe a topical as a treatment.
              </Body>
              <Body className="mt-5">
                The drawings are ours. So is the decision not to photograph a
                model wearing something you cannot see.
              </Body>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="relative aspect-[3/4] w-full" data-mark="9">
                <Image
                  src="/figures/general.png"
                  alt="A classical figure, drawn"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </Frame>
      </Section>

      {/* ── 10 · A quiet close ────────────────────────────────────── */}
      <Section data-mark="10">
        <Frame>
          <div className="mx-auto max-w-[520px] text-center">
            <Head>Start with one.</Head>
            <Body className="mx-auto mt-5 text-center">
              Most people start with PECTUS. It is the cheapest way to find out
              whether any of this is for you.
            </Body>
            <a
              href="/pectus"
              className="mt-8 inline-flex items-center justify-center bg-ink-0 px-9 py-4 text-[14px] font-semibold text-paper-0"
            >
              PECTUS &middot; £18
            </a>
            <Rule className="mt-16" />
            <p className="mt-6 text-[12px] leading-[1.7] text-ink-3">
              Cosmetic use only. Temporary effect. Not a treatment for any
              medical condition.
            </p>
          </div>
        </Frame>
      </Section>
    </>
  );
}
