import Image from "next/image";

export type ToolKey = "sword" | "axe" | "dagger";

// Real product shots (background knocked out to transparent). Rendered with
// `fill` + object-contain so each tool fits whatever box the caller gives it.
const META: Record<ToolKey, { src: string; alt: string }> = {
  sword: { src: "/product/steel-sword.png", alt: "STEEL — The Sword" },
  axe: { src: "/product/steel-axe.png", alt: "STEEL — The Axe" },
  dagger: { src: "/product/steel-dagger.png", alt: "STEEL — The Dagger" },
};

/** Drop inside a `relative` container with a defined size. */
export function ToolPhoto({
  tool,
  className = "",
  sizes = "300px",
  priority = false,
}: {
  tool: ToolKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const m = META[tool];
  return (
    <Image
      src={m.src}
      alt={m.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-contain ${className}`}
    />
  );
}
