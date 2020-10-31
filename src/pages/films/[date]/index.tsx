import { GetStaticPaths, GetStaticProps } from 'next'
import Releases from 'screens/index'
import { getProps, getPaths } from 'features/releases/next-page-functions'
import { ReleaseType } from 'types/common'

function FilmsPage(props) {
  return <Releases {...props} />
}

export const getStaticPaths: GetStaticPaths = async context => {
  return getPaths(context)
}

export const getStaticProps: GetStaticProps = async context => {
  return getProps(ReleaseType.Films)(context)
}

export default FilmsPage
