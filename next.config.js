const withOffline = require('next-offline')
const withTM = require('next-transpile-modules')(['date-fns'], {
  unstable_webpack5: true,
})

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
      {
        source: '/uploads/:path*',
        destination: 'https://api.released.at/uploads/:path*',
      },
    ]
  },
}

module.exports = withOffline(withTM(nextConfig))
