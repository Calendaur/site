import React from 'react'
import ReleasesScreenComponent from '../screens/main'
import { months } from '../core/url'
import { api } from '../core/api'

const MainPage = props => <ReleasesScreenComponent {...props} />

export const meta = {
  title: `released.at Смотреть новые фильмы ${new Date().getFullYear()}. Новинки кино, собранные в одном месте в удобном формате на released`,
  description: `Не пропустите новинки фильмов. Смотрите кино, которое выйдет уже сегодня. Взгляните на календарь и выберите, что посмотреть вечером`,
}

MainPage.getInitialProps = async context => {
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()

  const releases = await api.getReleases(
    'movies',
    `${currentMonth}-${currentYear}`,
  )

  return {
    parsedURL: {
      type: 'films',
      month: months[currentMonth - 1],
      year: currentYear,
    },
    releases,
    meta,
  }
}

export default MainPage
