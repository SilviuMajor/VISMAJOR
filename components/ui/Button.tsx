import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

/**
 * The three CTA treatments. Everything the site clicks on is one of these —
 * there is no fourth. Anything that needs to look different is a layout
 * concern (width, margin) and goes through `className`, never a new size.
 *
 *   primary   — solid ink slab. One per view, the thing we want pressed.
 *   secondary — outline. The alternative route.
 *   link      — caps text link. Tertiary, sits under the pair.
 */
export type ButtonVariant = "primary" | "secondary" | "link";

/**
 * `ink` is the default (dark control on paper). `inverse` is the same control
 * flipped for the ink-black bands — solid paper slab, outline in paper.
 */
export type ButtonTone = "ink" | "inverse";

/**
 * Two steps, not ten.
 *
 *   md — the canonical CTA. px-9 py-[18px] text-[13px] was already the single
 *        most common geometry in the codebase, so adopting it moves the fewest
 *        buttons.
 *   sm — reserved for the fixed chrome that cannot grow: the mobile sticky buy
 *        bar and the header. Using `md` there would change the bar's height.
 */
export type ButtonSize = "md" | "sm";

/** Shared shell. `border` is on the solid variant too — the 1px was present on
 *  most primaries already, and keeping it means primary and secondary occupy
 *  exactly the same box, so swapping one for the other never shifts layout. */
const BASE =
  "inline-flex items-center justify-center gap-2.5 rounded-sm font-semibold transition-colors";

const SIZES: Record<ButtonSize, string> = {
  md: "px-9 py-[18px] text-[13px]",
  sm: "px-5 py-3 text-[13px]",
};

const SOLID: Record<ButtonTone, string> = {
  ink: "border border-ink-0 bg-ink-0 text-paper-0 hover:bg-ink-1",
  inverse:
    "border border-paper-0 bg-paper-0 text-ink-0 hover:bg-transparent hover:text-paper-0",
};

const OUTLINE: Record<ButtonTone, string> = {
  ink: "border border-ink-0 text-ink-0 hover:bg-ink-0 hover:text-paper-0",
  inverse: "border border-paper-0 text-paper-0 hover:bg-paper-0 hover:text-ink-0",
};

const LINK: Record<ButtonTone, string> = {
  ink: "caps text-[11px] font-semibold text-ink-2 underline-offset-4 transition-colors hover:text-ink-0 hover:underline",
  inverse:
    "caps text-[11px] font-semibold text-paper-0/60 underline-offset-4 transition-colors hover:text-paper-0 hover:underline",
};

export type ButtonLook = {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  className?: string;
};

/**
 * The class string on its own, for the handful of call sites that must render
 * something other than `<a>`/`<button>` — next/link `Link`, framer `motion.a`,
 * the magnetic hero CTA.
 */
export function buttonClass({
  variant = "primary",
  tone = "ink",
  size = "md",
  className = "",
}: ButtonLook = {}): string {
  if (variant === "link") {
    return [LINK[tone], className].filter(Boolean).join(" ");
  }
  const look = variant === "primary" ? SOLID[tone] : OUTLINE[tone];
  return [BASE, SIZES[size], look, className].filter(Boolean).join(" ");
}

type ButtonProps = ButtonLook & {
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

/** A `<button>`. Use for anything that fires JS (add to cart, submit, toggle). */
export function Button({
  variant,
  tone,
  size,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClass({ variant, tone, size, className })}
      {...rest}
    >
      {children}
    </button>
  );
}

type ButtonLinkProps = ButtonLook & {
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className">;

/** An `<a>`. Use for anchors and outbound hrefs. */
export function ButtonLink({
  variant,
  tone,
  size,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a className={buttonClass({ variant, tone, size, className })} {...rest}>
      {children}
    </a>
  );
}
