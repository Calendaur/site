import smoothscroll from 'smoothscroll-polyfill'
import ReleasePage from '../../../screens/release'
import { release } from '../../../core/api'

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

export async function getServerSideProps({ params }) {
  try {
    const result = await release(params.id)

    return {
      props: {
        ...result,
        type: changeType(result.type),
      },
    }
  } catch (e) {
    console.error(e)
  }
}

export default ReleasePage
