import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactCompiler: true,
  transpilePackages: ['@dieta/shared-ui'],

  experimental: {
    externalDir: true,
  },
  turbopack: {
    resolveAlias: {
      '@dieta/shared-ui': '../packages/shared-ui/src',
    },
  },
  webpack: (config) => {
    if (!config.resolve) config.resolve = {};
    if (!config.resolve.alias) config.resolve.alias = {};
    const alias = config.resolve.alias as Record<string, string>;
    alias['@dieta/shared-ui'] = alias['@dieta/shared-ui'] ?? '../packages/shared-ui/src';
    return config;
  },
};

export default nextConfig;
