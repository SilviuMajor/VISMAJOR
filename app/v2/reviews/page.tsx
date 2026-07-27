import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Header } from "@/components/nav/Header";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "V2 · Reviews",
  robots: { index: false, follow: false },
};

/**
 * CHANGE 11 — the review system the site does not have.
 *
 * Everything below is STRUCTURE, not content. The numbers and quotes are
 * deliberately marked as placeholders, because inventing reviews is both the
 * thing this page exists to replace and, since the Digital Markets, Competition
 * and Consumers Act 2024, illegal in the UK.
 */

const DISTRIBUTION = [
  { stars: 5, pct: 0 },
  { stars: 4, pct: 0 },
  { stars: 3, pct: 0 },
  { stars: 2, pct: 0 },
  { stars: 1, pct: 0 },
];

export default function ReviewsV2() {
  return (
    <>
      <Header />
      <main className="bg-paper-0 py-16 md:py-24">
        <Container>
          <Link href="/v2" className="caps text-[10px] font-semibold text-ink-3 hover:text-ink-0">
            ← V2 index
          </Link>

          <div className="mt-8 flex items-center gap-3.5">
            <span className="h-px w-7 bg-[var(--hair-strong)]" />
            <span className="caps-loose text-[11px] font-medium text-ink-2">
              Change 11 · The biggest gap on the site
            </span>
          </div>

          <h1
            className="mt-5 max-w-3xl font-bold uppercase text-ink-0"
            style={{ fontSize: "clamp(30px, 4.6vw, 62px)", letterSpacing: "-0.03em", lineHeight: 0.98 }}
          >
            Reviews
          </h1>

          <div
            className="mt-8 max-w-2xl border-l-2 px-5 py-4"
            style={{ borderColor: "var(--ink-0)", background: "rgba(20,19,15,0.03)" }}
          >
            <div className="caps text-[9.5px] font-semibold text-ink-0">
              This page is scaffolding, not content
            </div>
            <p className="mt-2 text-[13.5px] leading-[1.55] text-ink-2">
              The layout below is what a review page should look like. The
              numbers are zero and the quotes are absent on purpose. Fabricated
              reviews are illegal in the UK under the Digital Markets,
              Competition and Consumers Act 2024, and the invented testimonials
              currently live on the product pages (change 12) are exactly what
              this replaces.
            </p>
          </div>

          {/* summary */}
          <div
            className="mt-14 grid grid-cols-1 gap-10 border-t pt-10 md:grid-cols-[auto_1fr] md:gap-16"
            style={{ borderColor: "var(--hair-strong)" }}
          >
            <div>
              <div className="num font-bold text-ink-0" style={{ fontSize: 64, lineHeight: 1 }}>
                &mdash;
              </div>
              <div aria-hidden className="mt-3 text-[15px] tracking-[0.2em] text-ink-3">
                ☆☆☆☆☆
              </div>
              <div className="caps mt-3 text-[10px] font-semibold text-ink-3">
                No reviews yet
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {DISTRIBUTION.map((d) => (
                <div key={d.stars} className="flex items-center gap-4">
                  <span className="caps w-10 shrink-0 text-[10px] font-semibold text-ink-3">
                    {d.stars} star
                  </span>
                  <span className="h-1.5 flex-1 overflow-hidden" style={{ background: "var(--hair)" }}>
                    <span className="block h-full bg-ink-0" style={{ width: `${d.pct}%` }} />
                  </span>
                  <span className="num w-10 shrink-0 text-right text-[11px] text-ink-3">
                    {d.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* how to get there */}
          <h2 className="caps-loose mt-16 text-[11px] font-semibold text-ink-2">
            How to fill this page legitimately
          </h2>
          <ol className="mt-6 flex max-w-2xl flex-col gap-5">
            {[
              [
                "Pick a platform that verifies purchases",
                "Judge.me, Reviews.io or Trustpilot all work on a custom Next.js build and can emit review schema. Verified-purchase badges are the point: they are what makes the rating credible and what keeps you the right side of the law.",
              ],
              [
                "Ask after delivery, not after payment",
                "A request sent once the product has actually been used converts far better than one sent at dispatch. For a topical, that is roughly two weeks.",
              ],
              [
                "You may incentivise, but you must disclose",
                "Offering a discount for a review is allowed. Offering it only for a positive review is not, and undisclosed incentives are not. Label gifted or incentivised reviews as such.",
              ],
              [
                "Publish the bad ones",
                "Beardbrand shows its one-star bucket. Every brand reviewed that hid negative reviews looked less credible, not more, and a perfect five is the least believable number on the internet.",
              ],
              [
                "Only then add rating markup",
                "AggregateRating must never be emitted without real, visible reviews on the page, and never on the Organization type. Doing it early risks a manual penalty for the sake of a star that nobody earned.",
              ],
            ].map(([h, b], i) => (
              <li key={h} className="flex gap-5 border-t pt-5" style={{ borderColor: "var(--hair)" }}>
                <span className="num shrink-0 text-[13px] font-bold text-ink-3">
                  {`0${i + 1}`}
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-ink-0">{h}</h3>
                  <p className="mt-2 text-[14.5px] leading-[1.6] text-ink-2">{b}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </main>
      <Footer />
    </>
  );
}
