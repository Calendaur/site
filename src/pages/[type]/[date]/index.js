import MainPage from '../../../screens/main'
import { checkFixRedirect, parseUrl } from '../../../core/url'
import { fetchReleases, fetchBackgrounds } from '../../../core/api'

export async function getServerSideProps(context) {
  checkFixRedirect(context)

  const parsedURL = parseUrl(context.req.url)
  const month = parsedURL.month.calendarNumber
  const date = `${parsedURL.year}-${month > 9 ? month : '0' + month}-01`

  const releases = await fetchReleases()
  const backgrounds = await fetchBackgrounds(date)

  return {
    props: {
      parsedURL,
      releases,
      backgrounds,
      date,
    },
  }
}

export default MainPage
