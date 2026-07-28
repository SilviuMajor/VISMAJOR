import Image from "next/image";
import { Body, Colossal, Eyebrow, Hair, PAD, Slab, Stack, Wide } from "./kit";
import { AddToBag } from "@/components/renditions/AddToBag";
import { INGREDIENTS, INGREDIENT_IMG } from "@/lib/ingredients";

const TIERS = [
  { key: "1", label: "One jar", unit: "100ml", price: 22 },
  { key: "2", label: "Large jar", unit: "200ml", price: 38, note: "Most chosen" },
  { key: "3", label: "Two jars", unit: "2 x 100ml", price: 40, note: "Save £4" },
];

const STEPS = [
  { n: "01", t: "WET", b: "Warm water, a ten-pence amount, worked between wet palms until it turns to a light grey slip." },
  { n: "02", t: "WORK", b: "Twenty seconds across the face. The clay does the drawing, so there is nothing to scrub." },
  { n: "03", t: "RINSE", b: "Cool water, pat dry. Clean and matte, with none of the tightness a foaming wash leaves." },
];

export function ColosseumStone() {
  const formula = INGREDIENTS.stone;

  return (
    <>
      {/* ── 75 · The same hard split, mirrored ─────────────────────── */}
      <section id="buy" className="grid grid-cols-1 lg:grid-cols-2" data-mark="75">
        <div className="relative order-1 min-h-[58vh] bg-white lg:min-h-[calc(100vh-74px)]">
          <Image
            src="/men/stone-wash.png"
            alt="A figure washing at a basin, drawn"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain object-bottom p-8"
          />
          <div className="absolute bottom-8 right-8 h-[150px] w-[80px] md:h-[200px] md:w-[104px]">
            <Image
              src="/product/angle.png"
              alt="STONE, 100ml"
              fill
              priority
              sizes="104px"
              className="object-contain drop-shadow-[0_20px_40px_rgba(20,19,15,0.28)]"
            />
          </div>
        </div>

        <div
          className="order-2 flex items-center bg-[#14130F] px-6 py-20 md:px-14 lg:min-h-[calc(100vh-74px)] lg:py-16"
          style={{ ["--fg" as string]: "#fff", ["--fg-dim" as string]: "rgba(255,255,255,0.62)" }}
        >
          <div className="w-full max-w-[480px]">
            <p
              className="text-[10px] font-semibold uppercase text-white/55"
              style={{ letterSpacing: "0.05em" }}
            >
              Vis Major · No. II
            </p>
            <h1
              className="serif mt-4 text-white"
              style={{
                fontSize: "clamp(54px,7.4vw,116px)",
                lineHeight: 0.88,
                letterSpacing: "-0.02em",
              }}
              data-mark="76"
              data-mark-tone="dark"
            >
              STONE
            </h1>
            <p
              className="mt-4 text-[12px] font-semibold uppercase text-white/70"
              style={{ letterSpacing: "0.05em" }}
            >
              Matte Cleanser · 100ml
            </p>

            <p className="mt-8 max-w-[42ch] text-[17px] leading-[1.6] text-white/75">
              Clay, charcoal and mint. Lifts the day off, rinses clean, and
              leaves the skin matte rather than tight.
            </p>

            <AddToBag
              className="mt-9"
              product="stone"
              productName="STONE"
              cartPrefix="sharp"
              tiers={TIERS}
              defaultTier="2"
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
      </section>

      {/* ── 77 · A headline the viewport cannot hold ───────────────── */}
      <Slab className="overflow-hidden" data-mark="77">
        <div className={PAD}>
          <Wide>
            <Eyebrow>The proposition</Eyebrow>
          </Wide>
          <div className="mt-8 whitespace-nowrap pl-6 md:pl-12">
            <Colossal size="clamp(56px,14vw,240px)">
              TAKE THE DAY OFF YOUR FACE
            </Colossal>
          </div>
          <Wide className="mt-10">
            <Body className="text-[18px]">
              A cleanser has one job: remove what the day put there, and leave
              everything else alone. Clay draws out the oil, charcoal lifts the
              grime, mint finishes cool.
            </Body>
          </Wide>
        </div>
      </Slab>

      {/* ── 78 · A scene at full bleed ────────────────────────────── */}
      <section
        className="relative h-[46vh] min-h-[300px] w-full overflow-hidden md:h-[62vh]"
        data-mark="78"
      >
        <Image
          src="/scenes/stone.png"
          alt="A figure at a marble basin, drawn"
          fill
          sizes="100vw"
          className="object-cover object-[62%_38%]"
        />
        <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-white/85 via-transparent to-transparent pb-10">
          <p className="serif px-6 text-center text-[clamp(18px,2.4vw,32px)] italic text-ink-0">
            Tabula rasa
          </p>
        </div>
      </section>

      {/* ── 79 · The method, three ink panels ─────────────────────── */}
      <Slab dark data-mark="79">
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

      {/* ── 80 · Three actives, drawn large ───────────────────────── */}
      <Slab data-mark="80">
        <div className={PAD}>
          <Wide>
            <Eyebrow>The formula</Eyebrow>
            <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
              {formula.heroes.map((h) => (
                <div key={h.name} className="flex flex-col">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={INGREDIENT_IMG[h.name]}
                      alt={`${h.name}, drawn`}
                      fill
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="melt object-contain"
                    />
                  </div>
                  <Stack className="mt-8" size="clamp(28px,3.2vw,48px)">
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

      {/* ── 81 · Proof, honest ────────────────────────────────────── */}
      <Slab dark data-mark="81">
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

      {/* ── 82 · Close ───────────────────────────────────────────── */}
      <Slab className="overflow-hidden" data-mark="82">
        <div className={PAD}>
          <Wide>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="relative aspect-[3/4] w-full max-w-[300px]">
                  <Image
                    src="/men/stone-finish.png"
                    alt="A figure at rest after washing, drawn"
                    fill
                    sizes="300px"
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <Colossal size="clamp(46px,6.6vw,104px)">TABULA</Colossal>
                <Colossal size="clamp(46px,6.6vw,104px)">RASA.</Colossal>
                <p
                  className="mt-8 text-[15px] uppercase text-ink-2"
                  style={{ letterSpacing: "0.05em" }}
                >
                  STONE · 100ml · <span className="num">£22</span>
                </p>
                <a
                  href="#buy"
                  className="mt-8 inline-flex items-center justify-center bg-ink-0 px-12 py-5 text-[14px] font-semibold uppercase text-paper-0"
                  style={{ letterSpacing: "0.05em" }}
                >
                  Add to bag
                </a>
                <p className="mt-10 max-w-[46ch] text-[12px] leading-[1.7] text-ink-3">
                  Cosmetic use only. For external use. Avoid the eye area.
                </p>
              </div>
            </div>
          </Wide>
        </div>
      </Slab>
    </>
  );
}
