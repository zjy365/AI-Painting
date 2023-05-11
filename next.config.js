/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  // output: 'export',
  async rewrites () {
    return [
      {
        source: '/api/:path*',
        destination: 'https://zbvrsg.laf.dev/:path*'
      }
    ]
  }
}

module.exports = nextConfig
