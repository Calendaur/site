import React from 'react'
import Head from 'next/head'

const platformsDict = {
  pc: 'PC',
  ps_4: 'Playstation 4',
  xbox_one: 'Xbox One',
  nintendo_switch: 'Nintendo Switch',
}

function Meta({ title: releaseTitle, url, cover, type, platforms, season }) {
  let title
  let description

  if (type === 'films') {
    title = `${releaseTitle} дата выхода на Released`
    description = `Узнайте дату выхода фильма ${releaseTitle}. Подпишитесь на уведомления, чтобы не пропустить релиз`
  }

  if (type === 'games') {
    title = `${releaseTitle} дата выхода на ${platforms
      .map(p => platformsDict[p])
      .join(', ')}, купить игру ${releaseTitle} на Released`
    description = `Узнайте дату выхода игры ${releaseTitle}. Подпишитесь на уведомления, чтобы не пропустить релиз`
  }

  if (type === 'series') {
    title = `${releaseTitle} дата выхода ${season} сезон на Released`
    description = `Узнайте дату выхода нового сезона сериала ${releaseTitle}. Подпишитесь на уведомления, чтобы не пропустить релиз`
  }

  return (
    <Head>
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
    </Head>
  )
}

export default Meta
