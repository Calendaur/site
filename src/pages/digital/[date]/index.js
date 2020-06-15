import React from 'react'
import ReleasesScreenComponent from '../../../screens/main'
import { parseUrl } from '../../../core/url'
import { api } from '../../../core/api'
import { monthString } from '../../../core/helpers'

const DigitalFilmPage = props => <ReleasesScreenComponent {...props} />

DigitalFilmPage.getInitialProps = async context => {
  const parsedURL = parseUrl(context.asPath)
  const requestDate = `${monthString(parsedURL.month.calendarNumber)}-${
    parsedURL.year
  }`

  const releases = await api.getReleases('movies', requestDate)

  console.log(
    releases,
    releases.filter(r => r.is_digital && !r.is_premier),
  )

  return {
    parsedURL,
    releases: releases.filter(r => r.is_digital && !r.is_premier),
  }
}

export default DigitalFilmPage
