import React from 'react'
import Head from 'next/head'
import Footer from '../Footer'

function Wrapper({ children }) {
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
        <meta name="description" content="Будьте в курсе новых релизов" />
        <meta property="og:type" content="website" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/pwa/apple-icon-180.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/pwa/apple-icon-167.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/pwa/apple-icon-152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/pwa/apple-icon-120.png"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link
          rel="apple-touch-startup-image"
          href="/pwa/apple-splash-dark-2048-2732.png"
          media="(prefers-color-scheme: dark) and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/pwa/apple-splash-dark-2732-2048.png"
          media="(prefers-color-scheme: dark) and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/pwa/apple-splash-dark-1668-2388.png"
          media="(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/pwa/apple-splash-dark-2388-1668.png"
          media="(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/pwa/apple-splash-dark-1668-2224.png"
          media="(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/pwa/apple-splash-dark-2224-1668.png"
          media="(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/pwa/apple-splash-dark-1536-2048.png"
          media="(prefers-color-scheme: dark) and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/pwa/apple-splash-dark-2048-1536.png"
          media="(prefers-color-scheme: dark) and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/pwa/apple-splash-dark-1242-2688.png"
          media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/pwa/apple-splash-dark-2688-1242.png"
          media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/pwa/apple-splash-dark-1125-2436.png"
          media="(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/pwa/apple-splash-dark-2436-1125.png"
          media="(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/pwa/apple-splash-dark-828-1792.png"
          media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/pwa/apple-splash-dark-1792-828.png"
          media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/pwa/apple-splash-dark-1242-2208.png"
          media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/pwa/apple-splash-dark-2208-1242.png"
          media="(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/pwa/apple-splash-dark-750-1334.png"
          media="(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/pwa/apple-splash-dark-1334-750.png"
          media="(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/pwa/apple-splash-dark-640-1136.png"
          media="(prefers-color-scheme: dark) and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/pwa/apple-splash-dark-1136-640.png"
          media="(prefers-color-scheme: dark) and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/pwa/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/pwa/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/pwa/favicon-16x16.png"
        />
        <meta name="msapplication-TileColor" content="#0f2027" />
        <meta
          name="msapplication-TileImage"
          content="/pwa/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#0f2027" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <script
          async
          defer
          data-domain="calendaur.com"
          src="https://plausible.io/js/plausible.js"
        ></script>
      </Head>
      {children}
      <Footer />
    </>
  )
}

export default Wrapper
