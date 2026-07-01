/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // CHISEL was repositioned and renamed to SCULPT.
      { source: "/chisel", destination: "/sculpt", permanent: true },
      // SHARP was renamed to STONE.
      { source: "/sharp", destination: "/stone", permanent: true },
      // GY-NO! was renamed to PECTUS.
      { source: "/gy-no", destination: "/pectus", permanent: true },
    ];
  },
};

export default nextConfig;
