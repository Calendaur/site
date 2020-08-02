import React from 'react'
import Head from 'next/head'
import { AuthForm } from 'components'

function SignInPage() {
  return (
    <>
      <Head>
        <title>Войти в аккаунт released.at</title>
      </Head>
      <div>
        <AuthForm buttonTitle="Войти" />
      </div>
    </>
  )
}

export default SignInPage
