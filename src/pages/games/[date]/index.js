import React from 'react'
import ReleasesScreenComponent from '../../../screens/main'
import { parseUrl } from '../../../core/url'
import { api } from '../../../core/api'
import { monthString } from '../../../core/helpers'

const GamesPage = props => <ReleasesScreenComponent {...props} />

const meta = {
  title: `Hовые игры ${new Date().getFullYear()}. Новинки игр, собранные в одном месте в удобном формате на released.at`,
  description: `Не пропустите игры на пк и консоли. Взгляните на календарь и выберите лучшие игры. Игра на switch также есть в календаре`,
}

GamesPage.getInitialProps = async context => {
  const parsedURL = parseUrl(context.asPath)
  const requestDate = `${monthString(parsedURL.month.calendarNumber)}-${
    parsedURL.year
  }`

  const releases = await api.getReleases('games', requestDate)

  return {
    parsedURL,
    releases,
    meta,
  }
}

export default GamesPage
