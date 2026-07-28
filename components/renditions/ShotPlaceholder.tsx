/**
 * A missing photograph, stated as missing.
 *
 * Every render in /public/product is the PECTUS tube. STONE and SCULPT have
 * no product photography at all, which is why the live STONE buy panel draws
 * SVG outlines captioned "photography to follow". Reusing the PECTUS tube for
 * STONE would put the wrong product in front of a buyer, so this block holds
 * the space at the right size and says what needs shooting instead.
 *
 * It is deliberately ugly enough that nobody ships it by accident.
 */
export function ShotPlaceholder({
  brief,
  className = "",
}: {
  brief: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 border border-dashed p-4 text-center ${className}`}
      style={{ borderColor: "var(--hair-strong)", background: "#ECEDEC" }}
    >
      <span
        className="font-mono text-[9px] uppercase text-ink-3"
        style={{ letterSpacing: "0.05em" }}
      >
        Shot required
      </span>
      <span className="max-w-[22ch] text-[11px] leading-[1.45] text-ink-2">
        {brief}
      </span>
    </div>
  );
}
