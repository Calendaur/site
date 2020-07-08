require('dotenv').config()

const withOffline = require('next-offline')
const withTranspileModules = require('next-transpile-modules')(['date-fns'])
const { join } = require('path')
const Dotenv = require('dotenv-webpack')

const nextConfig = {
  workboxOpts: {
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
    ]
  },
  webpack: config => {
    config.plugins = config.plugins || []

    const envVariableFileName = `.env.${process.env.NODE_ENV}`

    config.plugins = [
      ...config.plugins,
      new Dotenv({
        path: join(__dirname, envVariableFileName),
        systemvars: true,
      }),
    ]

    return config
  },
}

module.exports = withOffline(withTranspileModules(nextConfig))
