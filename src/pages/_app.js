import 'lazysizes'

import React from 'react'
import Router from 'next/router'
import { CacheProvider } from '@emotion/react'
import { cache } from '@emotion/css'
import { SWRConfig } from 'swr'
import { start, done, configure } from 'nprogress'
import { Page, GlobalStyles } from 'components'
import { fetchJSON } from 'core/helpers'

configure({ showSpinner: false })

Router.onRouteChangeStart = () => {
  start()
}

Router.onRouteChangeComplete = () => {
  done()
}

Router.onRouteChangeError = () => {
  done()
}

function CustomApp({ Component, pageProps }) {
  return (
    <CacheProvider value={cache}>
      {GlobalStyles}
      <SWRConfig
        value={{
          fetcher: fetchJSON,
        }}
      >
        <Page>
          <Component {...pageProps} />
        </Page>
      </SWRConfig>
    </CacheProvider>
  )
}

export default CustomApp
