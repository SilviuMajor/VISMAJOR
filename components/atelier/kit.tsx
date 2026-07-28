import { ReactNode } from "react";

/**
 * ATELIER — the quiet direction's shared kit.
 *
 * The argument this direction makes is that the live site shouts, and that
 * shouting is what stops it reading as expensive. So every value here is
 * deliberately smaller than its equivalent on the live site:
 *
 *   display type   120px+ -> 64px max
 *   caps tracking  0.22em -> 0.12em (0.34em -> 0.18em for the loose variant)
 *   body           15.5px -> 16.5px, and one size instead of the eleven
 *                  currently in use across these three pages
 *   section rhythm ad hoc -> a single vertical unit, everywhere
 *
 * The space that buys back is the point. Nothing is pinned, nothing parallaxes
 * and nothing waits for a scroll to appear.
 *
 * Colour stays locked: ink on paper. The one tonal band is --metal-50, which
 * is already in the palette, rather than a new warm paper (--paper-1 is
 * currently identical to --paper-0, so every "raised" band on the live site is
 * invisible).
 */

export const BAND = "#ECEDEC"; // --metal-50, the only non-white surface

/** One vertical rhythm for the whole direction. */
const PAD = "py-[clamp(76px,11vw,168px)]";

export function Section({
  children,
  className = "",
  band = false,
  id,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  band?: boolean;
  id?: string;
} & Record<`data-${string}`, string | undefined>) {
  return (
    <section
      id={id}
      className={`${PAD} ${className}`}
      style={band ? { background: BAND } : undefined}
      {...rest}
    >
      {children}
    </section>
  );
}

/** Narrower than the house 1200px: long measures are what make type feel cheap. */
export function Frame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1100px] px-6 md:px-12 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[10px] font-semibold uppercase text-ink-2 ${className}`}
      style={{ letterSpacing: "0.06em" }}
    >
      {children}
    </p>
  );
}

/** Cinzel, but restrained. The cap is 64px, not the live site's 120px+. */
export function Display({
  children,
  className = "",
  size = "clamp(34px,4.6vw,64px)",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  size?: string;
} & Record<`data-${string}`, string | undefined>) {
  return (
    <h1
      className={`serif text-ink-0 ${className}`}
      style={{ fontSize: size, lineHeight: 1.06, letterSpacing: "0.01em" }}
      {...rest}
    >
      {children}
    </h1>
  );
}

export function Head({
  children,
  className = "",
  as: Tag = "h2",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: "h2" | "h3";
} & Record<`data-${string}`, string | undefined>) {
  return (
    <Tag
      className={`serif text-ink-0 ${className}`}
      style={{
        fontSize: "clamp(24px,2.9vw,38px)",
        lineHeight: 1.12,
        letterSpacing: "0.01em",
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** One body size, one measure. */
export function Body({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`max-w-[54ch] text-[16.5px] leading-[1.72] text-ink-1 ${className}`}
    >
      {children}
    </p>
  );
}

/**
 * The device that carries this direction: a note hung in the left margin,
 * set small and in caps, the way a scholarly edition annotates a text. It is
 * how Atelier gets to keep detail (ingredient names, quantities, provenance)
 * without putting it in the reading line and bloating the page.
 *
 * Below `lg` it stacks above the passage it annotates, where it reads as a
 * conventional eyebrow, so nothing is lost on mobile.
 */
export function Margin({
  note,
  children,
  className = "",
  ...rest
}: {
  note: ReactNode;
  children: ReactNode;
  className?: string;
} & Record<`data-${string}`, string | undefined>) {
  return (
    <div
      className={`grid grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-10 ${className}`}
      {...rest}
    >
      <div className="lg:col-span-3 lg:pt-[5px]">
        <p
          className="text-[10px] font-semibold uppercase leading-[1.7] text-ink-3"
          style={{ letterSpacing: "0.05em" }}
        >
          {note}
        </p>
      </div>
      <div className="lg:col-span-8 lg:col-start-5">{children}</div>
    </div>
  );
}

export function Rule({ className = "" }: { className?: string }) {
  return (
    <hr
      className={`border-0 border-t ${className}`}
      style={{ borderColor: "var(--hair)" }}
    />
  );
}

/** Small caps figure, for prices and quantities. */
export function Num({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`num tabular-nums ${className}`}>{children}</span>;
}
