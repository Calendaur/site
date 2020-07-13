import React from 'react'
import ReleasesScreenComponent from '../screens/main'
import { months } from '../core/url'
import { api } from '../core/api'
import { pages } from '../core/meta'

const MainPage = props => <ReleasesScreenComponent {...props} />

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
    meta: pages.main,
  }
}

export default MainPage
