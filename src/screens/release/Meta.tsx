import Head from 'next/head'
import { GamePlatform, ReleaseType, ReleaseWithDetails } from 'types/common'

const platformsDict = {
  [GamePlatform.PC]: 'PC',
  [GamePlatform.PS4]: 'Playstation 4',
  [GamePlatform.PS5]: 'Playstation 5',
  [GamePlatform.XboxOne]: 'Xbox One',
  [GamePlatform.XboxSeries]: 'Xbox Series X, Xbox Series S',
  [GamePlatform.NintendoSwitch]: 'Nintendo Switch',
}

interface Props {
  url: string
  release: ReleaseWithDetails
}

function Meta({ release, url }: Props) {
  const { title: releaseTitle, cover } = release

  let title = ''
  let description = ''

  if (release.type === ReleaseType.Films) {
    title = `${releaseTitle} дата выхода`
    description = `Дата выхода ${releaseTitle}. Где смотреть, трейлер, информация о фильме`
  }

  if (release.type === ReleaseType.Games) {
    title = `${releaseTitle} дата выхода на ${release.platforms
      .map(p => platformsDict[p])
      .join(', ')}, купить игру ${releaseTitle}`
    description = `Дата выхода ${releaseTitle}. Где купить, трейлер, информация об игре`
  }

  if (release.type === ReleaseType.Series) {
    title = `${releaseTitle} дата выхода ${release.season} сезон`
    description = `Дата выхода ${release.season} сезона ${releaseTitle}. Где смотреть, трейлер, информация о сериале`
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
    </Head>
  )
}

export default Meta
