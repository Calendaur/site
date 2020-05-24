import MainPage from '../../../screens/main'
import { checkFixRedirect, parseUrl } from '../../../core/url'
import { api } from '../../../core/api'
import { monthString, toApiType } from '../../../core/helpers'

MainPage.getInitialProps = async context => {
  checkFixRedirect(context)

  const parsedURL = parseUrl(context.asPath)
  const requestDate = `${monthString(parsedURL.month.calendarNumber)}-${
    parsedURL.year
  }`
  const type = toApiType(parsedURL.type)

  const releases = await api.getReleases(type, requestDate)

  return {
    parsedURL,
    releases,
  }
}

export default MainPage
