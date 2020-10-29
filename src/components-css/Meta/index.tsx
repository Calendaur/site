import Head from 'next/head'

function Meta() {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie-edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <meta name="keywords" content="" />
      <meta name="description" content="Будьте в курсе новых релизов" />
      <meta property="og:type" content="website" />
      <meta name="yandex-verification" content="5db1a243ea86b573" />
      <link
        rel="apple-touch-icon"
        href="/pwa/apple-touch-icon-iphone-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/pwa/apple-touch-icon-ipad-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/pwa/apple-touch-icon-iphone-retina-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/pwa/apple-touch-icon-ipad-retina-152x152.png"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" type="image/jpg" href="/icons/favicon.jpg" />
      <meta name="msapplication-TileColor" content="#0b0b0b" />
      <meta name="msapplication-TileImage" content="/pwa/ms-icon-144x144.png" />
      <meta name="theme-color" content="#0b0b0b" />
      <script
        async
        defer
        data-domain="released.at"
        src="https://plausible.io/js/plausible.js"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`,
        }}
      ></script>
      <link
        rel="preconnect"
        href="https://api.released.at"
        crossOrigin="anonymous"
      />
      <link rel="dns-prefetch" href="//api.released.at" />
    </Head>
  )
}

export default Meta
