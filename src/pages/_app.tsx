import 'lazysizes'

import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import { configure, start, done } from 'nprogress'
import { globalStyles } from 'components2'

globalStyles()

configure({ showSpinner: false })

function CustomApp({ Component, pageProps, router: { events } }: AppProps) {
  useEffect(() => {
    events.on('routeChangeStart', start)
    events.on('routeChangeComplete', done)
    events.on('routeChangeError', done)

    return () => {
      events.off('routeChangeStart', start)
      events.off('routeChangeComplete', done)
      events.off('routeChangeError', done)
    }
  }, []) // eslint-disable-line

  return <Component {...pageProps} />
}

export default CustomApp
