import React from 'react'
import Head from 'next/head'
import { useFullURL } from 'shared/hooks'
import { META_IMG } from 'shared/constants'

function Meta() {
  const url = useFullURL()
  const title =
    'Какой фильм посмотреть или что посмотреть вечером? Выберите сами на released.at'
  const description =
    'Если вы не знаете какой фильм посмотреть, то можете воспользоваться нашим сервисом по подбору'

  return (
    <Head>
      {/* Main */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={META_IMG} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={META_IMG} />
    </Head>
  )
}

export default Meta
