import React, { PureComponent } from 'react'
import nookies from 'nookies'
import { me } from 'core/api'

const withMe = Page => {
  return class PageWithUser extends PureComponent {
    static async getInitialProps(ctx) {
      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps(ctx)
        : {}

      const { jwt_token: token } = nookies.get(ctx)
      let user

      try {
        const { current_user } = await me(token)
        user = current_user
      } catch (e) {
        user = null
      }

      return {
        ...pageProps,
        user: user ? { ...user, token } : null,
        token,
      }
    }

    render() {
      return <Page {...this.props} />
    }
  }
}

export default withMe
