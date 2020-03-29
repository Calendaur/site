import 'sanitize.css'
import '../components/Wrapper/global.css'

import React from 'react'
import App from 'next/app'
import { Wrapper } from '../components'

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    )
  }
}

export default CustomApp
