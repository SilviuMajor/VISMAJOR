"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function StickyBuyBar({ priceFrom }: { priceFrom: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const buy = document.getElementById("buy");
      const trigger = window.innerHeight * 0.9;
      const buyTop = buy?.getBoundingClientRect().top ?? Infinity;
      const buyBottom = buy?.getBoundingClientRect().bottom ?? -Infinity;
      setShow(
        window.scrollY > trigger &&
          !(buyTop < window.innerHeight && buyBottom > 0)
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
          className="fixed inset-x-0 bottom-0 z-20 border-t bg-paper-0/95 backdrop-blur md:hidden"
          style={{ borderColor: "var(--hair)" }}
        >
          <div className="flex items-center justify-between gap-4 px-5 py-3">
            <div className="flex flex-col">
              <span className="caps text-[9.5px] font-semibold text-ink-3">
                GY-NO! · 20ml
              </span>
              <span className="text-[13px] font-semibold text-ink-0">
                Pre-order from {priceFrom}
              </span>
            </div>
            <a
              href="#buy"
              className="caps inline-flex items-center rounded-sm border border-ink-0 bg-ink-0 px-5 py-3 text-[11px] font-semibold text-paper-0"
            >
              Buy
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
