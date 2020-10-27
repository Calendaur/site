import Head from 'next/head'
import styled from '@emotion/styled'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import { A } from 'components'
import { routes } from 'shared/constants'
import ReleaseCard from '../index/ReleaseCard'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
  grid-gap: 16px;

  > .card {
    height: 288px;
  }
`

const Description = styled.p`
  margin-bottom: var(--vertical-2);
`

const Zero = styled.p`
  a {
    text-decoration: underline;
  }
`

function TodayScreen({ releases }) {
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
      <h1>Премьеры {format(new Date(), 'd MMMM', { locale: ru })}</h1>
      <Description>
        Сегодняшние премьеры из&nbsp;мира игр, кино и&nbsp;сериалов
        на&nbsp;одной странице{' '}
        <span role="img" aria-label="high-voltage">
          ⚡
        </span>
      </Description>
      {releases.length ? null : (
        <Zero>
          Сегодня ничего нового не&nbsp;вышло{' '}
          <span role="img" aria-label="face">
            😑
          </span>
          . Все релизы месяца можно посмотреть&nbsp;
          <A href={routes.HOME}>здесь</A>
        </Zero>
      )}
      <Wrapper>
        {releases.map(release => (
          <ReleaseCard
            showType
            className="card"
            release={release}
            type={release.type}
          />
        ))}
      </Wrapper>
    </>
  )
}

export default TodayScreen
