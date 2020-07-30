import 'lazysizes'

import React from 'react'
import { CacheProvider } from '@emotion/react'
import { cache } from '@emotion/css'
import { SWRConfig } from 'swr'
import { Page, GlobalStyles } from 'components'
import { StoreProvider } from 'core/store'
import { getReleasesPageData } from 'core/url'
import { fetchJSON } from 'core/helpers'

const releasesPages = new Set([
  '/films/[date]',
  '/games/[date]',
  '/series/[date]',
  '/',
])

function CustomApp({ Component, pageProps, router }) {
  return (
    <CacheProvider value={cache}>
      {GlobalStyles}
      <StoreProvider
        init={{
          me: pageProps.user,
          releasesPageData: releasesPages.has(router.route)
            ? getReleasesPageData(router.asPath)
            : null,
        }}
      >
        <SWRConfig
          value={{
            fetcher: fetchJSON,
          }}
        >
          <Page>
            <Component {...pageProps} />
          </Page>
        </SWRConfig>
      </StoreProvider>
    </CacheProvider>
  )
}

export default CustomApp
