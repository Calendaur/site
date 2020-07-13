import React from 'react'
import ReleasesScreenComponent from '../../../screens/main'
import { parseUrl } from '../../../core/url'
import { api } from '../../../core/api'
import { monthString } from '../../../core/helpers'
import { pages } from '../../../core/meta'

const GamesPage = props => <ReleasesScreenComponent {...props} />

GamesPage.getInitialProps = async context => {
  const parsedURL = parseUrl(context.asPath)
  const requestDate = `${monthString(parsedURL.month.calendarNumber)}-${
    parsedURL.year
  }`

  const releases = await api.getReleases('games', requestDate)

  return {
    parsedURL,
    releases,
    meta: pages.games(parsedURL.month.jsNumber, parsedURL.year),
  }
}

export default GamesPage
