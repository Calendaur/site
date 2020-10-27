
import { GetServerSideProps } from 'next'
import { QueryCache } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import Me from 'screens/me'
import { me } from 'shared/api'
import { redirect, getCookie } from 'shared/utils'
import { routes, cookies, endpoints } from 'shared/constants'
import { usePushNotifications } from 'features/notifications/use-push-notifications'

function MePage() {
  usePushNotifications()

  return <Me />
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const token = getCookie(ctx.req.headers.cookie, cookies.AUTHORIZATION)

  if (!token) {
    redirect(ctx, routes.SIGN_UP)
  }

  try {
    const queryCache = new QueryCache()
    await queryCache.prefetchQuery(endpoints.PROFILE, () => me(token))

    return {
      props: {
        dehydratedState: dehydrate(queryCache),
        // user: {
        //   ...user.current_user,
        //   expected: {
        //     films: user.expected.movies.map(r => releaseAdapter(r, 'films')),
        //     series: user.expected.serials.map(r => releaseAdapter(r, 'series')),
        //     games: user.expected.games.map(r => releaseAdapter(r, 'games')),
        //   },
        // },
      },
    }
  } catch (e) {
    console.error(e)
    redirect(ctx, routes.SIGN_UP)
  }
}

export default MePage
