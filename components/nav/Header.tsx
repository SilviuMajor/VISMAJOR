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
 * The house header — centred mark (links left · VIS·MAJOR dead-centre · actions
 * right), with a "dissolve" over the dark product heroes: at the top it renders
 * dark (white type) so it sits inside the mask, then transitions to the solid
 * white bar once you scroll past the dark part of the hero. `heroDark` opts a
 * page into that behaviour; without it the bar is always solid.
 *
 * Keeps: sticky, hide on scroll-down, per-page active marking via `crumb`, the
 * cart drawer, and the mobile hamburger menu.
 */
export function Header({
  cta = { href: "#buy", label: "Pre-order" },
  crumb,
  heroDark = false,
}: {
  cta?: { href: string; label: string } | null;
  /** The current product name, e.g. "PECTUS" — marks the active nav item. */
  crumb?: string;
  /** This page opens on a dark hero — dissolve from dark to solid on scroll. */
  heroDark?: boolean;
}) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
      // dark while over the dark part of the hero. The mask hero (320vh) stays
      // dark until its reveal completes ~1.1 viewports in, then goes light — so
      // hold the dark bar until ~1 viewport, then dissolve to the solid bar.
      setOverHero(y < window.innerHeight);
      if (y > 240 && y > lastY.current) setHidden(true);
      else setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // dark (over the hero) vs solid (white). The open menu is always solid.
  const dark = heroDark && overHero && !open;

  const mark = dark ? "text-paper-0" : "text-ink-0";
  const barLine = dark ? "bg-paper-0" : "bg-ink-0";

  const navItem = (n: NavLink) => {
    const active = !!crumb && n.label === crumb;
    const cls = dark
      ? active
        ? "text-paper-0"
        : "text-paper-0/60 hover:text-paper-0"
      : active
        ? "text-ink-0"
        : "text-ink-3 hover:text-ink-0";
    return (
      <a
        key={n.href}
        href={n.href}
        aria-current={active ? "page" : undefined}
        className={`caps text-[11px] font-medium transition-colors ${cls}`}
        style={{ letterSpacing: "0.14em" }}
      >
        {n.label}
      </a>
    );
  };

  return (
    <motion.header
      animate={{ y: hidden && !open ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        dark
          ? "border-transparent bg-ink-0"
          : `bg-paper-0 ${scrolled || open ? "border-[var(--hair)]" : "border-transparent"}`
      }`}
    >
      <Container className="relative flex h-[74px] items-center justify-between">
        {/* left — product links (desktop) / menu toggle (mobile) */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative -ml-2 flex h-9 w-9 items-center justify-center md:hidden"
          >
            <span className="relative block h-3 w-5" aria-hidden>
              <motion.span
                animate={{ rotate: open ? 45 : 0, y: open ? 5 : 0 }}
                transition={{ duration: 0.25 }}
                className={`absolute left-0 top-0 block h-[1.6px] w-5 transition-colors duration-300 ${barLine}`}
              />
              <motion.span
                animate={{ opacity: open ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className={`absolute left-0 top-1/2 block h-[1.6px] w-5 -translate-y-1/2 transition-colors duration-300 ${barLine}`}
              />
              <motion.span
                animate={{ rotate: open ? -45 : 0, y: open ? -5 : 0 }}
                transition={{ duration: 0.25 }}
                className={`absolute bottom-0 left-0 block h-[1.6px] w-5 transition-colors duration-300 ${barLine}`}
              />
            </span>
          </button>
          <nav className="hidden items-center gap-6 md:flex">
            {PRODUCT_NAV.map((n) => navItem(n))}
          </nav>
        </div>

        {/* centre — the mark */}
        <a
          href="/"
          onClick={() => setOpen(false)}
          className={`house absolute left-1/2 -translate-x-1/2 text-[17px] transition-colors duration-300 ${mark}`}
          style={{ letterSpacing: "0.14em" }}
        >
          VIS·MAJOR
        </a>

        {/* right — pre-order · basket · (mobile menu) */}
        <div className="flex items-center gap-3">
          {cta && (
            <a
              href={cta.href}
              className={`hidden items-center rounded-[5px] border px-3.5 py-1.5 text-[12px] font-semibold transition-colors duration-300 md:inline-flex ${
                dark
                  ? "border-paper-0/40 text-paper-0 hover:bg-paper-0 hover:text-ink-0"
                  : "border-[var(--hair-strong)] text-ink-0 hover:bg-ink-0 hover:text-paper-0"
              }`}
            >
              {cta.label}
            </a>
          )}

          {/* basket — slides out the cart drawer */}
          <CartButton tone={dark ? "dark" : "light"} />
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
