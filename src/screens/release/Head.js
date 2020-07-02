import React from 'react'
import NextHead from 'next/head'

function Head({ title, description, url, cover }) {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={title} />
      <meta property="og:image" content={cover} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={cover} />
      <link rel="image_src" href={cover} />
      <style
        dangerouslySetInnerHTML={{
          __html: `
              html {
                background-color: unset !important;
              }

              body {
                background-color: #000 !important;
              }
            `,
        }}
      ></style>
    </NextHead>
  )
}

export default Head
