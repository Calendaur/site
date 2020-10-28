const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const nextConfig = {
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    runtimeCaching,
  },
  async rewrites() {
    return [
      {
        source: '/service-worker.js',
        destination: '/_next/static/service-worker.js',
      },
      {
        source: '/api/:path*',
        destination: 'https://api.released.at/api/:path*',
      },
    ]
  },
  images: {
    domains: ['api.released.at'],
  },
}

module.exports = withPWA(nextConfig)
