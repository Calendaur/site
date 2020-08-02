import 'lazysizes'

import React from 'react'
import { CacheProvider } from '@emotion/react'
import { cache } from '@emotion/css'
import { SWRConfig } from 'swr'
import { Page, GlobalStyles } from 'components'
import { fetchJSON } from 'core/helpers'

function CustomApp({ Component, pageProps, router }) {
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
