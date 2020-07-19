import React from 'react'
import ReleasesScreenComponent from '../screens/main'
import { months } from '../core/url'
import { releases } from '../core/api'
import { pages } from '../core/meta'

const MainPage = props => <ReleasesScreenComponent {...props} />

MainPage.getInitialProps = async () => {
  try {
    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear()

    const result = await releases('movies', `${currentMonth}-${currentYear}`)

    return {
      parsedURL: {
        type: 'films',
        month: months[currentMonth - 1],
        year: currentYear,
      },
      releases: result,
      meta: pages.main,
    }
  } catch (e) {
    console.error(e)
    return {
      error: 500,
    }
  }
}

export default MainPage
