import 'lazysizes'

import 'styles/global.css'
import 'styles/lazyload.css'
import 'styles/nprogress.css'
import 'react-toastify/dist/ReactToastify.css'

import { useEffect } from 'react'
import { AppProps } from 'next/app'
import { ReactQueryCacheProvider, QueryCache } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { configure, start, done } from 'nprogress'
import Page from 'components/Page'

configure({ showSpinner: false })

const queryCache = new QueryCache()

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
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Hydrate state={pageProps.dehydratedState}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </Hydrate>
    </ReactQueryCacheProvider>
  )
}

export default CustomApp
