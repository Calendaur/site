import { GetStaticPaths, GetStaticProps } from 'next'
import Releases from 'screens/index'
import { getProps, getPaths } from 'features/releases/next-page-functions'
import { PageDataProvider } from 'features/releases/page-data'
import { ReleaseType } from 'types/common'

function FilmsPage(props) {
  return (
    <PageDataProvider parsedUrl={props.parsedURL}>
      <Releases {...props} />
    </PageDataProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async context => {
  return getPaths(context)
}

export const getStaticProps: GetStaticProps = async context => {
  return getProps(context, ReleaseType.Films)
}

export default FilmsPage
