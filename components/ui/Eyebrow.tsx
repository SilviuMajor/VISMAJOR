import { ReactNode } from "react";

/**
 * The rule-plus-caps label that opens most sections.
 *
 * There is one weight (`font-medium`) and one rule length (`w-7`). Both were
 * already the majority reading before this was centralised; the hand-rolled
 * copies that used `font-semibold` or `w-8` were drift, not intent — in one
 * case the same label rendered at a different weight on mobile and desktop.
 *
 * Anything that needs to animate wraps this rather than reimplementing it:
 * put the `motion.div` outside and let the eyebrow own its own layout.
 */
export function Eyebrow({
  children,
  center = false,
  light = false,
  className = "",
}: {
  children: ReactNode;
  /** Rule on both sides, centred. For hero and full-bleed centred blocks. */
  center?: boolean;
  /** Light-on-dark variant for the inverted (ink-black) bands. */
  light?: boolean;
  className?: string;
}) {
  const rule = `h-px w-7 ${light ? "bg-paper-0/40" : "bg-[var(--hair-strong)]"}`;
  return (
    <div
      className={`flex items-center gap-3.5 ${center ? "justify-center" : ""} ${className}`.trim()}
    >
      <span className={rule} />
      <span
        className={`caps-loose text-[11px] font-medium ${light ? "text-paper-0/70" : "text-ink-2"}`}
      >
        {children}
      </span>
      {center && <span className={rule} />}
    </div>
  );
}

export function SectionHead({
  n,
  title,
  light = false,
  as: Tag = "h3",
}: {
  n: string;
  title: string;
  /** Light-on-dark variant for inverted (negative-colour) sections. */
  light?: boolean;
  /**
   * Heading level. Defaults to h3, which is what every section on the product
   * pages wants. The doc pages (/help, /legal) put this directly under the page
   * h1, so they pass "h2" to keep the outline in order. Presentation is
   * identical either way.
   */
  as?: "h2" | "h3";
}) {
  return (
    <div className="mb-9 flex items-baseline gap-4">
      <span className={`text-[13px] font-medium ${light ? "text-paper-0/50" : "text-ink-3"}`}>{n}</span>
      <Tag
        className={`m-0 font-semibold tracking-tight ${light ? "text-paper-0" : "text-ink-0"}`}
        style={{ fontSize: "clamp(24px, 3vw, 34px)", letterSpacing: "-0.02em" }}
      >
        {title}
      </Tag>
      <span className={`h-px flex-1 ${light ? "bg-paper-0/25" : "bg-[var(--hair)]"}`} />
    </div>
  );
}
