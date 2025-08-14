/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
