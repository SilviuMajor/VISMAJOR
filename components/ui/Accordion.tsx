"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";

export type AccordionEntry = {
  q: ReactNode;
  a: ReactNode;
  index?: string;
};

export function Accordion({
  items,
  defaultOpen = -1,
}: {
  items: AccordionEntry[];
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <ul className="border-t" style={{ borderColor: "var(--hair-strong)" }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={i} className="border-b" style={{ borderColor: "var(--hair)" }}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-start justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="flex items-baseline gap-5">
                {item.index && (
                  <span className="caps text-[11px] font-semibold text-ink-3">
                    {item.index}
                  </span>
                )}
                <span className="caps text-[16px] font-semibold text-ink-0 md:text-[18px]">
                  {item.q}
                </span>
              </span>
              <motion.span
                aria-hidden
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                className="mt-0.5 text-xl leading-none text-ink-0"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-7 pl-[3rem] pr-8">
                    <p className="max-w-2xl text-[16.5px] leading-[1.7] text-ink-1">
                      {item.a}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
