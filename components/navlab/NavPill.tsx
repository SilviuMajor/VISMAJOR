import { PRODUCTS, CartGlyph } from "@/components/navlab/parts";

/** 04 — Floating pill. A centred, rounded bar that floats over the page.
 *  Modern-luxe. */
export function NavPill() {
  return (
    <div className="flex justify-center px-4 pt-5">
      <div
        className="flex items-center gap-5 rounded-full border border-[var(--hair-strong)] bg-paper-0/85 px-4 py-2 shadow-[0_16px_40px_-24px_rgba(20,19,15,0.4)] backdrop-blur-md md:gap-6 md:pl-6 md:pr-3"
      >
        <a href="#" className="house text-[14px] text-ink-0">VIS·MAJOR</a>
        <span className="hidden h-4 w-px bg-[var(--hair)] md:block" />
        <nav className="hidden items-center gap-5 md:flex">
          {PRODUCTS.map((p) => (
            <a key={p} href="#" className="caps text-[10.5px] font-medium text-ink-3 transition-colors hover:text-ink-0">
              {p}
            </a>
          ))}
        </nav>
        <a href="#" className="rounded-full bg-ink-0 px-4 py-1.5 text-[11px] font-semibold text-paper-0 transition-colors hover:bg-ink-1">
          Pre-order
        </a>
        <CartGlyph className="text-ink-0" />
      </div>
    </div>
  );
}
