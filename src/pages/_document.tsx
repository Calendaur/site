import React from 'react'
import Document, {
  Head,
  Main,
  Html,
  NextScript,
  DocumentContext,
} from 'next/document'
import { extractCritical } from '@emotion/server'

class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    const styles = extractCritical(initialProps.html)

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            data-emotion-css={styles.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: styles.css }}
          />
        </>
      ),
    }
  }

  render() {
    return (
      <Html lang="ru" prefix="og: https://ogp.me/ns#">
        <Head>
          <link
            rel="preload"
            href="/fonts/Inter/400.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Inter/600.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Inter/800.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Montserrat/200.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <style
            dangerouslySetInnerHTML={{
              __html: `
                @font-face {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 400;
                  font-display: swap;
                  src: local(''), url('/fonts/Inter/400.woff2') format('woff2');
                }

                @font-face {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 600;
                  font-display: swap;
                  src: local(''), url('/fonts/Inter/600.woff2') format('woff2');
                }

                @font-face {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 800;
                  font-display: swap;
                  src: local(''), url('/fonts/Inter/800.woff2') format('woff2');
                }

                @font-face {
                  font-family: 'Montserrat';
                  font-style: normal;
                  font-weight: 200;
                  font-display: swap;
                  src: local(''), url('/fonts/Montserrat/200.woff2') format('woff2');
                }
          `,
            }}
          ></style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument
