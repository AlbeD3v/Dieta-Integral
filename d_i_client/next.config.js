/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs');

const securityHeaders = [
  { key: 'X-Frame-Options',          value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options',   value: 'nosniff' },
  { key: 'Referrer-Policy',          value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',       value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-DNS-Prefetch-Control',   value: 'on' },
];

const nextConfig = {
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV !== 'production',
  },
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV !== 'production',
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
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

module.exports = withSentryConfig(nextConfig, {
  org: "personal-sxa",
  project: "javascript-nextjs",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
});
