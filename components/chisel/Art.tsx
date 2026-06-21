"use client";

/**
 * CHISEL line-art primitives. No photography exists yet, so the cream tube and
 * the steel sculpting tool are drawn as premium, technical line-art — the same
 * monochrome register as the rest of the house, with the warm --ember accent
 * used only as a whisper. Everything here is presentational (aria-hidden by the
 * caller) and inherits stroke/fill from CSS variables so it themes cleanly.
 *
 * Coordinate systems are fixed per drawing; callers scale via viewBox.
 */

export const EMBER = "#C16A3C";

/* ── The cream tube ──────────────────────────────────────────────────
   A tall apothecary tube standing on its cap. viewBox 0 0 120 260. */
export function CreamTube({
  className,
  label = "002",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 260"
      className={className}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {/* crimped seam at the top */}
      <path
        d="M40 16 L80 16"
        stroke="var(--ink-0)"
        strokeWidth={2.4}
        strokeLinecap="round"
      />
      <path
        d="M42 16 L44 30 M50 16 L51 30 M60 16 L60 30 M70 16 L69 30 M78 16 L76 30"
        stroke="var(--hair-strong)"
        strokeWidth={1.1}
      />
      {/* body */}
      <path
        d="M34 30 L86 30 L82 222 Q82 234 70 234 L50 234 Q38 234 38 222 Z"
        stroke="var(--ink-0)"
        strokeWidth={1.6}
      />
      {/* cap */}
      <path
        d="M48 234 L72 234 L72 250 Q72 254 68 254 L52 254 Q48 254 48 250 Z"
        stroke="var(--ink-0)"
        strokeWidth={1.6}
        fill="var(--paper-1)"
      />
      {/* label plate */}
      <rect
        x={44}
        y={92}
        width={32}
        height={96}
        rx={1.5}
        stroke="var(--hair-strong)"
        strokeWidth={1}
      />
      {/* wordmark hint on the plate */}
      <path
        d="M52 112 L68 112 M52 120 L64 120"
        stroke="var(--ink-1)"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      {/* index numeral */}
      <text
        x={60}
        y={172}
        textAnchor="middle"
        fontSize={11}
        fontWeight={700}
        letterSpacing="0.12em"
        fill="var(--ink-2)"
      >
        {label}
      </text>
      {/* a single warm contour band — the ember whisper */}
      <path
        d="M38 60 L82 60"
        stroke={EMBER}
        strokeWidth={2.6}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── The steel sculpting tool ────────────────────────────────────────
   A weighted gua-sha / massage bar: a long handle into a contoured paddle
   with a beveled edge. viewBox 0 0 260 120 (lies on its side). */
export function SteelTool({
  className,
  warmth = 0,
}: {
  className?: string;
  /** 0..1 — fades a warm glow along the working edge. */
  warmth?: number;
}) {
  return (
    <svg
      viewBox="0 0 260 120"
      className={className}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <linearGradient id="chisel-steel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--metal-100)" />
          <stop offset="0.5" stopColor="var(--metal-300)" />
          <stop offset="1" stopColor="var(--metal-500)" />
        </linearGradient>
      </defs>

      {/* the body: slim knurled handle → broad contoured paddle */}
      <path
        d="M12 60
           Q12 50 22 49
           L120 41
           Q150 38 178 30
           Q224 18 246 40
           Q258 52 252 70
           Q244 92 206 96
           Q172 100 140 84
           L26 72
           Q12 70 12 60 Z"
        fill="url(#chisel-steel)"
        stroke="var(--ink-0)"
        strokeWidth={1.5}
      />
      {/* beveled working edge (the curve that meets skin) */}
      <path
        d="M178 30 Q224 18 246 40 Q258 52 252 70 Q244 92 206 96"
        stroke="var(--ink-0)"
        strokeWidth={1.5}
        fill="none"
      />
      {/* inner relief line of the paddle */}
      <path
        d="M150 44 Q196 34 232 50 Q244 60 238 74"
        stroke="var(--hair-strong)"
        strokeWidth={1}
        fill="none"
      />
      {/* knurl on the handle */}
      <path
        d="M30 56 L34 67 M40 55 L44 66 M50 54 L54 65 M60 53 L64 64 M70 52 L74 63"
        stroke="var(--metal-600)"
        strokeWidth={1}
        strokeLinecap="round"
        opacity={0.7}
      />
      {/* a steel highlight */}
      <path
        d="M150 48 Q190 39 224 52"
        stroke="var(--paper-0)"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.55}
      />

      {/* warm glow along the working edge — the single sanctioned warm accent */}
      <path
        d="M178 30 Q224 18 246 40 Q258 52 252 70 Q244 92 206 96"
        stroke={EMBER}
        strokeWidth={3.4}
        strokeLinecap="round"
        fill="none"
        style={{ opacity: warmth * 0.9, filter: "blur(0.4px)" }}
      />
    </svg>
  );
}

/* ── A small inline glyph of the tool, for tags / list bullets ─────── */
export function ToolGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M3 13 L13 11 Q20 9 21 13 Q22 17 15 17 L4 15 Q2 15 3 13 Z"
        stroke="currentColor"
        strokeWidth={1.4}
      />
    </svg>
  );
}
