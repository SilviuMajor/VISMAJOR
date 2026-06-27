"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { CartButton } from "@/components/cart/CartButton";

export type NavLink = { href: string; label: string };

const DEFAULT_NAV: NavLink[] = [
  { href: "#product", label: "Product" },
  { href: "#how", label: "Science" },
  { href: "#ingredients", label: "Ingredients" },
  { href: "#faq", label: "FAQ" },
];

export function Header({
  nav = DEFAULT_NAV,
  cta = { href: "#buy", label: "Pre-order" },
  crumb,
}: {
  nav?: NavLink[];
  cta?: { href: string; label: string } | null;
  /** A small product name shown next to the house wordmark, e.g. "GY-NO!". */
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

  const navItem = (href: string, label: string) => (
    <a
      key={href + label}
      href={href}
      className="caps pb-0.5 text-[11.5px] font-semibold text-ink-2 transition-colors hover:text-ink-0"
    >
      {label}
    </a>
  );

  return (
    <motion.header
      animate={{ y: hidden && !open ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
      className={`sticky top-0 z-40 bg-paper-0 transition-[border-color] duration-200 ${
        scrolled || open ? "border-b border-[var(--hair)]" : "border-b border-transparent"
      }`}
    >
      <Container className="flex h-[68px] items-center justify-between">
        <div className="flex items-baseline gap-2.5">
          <a
            href="/"
            onClick={() => setOpen(false)}
            className="house text-[15px] text-ink-0"
          >
            VIS·MAJOR
          </a>
          {crumb && (
            <span className="caps text-[10px] font-semibold text-ink-3">
              <span className="mr-2 text-ink-3/60">/</span>
              {crumb}
            </span>
          )}
        </div>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => navItem(n.href, n.label))}
        </nav>

        <div className="flex items-center gap-2.5">
          {cta && (
            <a
              href={cta.href}
              className="hidden items-center gap-2 rounded-[5px] border border-[var(--hair-strong)] px-3 py-1.5 text-[12px] font-semibold text-ink-0 transition-colors hover:bg-ink-0 hover:text-paper-0 md:inline-flex"
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
                {nav.map((n) => (
                  <a
                    key={n.href + n.label}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="caps border-t py-4 text-[13px] font-semibold text-ink-1 transition-colors hover:text-ink-0"
                    style={{ borderColor: "var(--hair)" }}
                  >
                    {n.label}
                  </a>
                ))}
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
