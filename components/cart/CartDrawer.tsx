"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart";

/**
 * Right-side slide-out basket. Overlays every page (mounted once in the root
 * layout). Hairline dividers between rows — no boxes — to match the house.
 */
export function CartDrawer() {
  const { items, open, subtotal, setOpen, setQty, remove } = useCart();
  const router = useRouter();

  // Lock body scroll + Esc-to-close while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  const checkout = () => {
    setOpen(false);
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          {/* backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            className="absolute inset-0"
            style={{ background: "rgba(20,19,15,0.4)" }}
            aria-hidden
          />

          {/* panel */}
          <motion.aside
            key="cart-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.2, 0, 0, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Basket"
            className="absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-paper-0"
          >
            {/* header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: "1px solid var(--hair)" }}
            >
              <span className="caps text-[12px] font-semibold text-ink-0">Basket</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close basket"
                className="flex h-8 w-8 items-center justify-center text-ink-2 transition-colors hover:text-ink-0"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {/* body */}
            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <p className="text-[16px] font-medium text-ink-0">Your basket is empty.</p>
                <p className="mt-2 max-w-[240px] text-[13px] leading-relaxed text-ink-3">
                  Choose a size on any product page to reserve your pre-order.
                </p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="py-5"
                    style={{ borderBottom: "1px solid var(--hair)" }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="caps text-[12px] font-semibold text-ink-0">
                          {item.productName}
                        </div>
                        <div className="caps mt-1 text-[10px] font-medium text-ink-3">
                          {item.tierLabel}
                        </div>
                      </div>
                      <div className="num text-[15px] font-semibold text-ink-0">
                        £{item.price * item.qty}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      {/* qty stepper */}
                      <div className="flex items-center rounded-[5px] border border-[var(--hair-strong)]">
                        <button
                          type="button"
                          onClick={() => setQty(item.id, item.qty - 1)}
                          className="px-3 py-1.5 text-[13px] font-semibold text-ink-1 hover:text-ink-0"
                          aria-label={`Decrease ${item.productName} quantity`}
                        >
                          −
                        </button>
                        <span className="min-w-[1.75rem] text-center text-[13px] font-semibold text-ink-0">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(item.id, item.qty + 1)}
                          className="px-3 py-1.5 text-[13px] font-semibold text-ink-1 hover:text-ink-0"
                          aria-label={`Increase ${item.productName} quantity`}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        className="caps text-[10px] font-semibold text-ink-3 underline-offset-4 transition-colors hover:text-ink-0 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* footer */}
            {items.length > 0 && (
              <div
                className="px-6 py-5"
                style={{ borderTop: "1px solid var(--hair)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="caps text-[11px] font-semibold text-ink-2">Subtotal</span>
                  <span className="num text-[19px] font-semibold text-ink-0">£{subtotal}</span>
                </div>
                <p className="caps mt-3 text-[9.5px] font-medium leading-relaxed text-ink-3">
                  Pre-order — nothing is charged yet.
                </p>
                <button
                  type="button"
                  onClick={checkout}
                  className="mt-4 w-full rounded-[5px] bg-ink-0 px-6 py-[16px] text-[13px] font-semibold text-paper-0 transition-colors hover:bg-ink-1"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
