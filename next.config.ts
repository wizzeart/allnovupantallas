/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // ELIMINADO: experimental: { appDir: true } 
  // En Next.js 16, appDir ya es el estándar y ponerlo aquí causa error.

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
  // ELIMINADO: output: "export"
  // @cloudflare/next-on-pages necesita el output estándar para convertir las
  // Server Actions en un Worker. Si pones 'export', desactivas la parte de servidor.
};

module.exports = nextConfig;