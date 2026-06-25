/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // CHISEL was repositioned and renamed to SCULPT.
      { source: "/chisel", destination: "/sculpt", permanent: true },
    ];
  },
};

export default nextConfig;
