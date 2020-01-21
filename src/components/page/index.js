import React from 'react'
import Head from 'next/head'
import { useFirebase } from '../../hooks'

function Page({ children }) {
  useFirebase(firebase => {
    firebase.analytics()
  }, [])

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie-edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta httpEquiv="content-type" content="text/html;charset=utf-8" />
        <meta name="keywords" content="" />
        <link rel="shortcut icon" type="image/png" href="/images/logo.png" />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      {children}
    </>
  )
}

export default Page
