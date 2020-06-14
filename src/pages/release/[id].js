import smoothscroll from 'smoothscroll-polyfill'
import ReleasePage from '../../screens/release'
import { api } from '../../core/api'

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
  if (!context.query.id) return { error: 404 }
  const release = await api.getRelease(context.query.id)

  return {
    ...release,
    type: changeType(release.type),
  }
}

export default ReleasePage
