import '../components/base.css'

import React from 'react'
import App from 'next/app'
import nookies from 'nookies'
import { Page } from '../components'
import { auth, UserContext } from '../core/auth'

class CustomApp extends App {
  static async getInitialProps(appContext) {
    const cookies = nookies.get(appContext.ctx)

    await auth.getProfile({ token: cookies.jwt_token })

    const appProps = await App.getInitialProps(appContext)

    return { ...appProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <UserContext.Provider
        value={{
          user: auth.me,
          logout: auth.logout,
        }}
      >
        <Page>
          <Component {...pageProps} />
        </Page>
      </UserContext.Provider>
    )
  }
}

export default CustomApp
