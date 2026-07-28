import Image from "next/image";
import { Body, Display, Eyebrow, Frame, Head, Margin, Rule, Section } from "./kit";
import { AddToBag } from "@/components/renditions/AddToBag";
import { ShotPlaceholder } from "@/components/renditions/ShotPlaceholder";
import { INGREDIENTS, INGREDIENT_IMG } from "@/lib/ingredients";

const TIERS = [
  { key: "1", label: "One jar", unit: "100ml", price: 22 },
  { key: "2", label: "Large jar", unit: "200ml", price: 38, note: "Most chosen" },
  { key: "3", label: "Two jars", unit: "2 x 100ml", price: 40, note: "Save £4" },
];

const STEPS = [
  {
    n: "I",
    title: "Wet",
    body: "Warm water, then a ten-pence amount worked between wet palms until it turns to a light grey slip.",
  },
  {
    n: "II",
    title: "Work",
    body: "Twenty seconds across the face, avoiding the eyes. The clay does the drawing, so there is no need to scrub.",
  },
  {
    n: "III",
    title: "Rinse",
    body: "Rinse cool and pat dry. Skin is left clean, matte and cool, with none of the tightness a foaming wash leaves.",
  },
];

const FAQS = [
  {
    q: "Will it dry my skin out?",
    a: "It should not. STONE is sulphate-free, so it lifts the day's oil without stripping the skin underneath. If your skin runs dry, use it in the evening only.",
  },
  {
    q: "How often should I use it?",
    a: "Once or twice a day. Most people settle on evenings, after a day of city air, and plain water in the morning.",
  },
  {
    q: "Does it smell?",
    a: "Faintly of peppermint while you are using it, and of nothing at all a minute after you rinse.",
  },
  {
    q: "What if it is not for me?",
    a: "Return it within 30 days, opened or not, and we refund it. Made in the UK, shipped from the UK.",
  },
];

