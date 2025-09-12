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
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.txt$/,
      use: 'raw-loader'
    });
    return config;
  }
};

module.exports = nextConfig;
