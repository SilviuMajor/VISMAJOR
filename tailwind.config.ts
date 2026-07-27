import type { Config } from "tailwindcss";

/**
 * Paper is white and theme-driven for the solid case, but Tailwind can't inject
 * an alpha channel into a bare `var()` — so `text-paper-0/70` silently generated
 * nothing and fell back to inherited ink (invisible on dark sections). This
 * returns the var for the solid case and a real white rgba() when an opacity
 * modifier is used, so paper opacities render as translucent white as intended.
 * (Typed as string for the colour map; Tailwind invokes it at build time.)
 */
const paperAlpha = (v: string): string =>
  (({ opacityValue }: { opacityValue?: string }) =>
    opacityValue === undefined
      ? `var(${v})`
      : `rgba(255, 255, 255, ${opacityValue})`) as unknown as string;

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paper / surfaces — solid case theme-driven; opacity case is white
        paper: {
          0: paperAlpha("--paper-0"),
          1: paperAlpha("--paper-1"),
          2: paperAlpha("--paper-2"),
        },
        // Ink (warm near-black).
        // 3 = faint TEXT (4.62:1 on white, clears the WCAG body minimum).
        // 4 = DECORATION ONLY — dots, separators, marks. Never text.
        ink: {
          0: "#14130F",
          1: "#36352F",
          2: "#6A6960",
          3: "#797770",
          4: "#9C9A8F",
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
        /* Two radii, and that is the whole scale.
           `sm` is 5px — not 4px — because 5px was already the de-facto button
           radius (42 uses as a raw `rounded-[5px]`, against 21 `rounded-sm`),
           so tokenising on it moves the fewest corners. The 4px/3px literals
           were the same radius written three ways and now all resolve here.
           `xs` stays as the micro tier for the 8.5px caps chips inside the
           buy panels, where 5px would read as a pill.
           `none`/`md` were declared and never used; `rounded-full` (49 uses,
           dots and progress pills) is Tailwind's own and is unaffected. */
        xs: "2px",
        sm: "5px",
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
