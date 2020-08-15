import React from 'react'
import { parseCookies } from 'nookies'
import Me from 'screens/me'
import { fetchWithToken, redirect } from 'shared/utils'
import { endpoints, routes } from 'shared/constants'
import { usePushNotifications } from 'features/notifications/use-push-notifications'

function MePage(props) {
  usePushNotifications()

  return <Me {...props} />
}

MePage.getInitialProps = async ctx => {
  try {
    const { authorization: token } = parseCookies(ctx)
    if (!token) {
      redirect(ctx, routes.SIGN_UP)
      return {}
    }

    const user = await fetchWithToken(endpoints.PROFILE, token)

    return {
      user,
    }
  } catch (e) {
    console.error(e)
    redirect(ctx, routes.SIGN_UP)
    return {}
  }
}

export default MePage
