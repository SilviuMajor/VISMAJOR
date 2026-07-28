"use client";

import Image from "next/image";
import { useState } from "react";
import { AddToBag, type Tier } from "@/components/renditions/AddToBag";
import { ShotPlaceholder } from "@/components/renditions/ShotPlaceholder";

/**
 * The buy section, kept where it is on the page but stripped back.
 *
 * What went: the quantity stepper and the spec tab strip that switched the
 * photo and the copy together. Two multipliers on one decision is one too
 * many, and quantity is a thing people expect to change in the bag rather
 * than before it.
 *
 * What stayed: a full size selector, because a second buy point that cannot
 * complete the purchase is a second buy point that sends you travelling. And
 * the gallery got bigger, because this is the one place on the page where the
 * product itself is the subject.
 */
export function BuyPanel({
  id = "buy",
  eyebrow,
  heading,
  line,
  gallery,
  tiers,
  defaultTier,
  product,
  productName,
  cartPrefix,
  spec,
}: {
  id?: string;
  eyebrow: string;
  heading: string;
  line: string;
  /** `src: null` renders a marked shot brief instead of a photograph. */
  gallery: { src: string | null; label: string; brief?: string }[];
  tiers: Tier[];
  defaultTier?: string;
  product: "pectus" | "stone" | "sculpt" | "steel";
  productName: string;
  cartPrefix: string;
  spec: { k: string; v: string }[];
}) {
  const [shot, setShot] = useState(0);

  return (
    <section
      id={id}
      className="scroll-mt-[92px] bg-paper-0 py-[clamp(56px,7vw,110px)]"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* the product, given the room it never gets */}
          <div className="lg:col-span-7">
            <div
              className="relative aspect-[4/5] w-full border sm:aspect-[5/4]"
              style={{ borderColor: "var(--hair)" }}
            >
              {gallery[shot].src ? (
                <Image
                  src={gallery[shot].src as string}
                  alt={`${productName} · ${gallery[shot].label}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain p-8 sm:p-12"
                />
              ) : (
                <ShotPlaceholder
                  brief={gallery[shot].brief ?? gallery[shot].label}
                  className="absolute inset-8 sm:inset-12"
                />
              )}
              <p
                className="absolute bottom-4 left-5 font-mono text-[10px] uppercase text-ink-3"
                style={{ letterSpacing: "0.05em" }}
              >
                {gallery[shot].label}
              </p>
            </div>

            <div className="mt-3 flex gap-3">
              {gallery.map((g, i) => (
                <button
                  key={g.label}
                  type="button"
                  onClick={() => setShot(i)}
                  aria-label={`View ${g.label}`}
                  aria-pressed={i === shot}
                  className="relative h-[74px] w-[64px] border transition-colors"
                  style={{
                    borderColor:
                      i === shot ? "var(--ink-0)" : "var(--hair)",
                  }}
                >
                  {g.src ? (
                    <Image src={g.src} alt="" fill sizes="64px" className="object-contain p-2" />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center font-mono text-[8px] uppercase text-ink-3">TBC</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* the offer, simplified */}
          <div className="lg:col-span-5">
            <p
              className="text-[10px] font-semibold uppercase text-ink-2"
              style={{ letterSpacing: "0.06em" }}
            >
              {eyebrow}
            </p>
            <h2
              className="serif mt-4 text-ink-0"
              style={{
                fontSize: "clamp(28px,3.2vw,44px)",
                lineHeight: 1.1,
                letterSpacing: "0.01em",
              }}
            >
              {heading}
            </h2>
            <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.66] text-ink-1">
              {line}
            </p>

            <AddToBag
              className="mt-8"
              product={product}
              productName={productName}
              cartPrefix={cartPrefix}
              tiers={tiers}
              defaultTier={defaultTier}
            />

            <dl className="mt-9">
              {spec.map((s) => (
                <div
                  key={s.k}
                  className="flex items-baseline justify-between gap-6 border-t py-3"
                  style={{ borderColor: "var(--hair)" }}
                >
                  <dt
                    className="text-[10.5px] font-semibold uppercase text-ink-3"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    {s.k}
                  </dt>
                  <dd className="text-right text-[13.5px] text-ink-1">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
