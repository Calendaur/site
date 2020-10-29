import { GetServerSideProps } from 'next'
import smoothscroll from 'smoothscroll-polyfill'
import slugify from '@sindresorhus/slugify'
import Release from 'screens/release'
import { release } from 'shared/api'
import { redirect, releaseWithDetailsAdapter } from 'shared/utils'
import { routes } from 'shared/constants'
import { ReleaseWithDetails } from 'types/common'

if (typeof window !== 'undefined') smoothscroll.polyfill()

interface Props {
  release: ReleaseWithDetails
}

function ReleasePage({ release }: Props) {
  return <Release release={release} />
}

export const getServerSideProps: GetServerSideProps = async context => {
  const idWithSlug = context.query.id as string
  const result = await release(idWithSlug)

  if (idWithSlug.split('-').length === 1) {
    redirect(
      context,
      routes.RELEASE + `/${idWithSlug}-${slugify(result.title)}`,
    )
  }

  return {
    props: {
      release: releaseWithDetailsAdapter(result),
    },
  }
}

export default ReleasePage
