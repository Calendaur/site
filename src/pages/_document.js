import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

class CustomDocument extends Document {
  render() {
    return (
      <html lang="ru" prefix="og: https://ogp.me/ns#">
        <Head />
        <body>
          <Main />
          <div id="release-info-modal" />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default CustomDocument
