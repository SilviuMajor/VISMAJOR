import { ReactNode } from "react";
import Image from "next/image";

/**
 * MOCK ONLY (used on /pectus-scenes) — washes a faint classical scene across a
 * whole section as a `mix-blend-multiply` overlay, so the "a different scene
 * behind every white area" idea can be scoped without editing the shared
 * section components. Multiply leaves black text/dark bands unchanged and only
 * tints the white space; the layer is pointer-events-none so it never blocks
 * interaction. If Silviu likes it, we'd re-do it properly as per-section
 * background art (transparent section roots + a z-0 backdrop).
 */
export function SceneSection({
  scene,
  opacity = 0.1,
  children,
}: {
  scene: string;
  opacity?: number;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-30 overflow-hidden mix-blend-multiply"
        style={{ opacity }}
      >
        <Image
          src={scene}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}
