import { CSSProperties, ReactNode } from "react";

/**
 * COLOSSEUM — the monumental direction's shared kit.
 *
 * The argument this direction makes is the opposite of Atelier's. It says the
 * live site is too polite with the one asset nobody else has: a library of
 * large, beautifully drawn classical figures, currently used at 24% opacity
 * as background wash behind text. Here they are the subject. Full-bleed,
 * cropped hard by the viewport, at a scale where the pencil work is legible.
 *
 * Three devices carry it:
 *
 *   The slab      Sections alternate pure ink and pure paper, edge to edge.
 *                 No container, no margin, no gap. The inversion is what
 *                 makes the white sections read as light rather than empty.
 *   The crop      Display type is set large enough that the viewport cuts it.
 *                 Deliberately: a word you cannot fit is a word that feels
 *                 bigger than the screen.
 *   The bleed     Images run to all four edges. Never a card, never a border,
 *                 never a rounded corner.
 *
 * Colour stays locked. Ink and paper are the whole palette; the contrast comes
 * from how much of each a section uses, not from adding anything.
 */

const INK = "#14130F";
const PAPER = "#FFFFFF";

type SlabProps = {
  children: ReactNode;
  /** Inverted: ink ground, paper type. */
  dark?: boolean;
  className?: string;
  id?: string;
  style?: CSSProperties;
} & Record<`data-${string}`, string | undefined>;

/**
 * A full-width band. Sets `--fg` / `--fg-dim` / `--hairline` so everything
 * inside can be tone-agnostic and the same component can sit on either
 * ground without a `dark` prop threaded through it.
 */
export function Slab({
  children,
  dark = false,
  className = "",
  id,
  style,
  ...rest
}: SlabProps) {
  return (
    <section
      id={id}
      className={`relative ${className}`}
      style={
        {
          background: dark ? INK : PAPER,
          "--fg": dark ? PAPER : INK,
          "--fg-dim": dark ? "rgba(255,255,255,0.62)" : "rgba(20,19,15,0.58)",
          "--hairline": dark
            ? "rgba(255,255,255,0.16)"
            : "rgba(20,19,15,0.14)",
          color: dark ? PAPER : INK,
          ...style,
        } as CSSProperties
      }
      {...rest}
    >
      {children}
    </section>
  );
}

/** Wider than the house container: this direction wants less margin, not more. */
export function Wide({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1560px] px-6 md:px-12 ${className}`}>
      {children}
    </div>
  );
}

/** Vertical rhythm. Tighter than Atelier's: this direction fills, not breathes. */
export const PAD = "py-[clamp(64px,8vw,132px)]";

export function Eyebrow({
  children,
  className = "",
  ...rest
}: {
  children: ReactNode;
  className?: string;
} & Record<`data-${string}`, string | undefined>) {
  return (
    <p
      className={`text-[10px] font-semibold uppercase ${className}`}
      style={{ letterSpacing: "0.05em", color: "var(--fg-dim)" }}
      {...rest}
    >
      {children}
    </p>
  );
}

/**
 * The cropped headline. `bleed` lets a word run past the container so the
 * viewport edge cuts it; the parent must be `overflow-hidden`.
 */
export function Colossal({
  children,
  className = "",
  size = "clamp(52px,12vw,190px)",
  as: Tag = "h2",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  size?: string;
  as?: "h1" | "h2";
} & Record<`data-${string}`, string | undefined>) {
  return (
    <Tag
      className={`serif ${className}`}
      style={{
        fontSize: size,
        lineHeight: 0.86,
        letterSpacing: "-0.02em",
        color: "var(--fg)",
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** The grotesque counterpart, for section heads inside a slab. */
export function Stack({
  children,
  className = "",
  size = "clamp(30px,4.6vw,68px)",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  size?: string;
} & Record<`data-${string}`, string | undefined>) {
  return (
    <h3
      className={`font-bold uppercase ${className}`}
      style={{
        fontSize: size,
        lineHeight: 0.94,
        letterSpacing: "-0.028em",
        color: "var(--fg)",
      }}
      {...rest}
    >
      {children}
    </h3>
  );
}

export function Body({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`max-w-[50ch] text-[16px] leading-[1.66] ${className}`}
      style={{ color: "var(--fg-dim)" }}
    >
      {children}
    </p>
  );
}

export function Hair({ className = "" }: { className?: string }) {
  return (
    <hr
      className={`border-0 border-t ${className}`}
      style={{ borderColor: "var(--hairline)" }}
    />
  );
}
