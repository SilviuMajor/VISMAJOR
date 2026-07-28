import Image from "next/image";
import { Body, Display, Eyebrow, Frame, Head, Margin, Rule, Section } from "./kit";
import { AddToBag } from "@/components/renditions/AddToBag";
import { INGREDIENTS, INGREDIENT_IMG } from "@/lib/ingredients";

const TIERS = [
  { key: "1", label: "One tube", unit: "20ml", price: 18 },
  { key: "2", label: "Two tubes", unit: "2 x 20ml", price: 32, note: "Save £4" },
];

const STEPS = [
  {
    n: "I",
    title: "Apply",
    body: "A pea-sized amount, worked flat across the chest. Ten minutes before the shirt goes on.",
  },
  {
    n: "II",
    title: "Cools",
    body: "Menthol agents land on contact. You feel it inside a few seconds, and it keeps going.",
  },
  {
    n: "III",
    title: "Holds",
    body: "Skin looks tighter and reads matte for about an hour. Then it fades, on its own.",
  },
];

const FAQS = [
  {
    q: "Will anyone be able to tell?",
    a: "No. It absorbs matte and leaves no colour, no shine and no residue on fabric. There is a faint clean mint on application that fades within a minute or two.",
  },
  {
    q: "How long does it actually last?",
    a: "About an hour. It is a cosmetic effect and a temporary one by design: PECTUS changes how skin looks and feels, not what it is.",
  },
  {
    q: "Is it a treatment?",
    a: "No. PECTUS is a cosmetic product. It is not a medicine and it does not treat any medical condition. If something about your chest concerns you, speak to a doctor.",
  },
  {
    q: "What if it is not for me?",
    a: "Return it within 30 days, opened or not, and we refund it. Made in the UK, shipped from the UK.",
  },
];

