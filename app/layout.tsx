import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Cinzel, Courier_Prime, Cormorant_Garamond, EB_Garamond } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { CartDrawer } from "@/components/cart/CartDrawer";

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

// Numeral system — classical old-style serif figures for brand-voice numbers.
// Cormorant = prices / times / ratings / hero figures; EB Garamond = big stats.
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
  title: "VIS MAJOR: Performance Topicals for Men",
  description:
    "A small house of precision topicals for men. Cosmetic, temporary by design, each engineered to do exactly one thing. Made in the UK.",
  openGraph: {
    title: "VIS MAJOR: Performance Topicals for Men",
    description:
      "Precision topicals for men. Cosmetic, temporary by design. Made in the UK.",
    type: "website",
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
      className={`${hanken.variable} ${cinzel.variable} ${courier.variable} ${cormorant.variable} ${ebGaramond.variable}`}
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
