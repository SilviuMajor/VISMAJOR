/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // AVIF first, WebP behind it. Next only ever serves one — it picks by the
    // browser's Accept header — so the cost is build/transform time, not bytes.
    formats: ["image/avif", "image/webp"],
    // Trimmed from the default [...,2048,3840]: nothing on the site is laid out
    // wider than 1920 even at 2x, and every extra entry widens every srcset.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  async redirects() {
    return [
      // CHISEL was repositioned and renamed to SCULPT.
      { source: "/chisel", destination: "/sculpt", permanent: true },
      // SHARP was renamed to STONE.
      { source: "/sharp", destination: "/stone", permanent: true },
      // GY-NO! was renamed to PECTUS.
      { source: "/gy-no", destination: "/pectus", permanent: true },
      // The four thin content pages were consolidated into /help and /legal.
      { source: "/shipping", destination: "/help#shipping", permanent: true },
      { source: "/returns", destination: "/help#returns", permanent: true },
      { source: "/contact", destination: "/help#contact", permanent: true },
      { source: "/privacy", destination: "/legal#privacy", permanent: true },
      { source: "/terms", destination: "/legal#terms", permanent: true },
    ];
  },
};

export default nextConfig;
