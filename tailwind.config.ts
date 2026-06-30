import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paper / surfaces — theme-driven (white default, cream alternate)
        paper: {
          0: "var(--paper-0)",
          1: "var(--paper-1)",
          2: "var(--paper-2)",
        },
        // Ink (warm near-black)
        ink: {
          0: "#14130F",
          1: "#36352F",
          2: "#6A6960",
          3: "#9C9A8F",
        },
        // Aluminium / metal scale
        metal: {
          50: "#ECEDEC",
          100: "#DFE1E1",
          200: "#C8CBCC",
          300: "#ABAFB1",
          400: "#8C9093",
          500: "#6C7073",
          600: "#4E5255",
          700: "#36393B",
        },
        cap: "#161512",
        // Aliases
        hair: "rgba(20,19,15,0.14)",
        hairStrong: "rgba(20,19,15,0.30)",
      },
      fontFamily: {
        sans: ["var(--font-display)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Times New Roman", "serif"], // Cinzel — house mark + product wordmarks
        mono: ["var(--font-mono)", "Courier New", "monospace"], // Courier Prime — data / specs / numerals
      },
      letterSpacing: {
        wordmark: "0.04em",
        tight: "-0.01em",
        tighter: "-0.025em",
        caps: "0.22em",
        capsLoose: "0.34em",
        capsHouse: "0.28em",
      },
      fontSize: {
        display: ["clamp(56px, 9vw, 132px)", { lineHeight: "0.9", letterSpacing: "-0.01em" }],
        h1: ["clamp(38px, 6vw, 68px)", { lineHeight: "1.05" }],
        h2: ["32px", { lineHeight: "1.05" }],
        h3: ["22px", { lineHeight: "1.25" }],
        body: ["16px", { lineHeight: "1.6" }],
        label: ["13px", { lineHeight: "1" }],
        caption: ["11px", { lineHeight: "1" }],
        legal: ["10px", { lineHeight: "1.4" }],
      },
      borderRadius: {
        none: "0",
        xs: "2px",
        sm: "4px",
        md: "8px",
        pill: "999px",
      },
      spacing: {
        keyline: "16px",
      },
      transitionDuration: {
        DEFAULT: "180ms",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.2, 0, 0, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
