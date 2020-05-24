import MainPage from '../screens/main'
import { months } from '../core/url'
import { api } from '../core/api'

MainPage.getInitialProps = async () => {
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

export default MainPage
