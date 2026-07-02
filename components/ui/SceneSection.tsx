import { ReactNode } from "react";
import Image from "next/image";

/**
 * MOCK (used on /pectus-scenes) — sits a faint classical scene BEHIND a whole
 * section as a z-0 backdrop, so section content (text, product shots) renders
 * in front of it. `mix-blend-multiply` drops the scene's white paper and leaves
 * the linework over the page. For this to show, the wrapped section must have a
 * transparent root (the opaque `bg-paper` roots were removed — a no-op on the
 * real white pages). pointer-events-none so it never blocks interaction.
 */
export function SceneSection({
  scene,
  opacity = 0.16,
  children,
}: {
  scene: string;
  opacity?: number;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <Image
          src={scene}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center mix-blend-multiply"
          style={{ opacity }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
