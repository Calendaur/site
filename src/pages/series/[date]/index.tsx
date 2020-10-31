import { GetStaticPaths, GetStaticProps } from 'next'
import Releases from 'screens/index'
import { getPaths, getProps } from 'features/releases/next-page-functions'
import { ReleaseType } from 'types/common'

function SeriesPage(props) {
  return <Releases {...props} />
}

export const getStaticPaths: GetStaticPaths = async context => {
  return getPaths(context)
}

export const getStaticProps: GetStaticProps = async context => {
  return getProps(ReleaseType.Series)(context)
}

export default SeriesPage
