const withOffline = require('next-offline')

const nextConfig = {
  workboxOpts: {
    importScripts: ['./scripts/push.js?v=1'],
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offlineCache',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 200,
          },
        },
      },
    ],
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
}

module.exports = withOffline(nextConfig)
