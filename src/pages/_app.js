import 'lazysizes'

import React, { useMemo } from 'react'
import { CacheProvider } from '@emotion/react'
import { cache } from '@emotion/css'
import { isEqual, addMonths } from 'date-fns'
import { Page, GlobalStyles } from 'components'
import { StoreProvider } from 'core/store'
import { getNextAndPrevDate } from 'core/url'

function CustomApp({ Component, pageProps, ...rest }) {
  const urlData = useMemo(() => {
    if (!pageProps.parsedURL) return null

    const { type, month, year } = pageProps.parsedURL

    const { prevMonth, prevYear, nextMonth, nextYear } = getNextAndPrevDate(
      month.jsNumber,
      year,
    )

    const prevLink = {
      href: `/${type}/[date]`,
      as: `/${type}/${prevMonth.eng}-${prevYear}`,
    }
    const nextLink = {
      href: `/${type}/[date]`,
      as: `/${type}/${nextMonth.eng}-${nextYear}`,
    }

    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()

    return {
      type,
      month,
      year,
      prevLink,
      nextLink,
      nextMonth,
      prevMonth,
      isCurrentMonth: isEqual(
        new Date(currentYear, currentMonth, 1),
        new Date(year, month.jsNumber, 1),
      ),
      isNextMonth: isEqual(
        addMonths(new Date(currentYear, currentMonth, 1), 1),
        new Date(year, month.jsNumber, 1),
      ),
    }
  }, [pageProps.parsedURL])

  return (
    <CacheProvider value={cache}>
      {GlobalStyles}
      <StoreProvider
        initialStore={{
          me: pageProps.user,
          releasesPageData: urlData,
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
