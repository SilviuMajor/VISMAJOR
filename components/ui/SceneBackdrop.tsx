import Image from "next/image";

/**
 * A faint classical pencil "scene" sat behind a hero's wordmark. The source art
 * is drawn on white, so `mix-blend-multiply` drops the paper away and leaves
 * only the greyscale linework — an elegant fresco-like backdrop that never
 * fights the H1. Full-bleed, non-interactive, always behind content (z-0).
 */
export function SceneBackdrop({
  src,
  opacity = 0.2,
  position = "object-center",
  veil = true,
  className = "",
}: {
  src: string;
  opacity?: number;
  /** object-position utility, e.g. "object-center" | "object-bottom". */
  position?: string;
  /** soft white centre veil so the wordmark stays legible over busy scenes. */
  veil?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="100vw"
        className={`object-cover ${position} mix-blend-multiply`}
        style={{ opacity }}
      />
      {veil && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 62% 52% at 50% 46%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 68%)",
          }}
        />
      )}
    </div>
  );
}
