import { ReactNode } from "react";

/**
 * A deliberate, premium photo-free "specimen" frame. STONE ships before any
 * photography exists, so every product surface is a labelled placeholder:
 * an inner keyline frame, corner read-outs ("STONE / 003", a spec), and a
 * tasteful line-art tube rendered in pure CSS/SVG. It should read as an
 * apothecary plate, never as a broken image.
 *
 * `accentIndex` emphasises the corner index in full ink on the rare
 * occasion we want it to land harder here.
 */
export function Specimen({
  children,
  label = "50ml",
  index = "STONE / 003",
  className = "",
  innerClassName = "",
  accentIndex = false,
}: {
  children?: ReactNode;
  label?: ReactNode;
  index?: ReactNode;
  className?: string;
  innerClassName?: string;
  accentIndex?: boolean;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* corner read-outs — annotations, not a frame */}
      <span
        className="absolute left-0.5 top-0 z-40 caps text-[9px] font-medium"
        style={{ color: accentIndex ? "#14130F" : "var(--ink-3)" }}
      >
        {index}
      </span>
      {label != null && (
        <span className="absolute right-0.5 top-0 z-40 caps text-[9px] font-medium text-ink-3">
          {label}
        </span>
      )}
      <div className={`relative ${innerClassName}`}>{children}</div>
    </div>
  );
}

/**
 * Line-art rendering of the STONE jar/tube — a low, wide matte bottle with a
 * flat cap, drawn in hairlines. Stands in for the hero shot. Pure SVG so it
 * scales crisply and respects the monochrome palette. `shine` (0..1) draws a
 * specular streak that the daily mechanic can recede to nothing.
 */
export function SharpBottle({
  className = "",
  shineOpacity = 0,
}: {
  className?: string;
  shineOpacity?: number;
}) {
  return (
    <svg
      viewBox="0 0 200 250"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {/* soft contact shadow */}
      <ellipse cx={100} cy={222} rx={52} ry={6} fill="rgba(20,19,15,0.06)" />

      {/* cap — flat, matte */}
      <g stroke="var(--ink-0)" strokeWidth={1.2} fill="var(--paper-1)">
        <rect x={70} y={44} width={60} height={26} rx={2} />
      </g>
      <line x1={70} y1={70} x2={130} y2={70} stroke="var(--ink-0)" strokeWidth={1.2} />

      {/* body — low, wide jar */}
      <g stroke="var(--ink-0)" strokeWidth={1.4} fill="var(--paper-2)">
        <path d="M58 78 Q58 72 64 72 L136 72 Q142 72 142 78 L142 198 Q142 210 130 210 L70 210 Q58 210 58 198 Z" />
      </g>

      {/* label plate */}
      <g stroke="var(--hair-strong)" strokeWidth={1} fill="none">
        <rect x={68} y={104} width={64} height={84} rx={2} />
      </g>

      {/* wordmark stack on the label */}
      <text
        x={100}
        y={132}
        textAnchor="middle"
        fontSize={15}
        fontWeight={800}
        letterSpacing="1.2"
        fill="var(--ink-0)"
        style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
      >
        STONE
      </text>
      <line x1={80} y1={142} x2={120} y2={142} stroke="var(--hair-strong)" strokeWidth={0.8} />
      <text
        x={100}
        y={158}
        textAnchor="middle"
        fontSize={5.4}
        letterSpacing="1.4"
        fill="var(--ink-2)"
        style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
      >
        MATTE DAILY MOISTURISER
      </text>
      <text
        x={100}
        y={176}
        textAnchor="middle"
        fontSize={5}
        letterSpacing="2"
        fill="var(--ink-3)"
        style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
      >
        50 ML ℮
      </text>

      {/* specular streak — the "shine". Fades as the daily mechanic mattes off. */}
      <g opacity={shineOpacity}>
        <path
          d="M74 84 Q88 80 96 96 L88 200 Q80 200 78 192 Z"
          fill="rgba(255,255,255,0.9)"
        />
        <path
          d="M74 84 Q88 80 96 96 L88 200 Q80 200 78 192 Z"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth={0.5}
        />
      </g>
    </svg>
  );
}
