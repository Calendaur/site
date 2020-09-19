import smoothscroll from 'smoothscroll-polyfill'
import slugify from '@sindresorhus/slugify'
import ReleasePage from 'screens/release'
import { release } from 'shared/api'
import { redirect } from 'shared/utils'
import { routes } from 'shared/constants'

if (typeof window !== 'undefined') smoothscroll.polyfill()

function changeType(t) {
  switch (t) {
    case 'movie':
      return 'films'
    case 'game':
      return 'games'
    case 'serial':
      return 'series'
  }
}

export const config = {
  amp: 'hybrid',
}

export async function getServerSideProps(context) {
  const idWithSlug = context.query.id
  const result = await release(idWithSlug)

  if (idWithSlug.split('-').length === 1) {
    redirect(
      context,
      routes.RELEASE + `/${idWithSlug}-${slugify(result.title)}`,
    )
  }

  return {
    props: {
      ...result,
      type: changeType(result.type),
    },
  }
}

export default ReleasePage
