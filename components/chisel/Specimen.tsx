import { ReactNode } from "react";

/**
 * The house "specimen" — the product floats open on the page, with the small
 * corner read-outs kept as editorial spec annotations (text-as-frame). No box:
 * the old bordered card + inner keyline read as templated, so it's gone.
 */
export function Specimen({
  children,
  topLeft = "SCULPT / 002",
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
  /** Optional aspect ratio, e.g. "4 / 5". When omitted, sizes to content. */
  ratio?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* corner read-outs — annotations, not a frame */}
      {topLeft && (
        <span className="absolute left-0.5 top-0 z-40 caps text-[9px] font-medium text-ink-3">
          {topLeft}
        </span>
      )}
      {topRight && (
        <span className="absolute right-0.5 top-0 z-40 caps text-[9px] font-medium text-ink-3">
          {topRight}
        </span>
      )}
      {bottomLeft && (
        <span className="absolute bottom-0 left-0.5 z-40 caps text-[9px] font-medium text-ink-3">
          {bottomLeft}
        </span>
      )}
      {bottomRight && (
        <span className="absolute bottom-0 right-0.5 z-40 caps text-[9px] font-medium text-ink-3">
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
