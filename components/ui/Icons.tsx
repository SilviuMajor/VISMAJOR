/**
 * Thin-line functional icons. 1.5px stroke, mono ink, no fill — matching the
 * design system's geometric line language. Used only on the feature row.
 */
type IconProps = { size?: number; className?: string };

const base = (size: number, className: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 48 48",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className,
  "aria-hidden": true,
});

export function ShieldIcon({ size = 40, className = "" }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M24 5 L40 11 V23 C40 33 33 40 24 43 C15 40 8 33 8 23 V11 Z" />
      <path d="M24 17 V31 M17 24 H31" />
    </svg>
  );
}

export function CoolingIcon({ size = 40, className = "" }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M24 5 V43 M5 24 H43 M11 11 L37 37 M37 11 L11 37" />
      <path d="M24 5 L20 10 M24 5 L28 10 M24 43 L20 38 M24 43 L28 38" />
      <path d="M5 24 L10 20 M5 24 L10 28 M43 24 L38 20 M43 24 L38 28" />
    </svg>
  );
}

export function DropletIcon({ size = 40, className = "" }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M24 6 C24 6 36 19 36 28 A12 12 0 0 1 12 28 C12 19 24 6 24 6 Z" />
      <path d="M19 29 A5 5 0 0 0 24 34" />
    </svg>
  );
}

export function ShirtIcon({ size = 40, className = "" }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M18 7 L24 12 L30 7 L40 13 L36 20 L32 18 V41 H16 V18 L12 20 L8 13 Z" />
      <path d="M18 7 C18 11 30 11 30 7" />
    </svg>
  );
}
