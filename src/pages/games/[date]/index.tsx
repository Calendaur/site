import { GetStaticPaths, GetStaticProps } from 'next'
import Releases from 'screens/index'
import { getProps, getPaths } from 'features/releases/next-page-functions'
import { ReleaseType } from 'types/common'

function GamesPage(props) {
  return <Releases {...props} />
}

export const getStaticPaths: GetStaticPaths = async context => {
  return getPaths(context)
}

export const getStaticProps: GetStaticProps = async context => {
  return getProps(ReleaseType.Games)(context)
}

export default GamesPage
