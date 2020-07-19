import '../components/base.css'

import React from 'react'
import App from 'next/app'
import nookies from 'nookies'
import { Page } from '../components'
import { auth, UserContext, useUser } from '../core/auth'

function CustomApp({ Component, pageProps, user }) {
  console.log('user', user)
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
  const cookies = nookies.get(appContext.ctx)

  let user = null

  if (cookies.jwt_token) {
    await auth.getProfile(
      { token: cookies.jwt_token },
      authed => {
        console.log('authed', authed)
        user = authed
      },
      () => {
        console.log('eeeeeeeeeeerrrrrrrrrrrrrror')
        user = null
      },
    )
  }

  const appProps = await App.getInitialProps(appContext)

  return { ...appProps, user }
}

export default CustomApp
