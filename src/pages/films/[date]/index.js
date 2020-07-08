import React from 'react'
import ReleasesScreenComponent from '../../../screens/main'
import { meta } from '../../index'
import { parseUrl } from '../../../core/url'
import { api } from '../../../core/api'
import { monthString } from '../../../core/helpers'

const FilmPage = props => <ReleasesScreenComponent {...props} />

FilmPage.getInitialProps = async context => {
  const parsedURL = parseUrl(context.asPath)
  const requestDate = `${monthString(parsedURL.month.calendarNumber)}-${
    parsedURL.year
  }`

  const releases = await api.getReleases('movies', requestDate)

  return {
    parsedURL,
    releases,
    meta,
  }
}

export default FilmPage
