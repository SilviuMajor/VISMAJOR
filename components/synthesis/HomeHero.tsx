import Image from "next/image";

/**
 * Atelier's home hero, imported whole.
 *
 * The wordmark set at 66px rather than filling the screen, one line under it,
 * and the villa given a 16:9 plate of its own with a Courier caption. The
 * drawing is padded onto the page rather than cropped to fill it, which is how
 * the Folio Society handles every illustration it publishes: a cropped drawing
 * reads as a badly handled photograph, a padded one reads as a plate in a book.
 *
 * No mouse tracking, no scroll-driven scene. It is still when you arrive.
 */
export function HomeHero() {
  return (
    <section className="bg-paper-0 pt-16 md:pt-24" data-mark="101">
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-12">
        <div className="mx-auto max-w-[640px] text-center">
          <p
            className="text-[10px] font-semibold uppercase text-ink-2"
            style={{ letterSpacing: "0.06em" }}
          >
            Performance topicals for men · London
          </p>
          <h1
            className="serif mt-6 text-ink-0"
            style={{
              fontSize: "clamp(38px,5vw,66px)",
              lineHeight: 1.06,
              letterSpacing: "0.01em",
            }}
            data-mark="102"
          >
            VIS&middot;MAJOR
          </h1>
          <p className="mx-auto mt-6 max-w-[54ch] text-[16.5px] leading-[1.72] text-ink-1">
            A small house of precision topicals. Each one engineered to do
            exactly one thing, and to stop when it is done.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-14 w-full max-w-[1100px] px-6 md:px-12">
        <div className="relative aspect-[16/9] w-full" data-mark="103">
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
        >
          Pl. I &mdash; The house, graphite on paper
        </p>
      </div>
    </section>
  );
}
