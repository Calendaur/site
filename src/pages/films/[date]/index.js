import Releases from 'screens/index'
import { getProps, getPaths } from 'features/releases/next-page-functions'
import { PageDataProvider } from 'features/releases/page-data'

function FilmPage(props) {
  return (
    <PageDataProvider parsedUrl={props.parsedURL}>
      <Releases {...props} />
    </PageDataProvider>
  )
}

export async function getStaticPaths() {
  return getPaths()
}

export async function getStaticProps(context) {
  return getProps(context, 'films')
}

export default FilmPage
