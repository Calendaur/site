import smoothscroll from 'smoothscroll-polyfill'
import ReleasePage from 'screens/release'
import { release } from 'shared/api'

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

export async function getServerSideProps(context) {
  const result = await release(context.query.id)

  return {
    props: {
      ...result,
      type: changeType(result.type),
    },
  }
}

export default ReleasePage
