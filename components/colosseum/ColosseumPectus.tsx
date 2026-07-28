import Image from "next/image";
import { Body, Colossal, Eyebrow, Hair, PAD, Slab, Stack, Wide } from "./kit";
import { AddToBag } from "@/components/renditions/AddToBag";
import { INGREDIENTS, INGREDIENT_IMG } from "@/lib/ingredients";

const TIERS = [
  { key: "1", label: "One tube", unit: "20ml", price: 18 },
  { key: "2", label: "Two tubes", unit: "2 x 20ml", price: 32, note: "Save £4" },
];

const STEPS = [
  { n: "01", t: "APPLY", b: "A pea-sized amount, worked flat across the chest. Ten minutes before the shirt." },
  { n: "02", t: "COOLS", b: "Menthol agents land on contact. Seconds, not minutes. You will know it is working." },
  { n: "03", t: "HOLDS", b: "Tighter, matte, invisible. About an hour. Then it lets go on its own." },
];

export function ColosseumPectus() {
  const formula = INGREDIENTS.pectus;

  return (
    <>
      {/* ── 59 · Hard split: the offer on ink, the figure on paper ─── */}
      <section id="buy" className="grid grid-cols-1 lg:grid-cols-2" data-mark="59">
        <div
          className="order-2 flex items-center bg-[#14130F] px-6 py-20 md:px-14 lg:order-1 lg:min-h-[calc(100vh-74px)] lg:py-16"
          style={{ ["--fg" as string]: "#fff", ["--fg-dim" as string]: "rgba(255,255,255,0.62)" }}
        >
          <div className="w-full max-w-[480px]">
            <p
              className="text-[10px] font-semibold uppercase text-white/55"
              style={{ letterSpacing: "0.05em" }}
            >
              Vis Major · No. I
            </p>
            <h1
              className="serif mt-4 text-white"
              style={{
                fontSize: "clamp(54px,7.4vw,116px)",
                lineHeight: 0.88,
                letterSpacing: "-0.02em",
              }}
              data-mark="60"
              data-mark-tone="dark"
            >
              PECTUS
            </h1>
            <p
              className="mt-4 text-[12px] font-semibold uppercase text-white/70"
              style={{ letterSpacing: "0.05em" }}
            >
              Cooling Chest Primer · 20ml
            </p>

            <p className="mt-8 max-w-[42ch] text-[17px] leading-[1.6] text-white/75">
              Cools and tightens in minutes. About an hour of temporary
              firmness, undetectable under a shirt.
            </p>

            <AddToBag
              className="mt-9"
              product="pectus"
              productName="PECTUS"
              cartPrefix="pectus"
              tiers={TIERS}
              tone="dark"
            />

            <ul
              className="mt-7 flex flex-wrap gap-x-7 gap-y-2 text-[10.5px] font-semibold uppercase text-white/55"
              style={{ letterSpacing: "0.05em" }}
            >
              <li>Free UK delivery</li>
              <li>30-day returns</li>
              <li>Made in the UK</li>
            </ul>
          </div>
        </div>

        <div
          className="relative order-1 min-h-[58vh] bg-white lg:order-2 lg:min-h-[calc(100vh-74px)]"
          data-mark="61"
        >
          <Image
            src="/product/david.png"
            alt="A classical figure, one hand at the chest"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[50%_44%]"
          />
          {/* the product, small and hard-edged against the drawing */}
          <div className="absolute bottom-8 right-8 h-[150px] w-[66px] md:h-[200px] md:w-[88px]">
            <Image
              src="/product/front.png"
              alt="PECTUS, 20ml"
              fill
              priority
              sizes="88px"
              className="object-contain drop-shadow-[0_20px_40px_rgba(20,19,15,0.28)]"
            />
          </div>
        </div>
      </section>

      {/* ── 62 · A headline the viewport cannot hold ───────────────── */}
      <Slab className="overflow-hidden" data-mark="62">
        <div className={PAD}>
          <Wide>
            <Eyebrow>The proposition</Eyebrow>
          </Wide>
          <div className="mt-8 whitespace-nowrap pl-6 md:pl-12">
            <Colossal size="clamp(60px,15vw,260px)">
              TEN MINUTES BEFORE THE SHIRT
            </Colossal>
          </div>
          <Wide className="mt-10">
            <Body className="text-[18px]">
              PECTUS does one thing. It cools the chest, tightens how the skin
              sits, and leaves a matte finish nobody else can see. Cosmetic, and
              temporary on purpose.
            </Body>
          </Wide>
        </div>
      </Slab>

      {/* ── 63 · A scene at full bleed, no margin at all ───────────── */}
      <section className="relative h-[46vh] min-h-[300px] w-full overflow-hidden md:h-[62vh]" data-mark="63">
        <Image
          src="/scenes/pectus.png"
          alt="A Roman interior"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-white/85 via-transparent to-transparent pb-10">
          <p className="serif px-6 text-center text-[clamp(18px,2.4vw,32px)] italic text-ink-0">
            Mens sana in corpore sano
          </p>
        </div>
      </section>

      {/* ── 64 · The method, three ink panels ──────────────────────── */}
      <Slab dark data-mark="64">
        <div className={PAD}>
          <Wide>
            <Eyebrow>The method</Eyebrow>
            <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-14 md:grid-cols-3">
              {STEPS.map((s) => (
                <div key={s.n}>
                  <p className="num text-[13px] font-semibold tabular-nums text-white/45">
                    {s.n}
                  </p>
                  <Hair className="mt-4" />
                  <Stack className="mt-6" size="clamp(30px,3.4vw,52px)">
                    {s.t}
                  </Stack>
                  <Body className="mt-4">{s.b}</Body>
                </div>
              ))}
            </div>
          </Wide>
        </div>
      </Slab>

      {/* ── 65 · Two actives, drawn large ──────────────────────────── */}
      <Slab data-mark="65">
        <div className={PAD}>
          <Wide>
            <Eyebrow>The formula</Eyebrow>
            <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
              {formula.heroes.map((h) => (
                <div key={h.name} className="flex flex-col">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={INGREDIENT_IMG[h.name]}
                      alt={`${h.name}, drawn`}
                      fill
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className="melt object-contain"
                    />
                  </div>
                  <Stack className="mt-8" size="clamp(34px,4.4vw,66px)">
                    {h.name}
                  </Stack>
                  <Body className="mt-4">{h.role}</Body>
                  <p
                    className="mt-4 font-mono text-[11px] uppercase text-ink-3"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    {h.inci}
                  </p>
                </div>
              ))}
            </div>
          </Wide>
        </div>
      </Slab>

      {/* ── 66 · Proof, honest ─────────────────────────────────────── */}
      <Slab dark data-mark="66">
        <div className={PAD}>
          <Wide>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Eyebrow>What people say</Eyebrow>
                <Stack className="mt-6" size="clamp(28px,3vw,44px)">
                  NOTHING YET
                </Stack>
                <Body className="mt-4">
                  No reviews, and none invented. The slot is built at full size
                  and waiting: real quotations and a real order count go here
                  the day there are some.
                </Body>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                {[1, 2].map((i) => (
                  <div key={i}>
                    <Hair />
                    <p className="serif py-9 text-[clamp(20px,2.2vw,30px)] leading-[1.4] text-white/35">
                      A verified customer quotation will sit here, at this size,
                      in this position.
                    </p>
                  </div>
                ))}
                <Hair />
              </div>
            </div>
          </Wide>
        </div>
      </Slab>

      {/* ── 67 · The close, at full scale ──────────────────────────── */}
      <Slab className="overflow-hidden" id="close" data-mark="67">
        <div className={PAD}>
          <Wide>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="relative aspect-[3/4] w-full max-w-[320px]">
                  <Image
                    src="/product/squeeze.png"
                    alt="PECTUS, open"
                    fill
                    sizes="320px"
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <Colossal size="clamp(46px,6.6vw,104px)">ONE JOB.</Colossal>
                <Colossal size="clamp(46px,6.6vw,104px)">DONE WELL.</Colossal>
                <p className="mt-8 text-[15px] uppercase text-ink-2" style={{ letterSpacing: "0.05em" }}>
                  PECTUS · 20ml · <span className="num">£18</span>
                </p>
                <a
                  href="#buy"
                  className="mt-8 inline-flex items-center justify-center bg-ink-0 px-12 py-5 text-[14px] font-semibold uppercase text-paper-0"
                  style={{ letterSpacing: "0.05em" }}
                >
                  Add to bag
                </a>
                <p className="mt-10 max-w-[46ch] text-[12px] leading-[1.7] text-ink-3">
                  Cosmetic use only. Temporary effect. Not a treatment for any
                  medical condition.
                </p>
              </div>
            </div>
          </Wide>
        </div>
      </Slab>
    </>
  );
}
