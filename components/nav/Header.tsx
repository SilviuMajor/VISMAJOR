"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

export function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
      // hide when scrolling down past the hero, show when scrolling up
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
      href={href}
      className="caps pb-0.5 text-[11.5px] font-semibold text-ink-2 transition-colors hover:text-ink-0"
    >
      {label}
    </a>
  );

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
      className={`sticky top-0 z-30 bg-paper-0 transition-[border-color] duration-200 ${
        scrolled ? "border-b border-[var(--hair)]" : "border-b border-transparent"
      }`}
    >
      <Container className="flex h-[68px] items-center justify-between">
        <a href="#top" className="house text-[15px] font-light text-ink-0">
          VIS&nbsp;MAJOR
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {navItem("#product", "Product")}
          {navItem("#how", "Science")}
          {navItem("#ingredients", "Ingredients")}
          {navItem("#faq", "FAQ")}
        </nav>

        <a
          href="#buy"
          className="caps inline-flex items-center gap-2 rounded-xs border border-[var(--hair-strong)] px-3 py-1.5 text-[11px] font-semibold text-ink-0 transition-colors hover:bg-ink-0 hover:text-paper-0"
        >
          Pre-order
        </a>
      </Container>
    </motion.header>
  );
}
