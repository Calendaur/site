import React from 'react'
import ReleasesScreenComponent from '../../../screens/main'
import { parseUrl } from '../../../core/url'
import { releases } from '../../../core/api'
import { pages } from '../../../core/meta'

const FilmPage = props => <ReleasesScreenComponent {...props} />

FilmPage.getInitialProps = async context => {
  try {
    if (!context.query.date) {
      return {
        error: 404,
      }
    }

    const parsedURL = parseUrl(context.asPath)

    if (!parsedURL) throw new Error(`No found parsed url for ${context.asPath}`)

    const result = await releases('movies', context.query.date)

    return {
      parsedURL,
      releases: result,
      meta: pages.films(parsedURL.month.jsNumber, parsedURL.year),
    }
  } catch (e) {
    console.error(e)
    console.error(context.asPath)
    console.error(context.query.date)
    return {
      error: 500,
    }
  }
}

export default FilmPage
