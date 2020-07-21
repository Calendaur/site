import '../components/base.css'

import React, { useMemo } from 'react'
import App from 'next/app'
import nookies from 'nookies'
import { isEqual, addMonths } from 'date-fns'
import { Page } from '../components'
import { me } from '../core/api'
import { UserContext, useUser } from '../core/auth'
import { UrlDataContext } from '../core/urlDataContext'
import { getNextAndPrevDate } from '../core/url'

function CustomApp({ Component, pageProps, user = null }) {
  const value = useUser(user)
  const { parsedURL } = pageProps

  const urlData = useMemo(() => {
    if (!parsedURL) return null

    const { type, month, year } = parsedURL

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
  }, [parsedURL])

  return (
    <UserContext.Provider value={value}>
      <UrlDataContext.Provider value={urlData}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </UrlDataContext.Provider>
    </UserContext.Provider>
  )
}

CustomApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext)
  const { jwt_token: token } = nookies.get(appContext.ctx)

  if (!token) {
    return { ...appProps }
  }

  try {
    const { current_user } = await me(token)
    return { ...appProps, user: current_user }
  } catch (e) {
    console.error(e)
    return { ...appProps }
  }
}

export default CustomApp
