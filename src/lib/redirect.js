import Router from 'next/router'

function redirect(ctx, to) {
  if (ctx.asPath === '/service-worker.js') return
  if (ctx.res) {
    ctx.res.writeHead(303, { Location: to })
    ctx.res.end()
  } else {
    Router.replace(to)
  }
}

export default redirect
