import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Cinzel, Courier_Prime, Cormorant_Garamond, EB_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, sharedOpenGraph } from "@/lib/seo";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

// House typeface — inscriptional Roman serif for the VIS·MAJOR mark + wordmarks.
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

// Data typeface — typewriter mono for net qty, batch, EAN, prices, specs.
const courier = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

// Money typeface — Inter. The commerce convention: a neo-grotesque in the
// Helvetica line (the same neutral register Aesop, Byredo and Le Labo use),
// drawn for screens and shipping tabular lining figures by default, so prices
// sit on the baseline and column-align down a basket. Prices, totals, timer.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-num",
  display: "swap",
});

// Editorial figures — old-style serif numerals for the big proof stats only.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-eb",
  display: "swap",
});

export const metadata: Metadata = {
  // Without metadataBase, Next resolves OG images and canonicals against the
  // per-deployment Vercel hostname, so every share card and every canonical
  // would point at a preview URL instead of the real domain.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "VIS MAJOR: Performance Topicals for Men",
    template: "%s | VIS MAJOR",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  // Note: `openGraph` merges shallowly, so any page that sets an openGraph key
  // must re-spread `sharedOpenGraph` or it loses siteName and locale.
  openGraph: {
    ...sharedOpenGraph,
    url: "/",
    title: "VIS MAJOR: Performance Topicals for Men",
    description:
      "Precision topicals for men. Cosmetic, temporary by design. Made in the UK.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIS MAJOR: Performance Topicals for Men",
    description:
      "Precision topicals for men. Cosmetic, temporary by design. Made in the UK.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // White is locked as the default theme. The /classic page still exposes a
  // runtime White/Cream toggle for internal comparison.
  return (
    <html
      lang="en"
      data-theme="white"
      suppressHydrationWarning
      className={`${hanken.variable} ${cinzel.variable} ${courier.variable} ${inter.variable} ${cormorant.variable} ${ebGaramond.variable}`}
    >
      <body className="font-display bg-paper-0 text-ink-0 antialiased">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
