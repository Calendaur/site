import React from 'react'
import ReleasesScreenComponent from 'screens/main'
import { months } from 'core/url'
import { homePageReleases } from 'core/api'
import { pages } from 'core/meta'
import withMe from 'core/withMe'

const MainPage = props => <ReleasesScreenComponent {...props} />

MainPage.getInitialProps = async ctx => {
  try {
    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear()

    const result = await homePageReleases()

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

export default withMe(MainPage)
