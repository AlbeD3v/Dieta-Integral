import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  transpilePackages: ['@dieta/shared-ui'],

  experimental: {
    externalDir: true,
  },
  webpack: (config) => {
    config.resolve = config.resolve || {} as any;
    (config.resolve as any).alias = (config.resolve as any).alias || {};
    (config.resolve as any).alias['@dieta/shared-ui'] = (config.resolve as any).alias['@dieta/shared-ui'] || '/packages/shared-ui/src';
    return config;
  },
};

export default nextConfig;
