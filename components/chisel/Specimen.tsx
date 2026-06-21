import { ReactNode } from "react";

/**
 * The house "specimen" frame — a bordered card with an inner keyline and
 * corner read-outs, exactly the GY-NO! treatment (StickyArchitecture / StickyBuy
 * / IngredientsV2). Until real CHISEL photography exists, the centre holds
 * line-art or a labelled placeholder. The frame must read as deliberate and
 * premium, never as a broken image.
 */
export function Specimen({
  children,
  topLeft = "CHISEL / 002",
  topRight,
  bottomLeft,
  bottomRight,
  className = "",
  innerClassName = "",
  ratio,
}: {
  children: ReactNode;
  topLeft?: string;
  topRight?: ReactNode;
  bottomLeft?: ReactNode;
  bottomRight?: ReactNode;
  className?: string;
  innerClassName?: string;
  /** Optional aspect ratio, e.g. "4 / 5". When omitted, the panel sizes to content. */
  ratio?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden border bg-paper-2 ${className}`}
      style={{ borderColor: "var(--hair)" }}
    >
      {/* inner keyline frame */}
      <div
        className="pointer-events-none absolute inset-3 z-30 border"
        style={{ borderColor: "var(--hair-strong)" }}
        aria-hidden
      />

      {/* corner read-outs */}
      {topLeft && (
        <span className="absolute left-5 top-4 z-40 caps text-[9px] font-medium text-ink-3">
          {topLeft}
        </span>
      )}
      {topRight && (
        <span className="absolute right-5 top-4 z-40 caps text-[9px] font-medium text-ink-3">
          {topRight}
        </span>
      )}
      {bottomLeft && (
        <span className="absolute bottom-4 left-5 z-40 caps text-[9px] font-medium text-ink-3">
          {bottomLeft}
        </span>
      )}
      {bottomRight && (
        <span className="absolute bottom-4 right-5 z-40 caps text-[9px] font-medium text-ink-3">
          {bottomRight}
        </span>
      )}

      <div
        className={`relative z-10 flex items-center justify-center ${innerClassName}`}
        style={ratio ? { aspectRatio: ratio } : undefined}
      >
        {children}
      </div>
    </div>
  );
}

/** A faint "photography drops in here" watermark for empty placeholder centres. */
export function PlaceholderNote({ children }: { children: ReactNode }) {
  return (
    <span className="caps text-[9px] font-medium text-ink-3/70">{children}</span>
  );
}
