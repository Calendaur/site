import '../../styles/global.css'

import React from 'react'
import { AppProps } from 'next/app'

function CustomApp({ Component, pageProps, router: { events } }: AppProps) {
  return <Component {...pageProps} />
}

export default CustomApp
