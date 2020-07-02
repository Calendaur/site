import '../components/base.css'

import React from 'react'
import App from 'next/app'
import { Page } from '../components'

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <Page>
        <Component {...pageProps} />
      </Page>
    )
  }
}

export default CustomApp
