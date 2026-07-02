import Image from "next/image";

/**
 * A faint classical figure sat behind a section — greyscale `mix-blend-multiply`
 * on white, anchored to one side and masked so it fades toward the copy. Drop it
 * as the first child of a `relative overflow-hidden` <section>, with the section's
 * content in a `relative z-10` wrapper so it sits on top.
 */
export function RomanBehind({
  figure,
  side = "right",
  opacity = 0.22,
  className = "",
}: {
  figure: string;
  side?: "left" | "right";
  opacity?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute bottom-0 z-0 hidden aspect-[3/4] w-[34vw] max-w-[460px] sm:block lg:w-[26vw] ${
        side === "right" ? "right-[-6%]" : "left-[-6%]"
      } ${className}`}
      style={{
        maskImage: `linear-gradient(to ${side === "right" ? "left" : "right"}, #000 30%, transparent 94%)`,
        WebkitMaskImage: `linear-gradient(to ${side === "right" ? "left" : "right"}, #000 30%, transparent 94%)`,
      }}
    >
      <Image
        src={figure}
        alt=""
        fill
        sizes="(max-width: 640px) 40vw, 28vw"
        className="object-contain object-bottom mix-blend-multiply"
        style={{ opacity }}
      />
    </div>
  );
}
