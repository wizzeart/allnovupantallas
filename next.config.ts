/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: { appDir: true },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "allnovu.com", pathname: "/gestion/images/Productos/**" },
      { protocol: "https", hostname: "allnovu.com", pathname: "/**" },
    ],
    localPatterns: [
      { pathname: '/**', search: '' },
    ],
  },
  output: "export", // Esto genera archivos estáticos listos para Cloudflare Pages
};

module.exports = nextConfig;
