import '../components/base.css'

import React from 'react'
import App from 'next/app'
import cookie from 'cookie'
import { Page } from '../components'
import { me } from '../core/api'
import { UserContext } from '../core/auth'

class CustomApp extends App {
  static async getInitialProps(appContext) {
    const request = appContext.ctx.req
    let token = null

    if (request) {
      request.cookies = cookie.parse(request.headers.cookie || '')
      token = request.cookies.jwt_token
    }

    const appProps = await App.getInitialProps(appContext)

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

  state = {
    user: this.props.user || null,
  }

  updateUser = updated => {
    this.setState({
      user: updated,
    })
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          updateUser: this.updateUser,
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
