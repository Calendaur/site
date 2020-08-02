import React from 'react'
import { parseCookies } from 'nookies'
import MeScreenComponent from 'screens/me'
import { fetchWithToken, redirect } from 'shared/utils'
import { endpoints, routes } from 'shared/constants'

const MePage = props => <MeScreenComponent {...props} />

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
