import React from 'react'
import ReleasesScreenComponent from '../../../screens/main'
import { parseUrl } from '../../../core/url'
import { api } from '../../../core/api'
import { monthString } from '../../../core/helpers'

const SeriesPage = props => <ReleasesScreenComponent {...props} />

const meta = {
  title: `released.at Смотреть новые сериалы ${new Date().getFullYear()}. Новые сезоны сериалов, а также премьеры сериалов, собранные в одном месте в удобном формате на released`,
  description: `Не пропустите премьеры сериалов. Смотрите сериалы, которое выйдет уже сегодня. Взгляние на календарь и выберите сериал на любой вкус`,
}

SeriesPage.getInitialProps = async context => {
  const parsedURL = parseUrl(context.asPath)
  const requestDate = `${monthString(parsedURL.month.calendarNumber)}-${
    parsedURL.year
  }`

  const releases = await api.getReleases('serials', requestDate)

  return {
    parsedURL,
    releases,
    meta,
  }
}

export default SeriesPage
