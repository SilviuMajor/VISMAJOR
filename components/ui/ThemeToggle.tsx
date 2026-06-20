"use client";

import { useEffect, useState } from "react";

type Theme = "white" | "cream";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("white");

  useEffect(() => {
    const stored = (localStorage.getItem("gyno-theme") as Theme) || "white";
    setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored);
  }, []);

  const apply = (t: Theme) => {
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
    try {
      localStorage.setItem("gyno-theme", t);
    } catch {}
  };

  const opt = (t: Theme, label: string) => (
    <button
      onClick={() => apply(t)}
      className={`caps px-3 py-1.5 text-[10px] font-semibold transition-colors ${
        theme === t ? "bg-ink-0 text-paper-0" : "bg-transparent text-ink-2 hover:text-ink-0"
      }`}
      aria-pressed={theme === t}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed bottom-4 left-4 z-40 hidden items-center rounded-sm border bg-paper-2/90 backdrop-blur md:flex"
      style={{ borderColor: "var(--hair-strong)" }}
    >
      <span className="caps px-3 text-[9px] font-medium text-ink-3">Paper</span>
      {opt("white", "White")}
      {opt("cream", "Cream")}
    </div>
  );
}
