/** @type {import('next').NextConfig} */
const { withCloudflareAdapter } = require('@opennext/adapter-cloudflare');

const nextConfig = withCloudflareAdapter({
  typescript: { ignoreBuildErrors: true },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "allnovu.com", pathname: "/gestion/images/Productos/**" },
      { protocol: "https", hostname: "allnovu.com", pathname: "/**" },
    ],
    localPatterns: [{ pathname: '/**', search: '' }],
  },
});

module.exports = nextConfig;
