import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

class CustomDocument extends Document {
  render() {
    return (
      <html lang="ru" prefix="og: https://ogp.me/ns#">
        <Head />
        <body>
          <noscript>
            <div>
              <img
                src="https://mc.yandex.ru/watch/65614006"
                style={{ position: 'absolute', left: -9999 }}
                alt=""
              />
            </div>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default CustomDocument
