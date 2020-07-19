import React from 'react'
import ReleasesScreenComponent from '../../../screens/main'
import { parseUrl } from '../../../core/url'
import { releases } from '../../../core/api'
import { monthString } from '../../../core/helpers'
import { pages } from '../../../core/meta'

const SeriesPage = props => <ReleasesScreenComponent {...props} />

SeriesPage.getInitialProps = async context => {
  try {
    const parsedURL = parseUrl(context.asPath)
    const requestDate = `${monthString(parsedURL.month.calendarNumber)}-${
      parsedURL.year
    }`

    const result = await releases('serials', requestDate)

    return {
      parsedURL,
      releases: result,
      meta: pages.series(parsedURL.month.jsNumber, parsedURL.year),
    }
  } catch (e) {
    console.error(e)
    return {
      error: 500,
    }
  }
}

export default SeriesPage
