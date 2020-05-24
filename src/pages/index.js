import IndexPage from '../screens/main'
import { checkFixRedirect, months } from '../core/url'
import { api } from '../core/api'

IndexPage.getInitialProps = async context => {
  checkFixRedirect(context)

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
  }
}

export default IndexPage
