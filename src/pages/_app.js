import 'lazysizes'

import React from 'react'
import { CacheProvider } from '@emotion/react'
import { cache } from '@emotion/css'
import { SWRConfig } from 'swr'
import { Page, GlobalStyles } from 'components'
import { fetchJSON } from 'core/helpers'
import { usePushNotifications } from 'features/notifications/use-push-notifications'

function CustomApp({ Component, pageProps, router }) {
  usePushNotifications()

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
