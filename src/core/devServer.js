const next = require('next')
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const devProxy = {
  '/api': {
    target: 'https://api.released.at/api/',
    pathRewrite: { '^/api': '/' },
    changeOrigin: true,
  },
}

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000
const env = process.env.NODE_ENV
const dev = env === 'development'
const app = next({ dev })

const handle = app.getRequestHandler()

app
  .prepare()
  .then(async () => {
    const server = express()

    if (dev) {
      Object.keys(devProxy).forEach(ctx => {
        server.use(createProxyMiddleware(ctx, devProxy[ctx]))
      })
    }

    server.get('*', (req, res) => handle(req, res))

    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on port ${port} [${env}]`)
    })
  })
  .catch(err => {
    console.log('An error occurred, unable to start the server')
    console.log(err)
  })
