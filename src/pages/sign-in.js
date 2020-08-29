import React from 'react'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { AuthForm } from 'components'
import { redirect } from 'shared/utils'
import { routes } from 'shared/constants'
import { me } from 'shared/api'

function SignInPage() {
  return (
    <>
      <Head>
        <title>Войти в аккаунт Released</title>
      </Head>
      <AuthForm buttonTitle="Войти" type="login" />
    </>
  )
}

SignInPage.getInitialProps = async ctx => {
  try {
    const { authorization: token } = parseCookies(ctx)

    if (!token) return {}

    const user = await me(token)

    if (user) {
      redirect(ctx, routes.ME)
      return {}
    }

    return {}
  } catch (e) {
    return {}
  }
}

export default SignInPage
