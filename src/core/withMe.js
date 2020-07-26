import React, { PureComponent } from 'react'
import nookies from 'nookies'
import { me } from 'core/api'
import { redirect } from 'core/url'
import { AUTH, ME } from 'core/routes'

const protectedPages = new Set([ME])

const withMe = Page => {
  return class PageWithUser extends PureComponent {
    static async getInitialProps(ctx) {
      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps(ctx)
        : {}

      const { jwt_token: token } = nookies.get(ctx)
      let user = null

      if (token) {
        try {
          const { current_user } = await me(token)
          user = current_user
        } catch (e) {
          console.error(e)
        }
      }

      if (!user && protectedPages.has(ctx.asPath)) {
        redirect(ctx, AUTH)
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
