import smoothscroll from 'smoothscroll-polyfill'
import ReleasePage from 'screens/release'
import { release } from 'core/api'

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

ReleasePage.getInitialProps = async context => {
  if (!context.query.id) {
    return { error: 404 }
  }

  try {
    const result = await release(context.query.id)

    return {
      ...result,
      type: changeType(result.type),
    }
  } catch (e) {
    console.error(e)
    return {
      error: 500,
    }
  }
}

export default ReleasePage
