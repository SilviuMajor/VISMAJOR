/**
 * A subtle Doric temple front — the house motif behind the VIS·MAJOR mark.
 * Pure line-art so it composites mono; render it at low opacity for a whisper.
 * (Swap for a real temple PNG later by replacing the usage in HouseHero.)
 */
export function Temple({ className }: { className?: string }) {
  const cols = [80, 144, 208, 272, 336, 400];
  const shaftW = 22;
  return (
    <svg
      viewBox="0 0 480 360"
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
      className={className}
    >
      <g stroke="var(--ink-0)" strokeWidth={1.1} strokeLinejoin="round" strokeLinecap="round">
        {/* pediment */}
        <path d="M44 124 L240 26 L436 124" />
        <line x1="44" y1="124" x2="436" y2="124" />
        <path d="M72 124 L240 40 L408 124" strokeWidth={0.6} />
        {/* entablature */}
        <line x1="52" y1="139" x2="428" y2="139" />
        <line x1="58" y1="156" x2="422" y2="156" />
        {/* columns */}
        {cols.map((cx) => (
          <g key={cx}>
            <line x1={cx - shaftW / 2 - 3} y1={156} x2={cx + shaftW / 2 + 3} y2={156} />
            <rect x={cx - shaftW / 2} y={160} width={shaftW} height={130} />
            <line x1={cx - 5} y1={164} x2={cx - 5} y2={286} strokeWidth={0.5} />
            <line x1={cx + 5} y1={164} x2={cx + 5} y2={286} strokeWidth={0.5} />
            <line x1={cx - shaftW / 2 - 3} y1={290} x2={cx + shaftW / 2 + 3} y2={290} />
          </g>
        ))}
        {/* stylobate steps */}
        <rect x="40" y="296" width="400" height="12" />
        <rect x="24" y="308" width="432" height="12" />
        <rect x="8" y="320" width="464" height="12" />
      </g>
    </svg>
  );
}
