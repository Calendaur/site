import React from 'react'
import Head from 'next/head'
import { AuthForm } from 'components'

function SignInPage() {
  return (
    <>
      <Head>
        <title>Войти в аккаунт released.at</title>
      </Head>
      <AuthForm buttonTitle="Войти" type="login" />
    </>
  )
}

export default SignInPage
