import React from 'react'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { AuthForm } from 'components'
import { redirect } from 'shared/utils'
import { routes } from 'shared/constants'
import { me } from 'shared/api'

function SignUpPage() {
  return (
    <>
      <Head>
        <title>Зарегистрироваться на Released</title>
      </Head>
      <AuthForm buttonTitle="Зарегистрироваться" type="registration" />
    </>
  )
}

SignUpPage.getInitialProps = async ctx => {
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

export default SignUpPage
