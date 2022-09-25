const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = withBundleAnalyzer({
  trailingSlash: true,
  reactStrictMode: true,
  experimental: {
  },
  images: {
    loader: 'custom',
  }
})

const config = nextConfig

module.exports = config
