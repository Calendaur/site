import Head from 'next/head'
import Link from 'next/link'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import {
  ReleaseCard,
  ResponsiveGrid,
  TitleWithDescription,
  Title,
  Text,
} from 'components-css'
import { Source } from 'components-css/ReleaseCard'
import { routes } from 'shared/constants'
import { ReleaseInList } from 'types/common'

interface Props {
  releases: ReleaseInList[]
}

function TodayScreen({ releases }: Props) {
  const title = 'Сегодняшние премьеры на released.at'
  const description =
    'На какой фильм сегодня сходить в кино? Сезон какого сериала вышел сегодня? Узнайте на released.at'

  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://released.at/today" />
        <meta property="twitter:url" content="https://released.at/today" />
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:site_name" content={title} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://released.at/images/banner.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:text:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image:src"
          content="https://released.at/images/banner.jpg"
        />
        <link rel="image_src" href="https://released.at/images/banner.jpg" />
        <title>{title}</title>
      </Head>
      <TitleWithDescription>
        <Title>Премьеры {format(new Date(), 'd MMMM', { locale: ru })}</Title>
        {releases.length ? (
          <Text>
            Сегодняшние премьеры из&nbsp;мира игр, кино и&nbsp;сериалов
            на&nbsp;одной странице{' '}
            <span role="img" aria-label="high-voltage">
              ⚡
            </span>
          </Text>
        ) : (
          <Text>
            Сегодня ничего нового не&nbsp;вышло{' '}
            <span role="img" aria-label="face">
              😑
            </span>
            . Все релизы месяца можно посмотреть&nbsp;
            <Link href={routes.HOME}>
              <a className="underline">здесь</a>
            </Link>
          </Text>
        )}
      </TitleWithDescription>
      <ResponsiveGrid>
        {releases.map(release => (
          <ReleaseCard release={release} source={Source.Today} />
        ))}
      </ResponsiveGrid>
    </>
  )
}

export default TodayScreen
