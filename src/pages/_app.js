import 'lazysizes'

import React from 'react'
import { CacheProvider } from '@emotion/react'
import { cache } from '@emotion/css'
import { Page, GlobalStyles } from 'components'
import { StoreProvider } from 'core/store'
import { getReleasesPageData } from 'core/url'

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
        initialStore={{
          me: pageProps.user,
          releasesPageData: releasesPages.has(router.route)
            ? getReleasesPageData(router.asPath)
            : null,
        }}
      >
        <Page>
          <Component {...pageProps} />
        </Page>
      </StoreProvider>
    </CacheProvider>
  )
}

export default CustomApp