export function AtelierStone() {
  const formula = INGREDIENTS.stone;

  return (
    <>
      {/* ── 31 · Same skeleton as PECTUS, its own character ────────── */}
      <section
        id="buy"
        className="border-b"
        style={{ borderColor: "var(--hair)" }}
        data-mark="31"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center px-6 py-16 md:px-14 lg:order-2 lg:py-20">
            <div className="w-full max-w-[440px]">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <Eyebrow>Vis Major · No. II</Eyebrow>
                  <Display
                    size="clamp(40px,5vw,62px)"
                    className="mt-3"
                    data-mark="32"
                  >
                    STONE
                  </Display>
                  <p
                    className="mt-2 text-[13px] font-medium uppercase text-ink-2"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    Matte Cleanser
                  </p>
                </div>
                {/* every render in /public/product is the PECTUS tube */}
                <div className="relative h-[104px] w-[62px] shrink-0 md:h-[132px] md:w-[76px]">
                  <ShotPlaceholder
                    brief="STONE jar, front, on white"
                    className="h-full w-full"
                  />
                </div>
              </div>

              <p className="mt-6 text-[17px] leading-[1.6] text-ink-1">
                Clay, charcoal and mint. Lifts the day off, rinses clean, and
                leaves the skin matte rather than tight.
              </p>

              <AddToBag
                className="mt-8"
                product="stone"
                productName="STONE"
                cartPrefix="sharp"
                tiers={TIERS}
                defaultTier="2"
              />

              <ul
                className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-medium uppercase text-ink-2"
                style={{ letterSpacing: "0.05em" }}
              >
                <li>Free UK delivery</li>
                <li>30-day returns</li>
                <li>Made in the UK</li>
              </ul>
            </div>
          </div>

          {/* STONE's own figure: the wash, at full strength */}
          <div
            className="relative min-h-[54vh] overflow-hidden border-b lg:order-1 lg:min-h-[calc(100vh-74px)] lg:border-b-0 lg:border-r"
            style={{ borderColor: "var(--hair)" }}
            data-mark="33"
          >
            <Image
              src="/men/stone-wash.png"
              alt="A figure washing at a basin, drawn"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain object-bottom p-6"
            />
          </div>
        </div>
      </section>

      {/* ── 34 · One proposition ──────────────────────────────────── */}
      <Section data-mark="34">
        <Frame>
          <div className="mx-auto max-w-[720px] text-center">
            <Eyebrow>The proposition</Eyebrow>
            <Head className="mt-6">Take the day off your face.</Head>
            <Body className="mx-auto mt-7 text-center">
              A cleanser has one job: remove what the day put there, and leave
              everything else alone. STONE draws out oil with clay, lifts grime
              with charcoal, and finishes cool with mint.
            </Body>
          </div>
        </Frame>
      </Section>

      {/* ── 35 · Three steps, unpinned ────────────────────────────── */}
      <Section band data-mark="35">
        <Frame>
          <Eyebrow>The method</Eyebrow>
          <div
            className="mt-10 grid grid-cols-1 gap-px sm:grid-cols-3"
            style={{ background: "var(--hair)" }}
          >
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="px-0 py-8 sm:px-7 sm:py-2"
                style={{ background: "#ECEDEC" }}
              >
                <p className="serif text-[15px] text-ink-3">{s.n}</p>
                <h3
                  className="mt-3 text-[13px] font-semibold uppercase text-ink-0"
                  style={{ letterSpacing: "0.05em" }}
                >
                  {s.title}
                </h3>
                <p className="mt-3 max-w-[34ch] text-[15px] leading-[1.65] text-ink-1">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </Frame>
      </Section>

      {/* ── 36 · Three actives ────────────────────────────────────── */}
      <Section data-mark="36">
        <Frame>
          <Margin note={<>Formula<br />Three actives<br />{formula.line}</>}>
            <Head>What is in it.</Head>
            <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
              {formula.heroes.map((h) => (
                <div key={h.name}>
                  <div className="relative aspect-square w-full max-w-[170px]">
                    <Image
                      src={INGREDIENT_IMG[h.name]}
                      alt={`${h.name}, drawn`}
                      fill
                      sizes="170px"
                      className="melt object-contain"
                    />
                  </div>
                  <h3 className="serif mt-5 text-[21px] text-ink-0">{h.name}</h3>
                  <p className="mt-2 max-w-[28ch] text-[14.5px] leading-[1.6] text-ink-1">
                    {h.role}
                  </p>
                  <p
                    className="mt-3 font-mono text-[10.5px] uppercase text-ink-3"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    {h.inci}
                  </p>
                </div>
              ))}
            </div>
          </Margin>
        </Frame>
      </Section>

      {/* ── 37 · The finish, as a full plate ──────────────────────── */}
      <Section band data-mark="37">
        <Frame>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow>The finish</Eyebrow>
              <Head className="mt-6">Clean, and then nothing.</Head>
              <Body className="mt-6">
                No squeak, no tightness, no film. The point of a matte finish is
                that you stop thinking about your face until tomorrow.
              </Body>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/men/stone-finish.png"
                  alt="A figure at rest after washing, drawn"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </Frame>
      </Section>

      {/* ── 38 · Proof, honest ────────────────────────────────────── */}
      <Section data-mark="38">
        <Frame>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>What people say</Eyebrow>
              <p className="serif mt-5 text-[52px] leading-none text-ink-0">
                &mdash;&mdash;
              </p>
              <p className="mt-4 max-w-[26ch] text-[14px] leading-[1.6] text-ink-2">
                No reviews yet. This section is built and waiting: real
                quotations and a real count go here the day there are some.
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="border-t py-8"
                  style={{ borderColor: "var(--hair-strong)" }}
                >
                  <p className="serif text-[21px] leading-[1.45] text-ink-3">
                    A verified customer quotation will sit here, at this size,
                    in this position.
                  </p>
                  <p
                    className="mt-4 text-[10px] font-semibold uppercase text-ink-3"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    Name · Verified purchase
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Frame>
      </Section>

      {/* ── 39 · Questions ────────────────────────────────────────── */}
      <Section id="faq" className="scroll-mt-[92px]" band data-mark="39">
        <Frame>
          <Margin note={<>Questions<br />Answered plainly</>}>
            <Head>Before you buy.</Head>
            <dl className="mt-9">
              {FAQS.map((f) => (
                <div
                  key={f.q}
                  className="border-t py-7"
                  style={{ borderColor: "var(--hair-strong)" }}
                >
                  <dt className="text-[16px] font-semibold text-ink-0">{f.q}</dt>
                  <dd className="mt-2.5 max-w-[58ch] text-[15.5px] leading-[1.65] text-ink-1">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </Margin>
        </Frame>
      </Section>

      {/* ── 40 · Close ────────────────────────────────────────────── */}
      <Section data-mark="40">
        <Frame>
          <div className="mx-auto max-w-[520px] text-center">
            <div className="relative mx-auto h-[150px] w-[110px]">
              <ShotPlaceholder
                brief="STONE jar, three-quarter, on white"
                className="h-full w-full"
              />
            </div>
            <Head className="mt-9">Tabula rasa.</Head>
            <p className="mt-4 text-[16px] leading-[1.6] text-ink-2">
              STONE · 100ml · <span className="num">£22</span>
            </p>
            <a
              href="#buy"
              className="mt-8 inline-flex items-center justify-center bg-ink-0 px-9 py-4 text-[14px] font-semibold text-paper-0"
            >
              Add to bag
            </a>
            <Rule className="mt-16" />
            <p className="mt-6 text-[12px] leading-[1.7] text-ink-3">
              Cosmetic use only. For external use. Avoid the eye area.
            </p>
          </div>
        </Frame>
      </Section>
    </>
  );
}