export function AtelierPectus() {
  const formula = INGREDIENTS.pectus;

  return (
    <>
      {/* ── 15 · The buy module is the hero ─────────────────────────── */}
      <section
        id="buy"
        className="border-b"
        style={{ borderColor: "var(--hair)" }}
        data-mark="15"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* the figure, at full column height and full strength */}
          <div
            className="relative min-h-[54vh] overflow-hidden border-b lg:min-h-[calc(100vh-74px)] lg:border-b-0 lg:border-r"
            style={{ borderColor: "var(--hair)" }}
            data-mark="16"
          >
            <Image
              src="/product/david.png"
              alt="A classical figure, one hand at the chest"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[50%_46%]"
            />
          </div>

          {/* the offer */}
          <div className="flex items-center px-6 py-16 md:px-14 lg:py-20">
            <div className="w-full max-w-[440px]">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <Eyebrow>Vis Major · No. I</Eyebrow>
                  <Display
                    size="clamp(40px,5vw,62px)"
                    className="mt-3"
                    data-mark="17"
                  >
                    PECTUS
                  </Display>
                  <p className="mt-2 text-[13px] font-medium uppercase text-ink-2" style={{ letterSpacing: "0.05em" }}>
                    Cooling Chest Primer
                  </p>
                </div>
                {/* the actual product, visible without a scroll */}
                <div className="relative h-[104px] w-[46px] shrink-0 md:h-[132px] md:w-[58px]">
                  <Image
                    src="/product/front.png"
                    alt="PECTUS, 20ml tube"
                    fill
                    priority
                    sizes="58px"
                    className="object-contain"
                  />
                </div>
              </div>

              <p className="mt-6 text-[17px] leading-[1.6] text-ink-1">
                Cools and tightens in minutes. About an hour of temporary
                firmness, undetectable under a shirt.
              </p>

              <AddToBag
                className="mt-8"
                product="pectus"
                productName="PECTUS"
                cartPrefix="pectus"
                tiers={TIERS}
              />

              <ul
                className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-medium uppercase text-ink-2"
                style={{ letterSpacing: "0.05em" }}
                data-mark="18"
              >
                <li>Free UK delivery</li>
                <li>30-day returns</li>
                <li>Made in the UK</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 19 · One proposition, given a whole screen ──────────────── */}
      <Section data-mark="19">
        <Frame>
          <div className="mx-auto max-w-[720px] text-center">
            <Eyebrow>The proposition</Eyebrow>
            <Head className="mt-6">
              Ten minutes before the shirt goes on.
            </Head>
            <Body className="mx-auto mt-7 text-center">
              PECTUS does one thing. It cools the chest, tightens how the skin
              sits, and leaves a matte finish that no one else can see. It is
              cosmetic, and it is temporary on purpose.
            </Body>
          </div>
        </Frame>
      </Section>

      {/* ── 20 · Three steps, flat on the page ─────────────────────── */}
      <Section band data-mark="20">
        <Frame>
          <Eyebrow>The method</Eyebrow>
          <div className="mt-10 grid grid-cols-1 gap-px sm:grid-cols-3" style={{ background: "var(--hair)" }}>
            {STEPS.map((s) => (
              <div key={s.n} className="px-0 py-8 sm:px-7 sm:py-2" style={{ background: "#ECEDEC" }}>
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

      {/* ── 21 · The formula, as marginalia ────────────────────────── */}
      <Section data-mark="21">
        <Frame>
          <Margin note={<>Formula<br />Two actives<br />{formula.line}</>}>
            <Head>What is in it.</Head>
            <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-14">
              {formula.heroes.map((h) => (
                <div key={h.name}>
                  <div className="relative aspect-square w-full max-w-[190px]">
                    <Image
                      src={INGREDIENT_IMG[h.name]}
                      alt={`${h.name}, drawn`}
                      fill
                      sizes="190px"
                      className="melt object-contain"
                    />
                  </div>
                  <h3 className="serif mt-5 text-[22px] text-ink-0">{h.name}</h3>
                  <p className="mt-2 max-w-[30ch] text-[15px] leading-[1.6] text-ink-1">
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

      {/* ── 22 · Proof, stated honestly ────────────────────────────── */}
      <Section band data-mark="22">
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
                <div key={i} className="border-t py-8" style={{ borderColor: "var(--hair-strong)" }}>
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

      {/* ── 23 · What it is not ────────────────────────────────────── */}
      <Section data-mark="23">
        <Frame>
          <Margin note={<>Plainly<br />What this is<br />and is not</>}>
            <Head>Honest about the limits.</Head>
            <div className="mt-9 grid grid-cols-1 gap-9 sm:grid-cols-2">
              <div>
                <p className="text-[10px] font-semibold uppercase text-ink-0" style={{ letterSpacing: "0.06em" }}>
                  It is
                </p>
                <ul className="mt-4 flex flex-col gap-2.5 text-[15.5px] leading-[1.55] text-ink-1">
                  <li>A cosmetic primer for the chest.</li>
                  <li>Fast, and temporary by design.</li>
                  <li>Invisible once it has absorbed.</li>
                  <li>Made in the UK, in small batches.</li>
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase text-ink-3" style={{ letterSpacing: "0.06em" }}>
                  It is not
                </p>
                <ul className="mt-4 flex flex-col gap-2.5 text-[15.5px] leading-[1.55] text-ink-3">
                  <li>A medicine or a treatment.</li>
                  <li>A permanent change of any kind.</li>
                  <li>A substitute for seeing a doctor.</li>
                  <li>Tested on animals.</li>
                </ul>
              </div>
            </div>
          </Margin>
        </Frame>
      </Section>

      {/* ── 24 · Questions ─────────────────────────────────────────── */}
      <Section id="faq" className="scroll-mt-[92px]" band data-mark="24">
        <Frame>
          <Margin note={<>Questions<br />Answered plainly</>}>
            <Head>Before you buy.</Head>
            <dl className="mt-9">
              {FAQS.map((f) => (
                <div key={f.q} className="border-t py-7" style={{ borderColor: "var(--hair-strong)" }}>
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

      {/* ── 25 · A quiet close ─────────────────────────────────────── */}
      <Section data-mark="25">
        <Frame>
          <div className="mx-auto max-w-[520px] text-center">
            <div className="relative mx-auto h-[150px] w-[66px]">
              <Image
                src="/product/squeeze.png"
                alt="PECTUS, open"
                fill
                sizes="66px"
                className="object-contain"
              />
            </div>
            <Head className="mt-9">One job. Done well.</Head>
            <p className="mt-4 text-[16px] leading-[1.6] text-ink-2">
              PECTUS · 20ml · <span className="num">£18</span>
            </p>
            <a
              href="#buy"
              className="mt-8 inline-flex items-center justify-center bg-ink-0 px-9 py-4 text-[14px] font-semibold text-paper-0"
            >
              Add to bag
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
