import { useRouter } from 'next/router'
import Image from 'next/image'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import slugify from '@sindresorhus/slugify'
import {
  Title,
  Text,
  Button,
  ExpectButton,
  Breadcrumbs,
  PostsGrid,
} from 'components'
import { ReleaseType, ReleaseWithDetails } from 'types/common'
import Meta from './Meta'
import ExtraInfo from './ExtraInfo'
import StoreButtons from './StoreButtons'
import StreamingServicesButtons from './StreamingServicesButtons'
import FilmButtons from './FilmButtons'
import Sharing from './Sharing'
import Trailer from './Trailer'

import styles from './styles.module.css'

function getRusReleaseType(type: ReleaseType, some: boolean = false) {
  switch (type) {
    case ReleaseType.Series:
      return `Сериал${some ? 'ы' : ''}`
    case ReleaseType.Films:
      return 'Кино'
    case ReleaseType.Games:
      return `Игр${some ? 'ы' : 'а'}`
  }
}

interface Props {
  release: ReleaseWithDetails
}

function Release({ release }: Props) {
  const { query } = useRouter()
  const { title, cover, released, trailer, description } = release
  const slug = slugify(title)
  const url = `https://released.at/release/${query.id}-${slug}`

  return (
    <>
      <Meta release={release} url={url} />
      <div className={styles.Release}>
        <Breadcrumbs
          className={styles.Breadcrumbs}
          links={[
            {
              href: `/${release.type}/[date]`,
              as: `/${release.type}/${format(
                new Date(released),
                'MMMM-yyyy',
              )}`.toLowerCase(),
              title: `${getRusReleaseType(release.type, true)} ${format(
                new Date(released),
                'LLLL yyyy',
                {
                  locale: ru,
                },
              )}`,
            },
            {
              href: '',
              title,
            },
          ]}
        />
        <div className={styles.Cover}>
          <div className={styles.Gradient} />
          <Image src={cover} alt={title} layout="fill" />
        </div>
        <div className={styles.ReleaseDate}>
          {format(new Date(released), 'd MMMM yyyy', {
            locale: ru,
          })}
        </div>
        <div className={styles.Titles}>
          <Title>{title}</Title>
          {(release.type === ReleaseType.Films ||
            release.type === ReleaseType.Series) &&
          release.original_title ? (
            <Title h2>{release.original_title}</Title>
          ) : null}
        </div>
        <div className={styles.Description}>
          <div className={styles.Data}>
            <div className={styles.Buttons}>
              {trailer && (
                <Button
                  className={styles.ScrollToTrailer}
                  onClick={() => {
                    const trailerEl = document.querySelector('#trailer')
                    trailerEl.scrollIntoView({
                      behavior: 'smooth',
                    })
                  }}
                >
                  К трейлеру
                </Button>
              )}
              <ExpectButton
                withText
                className={styles.Expect}
                release={release}
              />
            </div>
            <Text>{description}</Text>
            <ExtraInfo release={release} />
            {release.type === ReleaseType.Films ||
            release.type === ReleaseType.Series ? (
              <>
                <FilmButtons
                  kinopoisk={{
                    link: release.kinopoisk_url,
                    rating: release.kinopoisk_rating,
                  }}
                  imdb={{
                    link: release.imdb_url,
                    rating: release.imdb_rating,
                  }}
                />
                {release.streaming_services.length > 0 && (
                  <StreamingServicesButtons
                    services={release.streaming_services}
                  />
                )}
              </>
            ) : null}
            {release.type === ReleaseType.Games && release.stores.length > 0 ? (
              <StoreButtons stores={release.stores} />
            ) : null}
            <Sharing title={title} url={url} />
            {release.related_articles && release.related_articles.length > 0 ? (
              <div className={styles.Articles}>
                <p>Статьи, в которых упомянут релиз:</p>
                <PostsGrid posts={release.related_articles} />
              </div>
            ) : null}
          </div>
          {trailer && <Trailer url={trailer} />}
        </div>
      </div>
    </>
  )
}

export default Release
