import React from 'react'
import Head from 'next/head'
import { AuthForm } from 'components'

function SignUpPage() {
  return (
    <>
      <Head>
        <title>Зарегистрироваться на released.at</title>
      </Head>
      <AuthForm buttonTitle="Зарегистрироваться" type="registration" />
    </>
  )
}

export default SignUpPage
