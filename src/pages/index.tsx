import Releases from 'screens/index'
import { getPropsForIndexPage } from 'features/releases/next-page-functions'

function IndexPage(props) {
  return <Releases {...props} />
}

export async function getStaticProps(context) {
  return getPropsForIndexPage(context)
}

export default IndexPage
