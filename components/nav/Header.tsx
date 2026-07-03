"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { CartButton } from "@/components/cart/CartButton";

export type NavLink = { href: string; label: string };

// The house product list — identical on every page so the nav never jumps.
// Only the active marker + the page's Pre-order target change per page.
const PRODUCT_NAV: NavLink[] = [
  { href: "/pectus", label: "PECTUS" },
  { href: "/sculpt", label: "SCULPT" },
  { href: "/stone", label: "STONE" },
  { href: "/steel", label: "STEEL" },
];

/**
 * Concept 03 — "Inscription". The mark, a hairline rule and wide-tracked links
 * grouped to the left; a dated right side (Est · MMXXVI), the outlined Pre-order
 * and the basket. Classical, airy. Keeps the real behaviour: sticky, hide on
 * scroll-down, active-marking via `crumb`, the cart drawer, and the mobile menu.
 */
export function Header({
  cta = { href: "#buy", label: "Pre-order" },
  crumb,
}: {
  cta?: { href: string; label: string } | null;
  /** The current product name, e.g. "PECTUS" — marks the active nav item. */
  crumb?: string;
}) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
      if (y > 240 && y > lastY.current) setHidden(true);
      else setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItem = (n: NavLink) => {
    const active = !!crumb && n.label === crumb;
    return (
      <a
        key={n.href}
        href={n.href}
        aria-current={active ? "page" : undefined}
        className={`caps-loose text-[10.5px] font-medium transition-colors ${
          active ? "text-ink-0" : "text-ink-3 hover:text-ink-0"
        }`}
        style={{ letterSpacing: "0.22em" }}
      >
        {n.label}
      </a>
    );
  };

  return (
    <motion.header
      animate={{ y: hidden && !open ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
      className={`sticky top-0 z-40 bg-paper-0 transition-[border-color] duration-200 ${
        scrolled || open ? "border-b border-[var(--hair)]" : "border-b border-transparent"
      }`}
    >
      <Container className="flex h-[78px] items-center justify-between">
        {/* left — mark · hairline rule · wide-tracked links */}
        <div className="flex items-center gap-5">
          <a
            href="/"
            onClick={() => setOpen(false)}
            className="house text-[16px] text-ink-0"
            style={{ letterSpacing: "0.2em" }}
          >
            VIS·MAJOR
          </a>
          <span className="hidden h-5 w-px bg-[var(--hair-strong)] md:block" />
          <nav className="hidden items-center gap-6 md:flex">
            {PRODUCT_NAV.map((n) => navItem(n))}
          </nav>
        </div>

        {/* right — dated · pre-order · basket · (mobile menu) */}
        <div className="flex items-center gap-3 md:gap-5">
          <span
            className="hidden caps-loose text-[10px] font-medium text-ink-3 lg:inline"
            style={{ letterSpacing: "0.22em" }}
          >
            Est · MMXXVI
          </span>
          {cta && (
            <a
              href={cta.href}
              className="hidden items-center rounded-[5px] border border-ink-0 px-4 py-1.5 text-[11px] font-semibold text-ink-0 transition-colors hover:bg-ink-0 hover:text-paper-0 md:inline-flex"
            >
              {cta.label}
            </a>
          )}

          {/* basket — slides out the cart drawer */}
          <CartButton />

          {/* mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative flex h-9 w-9 items-center justify-center md:hidden"
          >
            <span className="relative block h-3 w-5" aria-hidden>
              <motion.span
                animate={{ rotate: open ? 45 : 0, y: open ? 5 : 0 }}
                transition={{ duration: 0.25 }}
                className="absolute left-0 top-0 block h-[1.6px] w-5 bg-ink-0"
              />
              <motion.span
                animate={{ opacity: open ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-1/2 block h-[1.6px] w-5 -translate-y-1/2 bg-ink-0"
              />
              <motion.span
                animate={{ rotate: open ? -45 : 0, y: open ? -5 : 0 }}
                transition={{ duration: 0.25 }}
                className="absolute bottom-0 left-0 block h-[1.6px] w-5 bg-ink-0"
              />
            </span>
          </button>
        </div>
      </Container>

      {/* mobile dropdown menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }}
            className="overflow-hidden bg-paper-0 md:hidden"
          >
            <Container className="pb-5 pt-1">
              <nav className="flex flex-col">
                {PRODUCT_NAV.map((n) => {
                  const active = !!crumb && n.label === crumb;
                  return (
                    <a
                      key={n.href}
                      href={n.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`caps-loose border-t py-4 text-[13px] font-medium transition-colors ${
                        active ? "text-ink-0" : "text-ink-2 hover:text-ink-0"
                      }`}
                      style={{ borderColor: "var(--hair)", letterSpacing: "0.18em" }}
                    >
                      {n.label}
                    </a>
                  );
                })}
              </nav>
              {cta && (
                <a
                  href={cta.href}
                  onClick={() => setOpen(false)}
                  className="mt-4 flex items-center justify-center rounded-[5px] border border-ink-0 bg-ink-0 px-6 py-[14px] text-[13px] font-semibold text-paper-0"
                >
                  {cta.label}
                </a>
              )}
              <div onClick={() => setOpen(false)}>
                <CartButton variant="mobile" />
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
