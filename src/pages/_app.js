import 'lazysizes'
import 'components/GlobalStyles/styles.css'

import React from 'react'
import Router from 'next/router'
import { SWRConfig } from 'swr'
import { start, done, configure } from 'nprogress'
import { Page } from 'components'
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
    <SWRConfig
      value={{
        fetcher: fetchJSON,
      }}
    >
      <Page>
        <Component {...pageProps} />
      </Page>
    </SWRConfig>
  )
}

export default CustomApp
