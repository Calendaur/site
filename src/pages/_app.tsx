import 'lazysizes'

import 'styles/global.css'
import 'styles/lazyload.css'
import 'styles/nprogress.css'

import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import { CacheProvider } from '@emotion/react'
import { cache } from '@emotion/css'
import { configure, start, done } from 'nprogress'
import { Page } from 'components'

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

  return (
    <CacheProvider value={cache}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </CacheProvider>
  )
}

export default CustomApp
