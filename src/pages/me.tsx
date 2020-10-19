import React from 'react'
import { GetServerSideProps } from 'next'
import Me from 'screens/me'
import { me } from 'shared/api'
import { redirect, getCookie } from 'shared/utils'
import { routes } from 'shared/constants'
import { usePushNotifications } from 'features/notifications/use-push-notifications'

function MePage(props) {
  usePushNotifications()

  return <Me {...props} />
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const token = getCookie(ctx.req.headers.cookie)

  if (!token) {
    redirect(ctx, routes.SIGN_UP)
  }

  try {
    const user = await me(token)

    return {
      props: {
        user,
      },
    }
  } catch (e) {
    console.error(e)
    redirect(ctx, routes.SIGN_UP)
  }
}

export default MePage
