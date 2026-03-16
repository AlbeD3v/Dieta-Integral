/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**.vercel-storage.com',
      },
    ],
  },
  experimental: {
    // Allow importing from monorepo folders outside /app (e.g., ../packages)
    externalDir: true,
  },
  transpilePackages: ['@dieta/shared-ui'],
  turbopack: {},
  // Fallback alias in case path mapping is needed at runtime
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['@dieta/shared-ui'] = config.resolve.alias['@dieta/shared-ui'] || '/packages/shared-ui/src';
    return config;
  }
};

module.exports = nextConfig;
