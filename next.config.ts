/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configuración de imágenes externas
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "allnovu.com",
        pathname: "/gestion/images/Productos/**",
      },
      {
        protocol: "https",
        hostname: "allnovu.com",
        pathname: "/**", // Permite otras imágenes en tu dominio
      },
    ],
    localPatterns: [
      {
        pathname: '/**', // Todas las rutas en /public
        search: '',      // Sin parámetros de búsqueda
      },
    ],
  }
};

module.exports = nextConfig;