"use client";

import { useCart } from "@/lib/cart";

/**
 * Header basket control. A minimal stroked bag glyph with the item count.
 * Mono + understated to match the house. Opens the slide-out drawer.
 *
 * `variant="desktop"` is a compact icon button sitting next to the Pre-order
 * CTA; `variant="mobile"` is a full-width row inside the mobile menu.
 */
export function CartButton({
  variant = "desktop",
}: {
  variant?: "desktop" | "mobile";
}) {
  const { count, setOpen } = useCart();

  const Bag = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 8h12l-.8 11.2a1 1 0 0 1-1 .8H7.8a1 1 0 0 1-1-.8L6 8Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </svg>
  );

  if (variant === "mobile") {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="caps mt-4 flex w-full items-center justify-center gap-2 rounded-[5px] border border-[var(--hair-strong)] px-6 py-[14px] text-[13px] font-semibold text-ink-0"
      >
        {Bag}
        <span>Basket{count > 0 ? ` · ${count}` : ""}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={count > 0 ? `Open basket, ${count} item${count === 1 ? "" : "s"}` : "Open basket"}
      className="relative flex h-9 w-9 items-center justify-center text-ink-0 transition-colors hover:text-ink-2"
    >
      {Bag}
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-ink-0 px-1 text-[9px] font-semibold leading-none text-paper-0">
          {count}
        </span>
      )}
    </button>
  );
}
