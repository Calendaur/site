import '../components/base.css'

import React from 'react'
import App from 'next/app'
import nookies from 'nookies'
import { Page } from '../components'
import { me } from '../core/api'
import { UserContext, useUser } from '../core/auth'

function CustomApp({ Component, pageProps, user = null }) {
  const value = useUser(user)

  return (
    <UserContext.Provider value={value}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </UserContext.Provider>
  )
}

CustomApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext)
  const { jwt_token: token } = nookies.get(appContext.ctx)

  if (!token) {
    return { ...appProps }
  }

  try {
    const { current_user } = await me(token)
    return { ...appProps, user: current_user }
  } catch (e) {
    console.error(e)
    return { ...appProps }
  }
}

export default CustomApp
