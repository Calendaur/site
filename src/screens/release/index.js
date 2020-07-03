import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import { Title, Button, Subtitle } from '../../components'
import Head from './Head'
import ExtraInfo from './ExtraInfo'
import StoreButtons from './StoreButtons'
import StreamingServicesButtons from './StreamingServicesButtons'
import FilmButtons from './FilmButtons'
import Sharing from './Sharing'
import Trailer from './Trailer'
import { getRusReleaseType } from '../../core/helpers'

import styles from './styles.module.css'

function Release({
  id,
  type,
  title,
  description,
  released,
  cover,
  director,
  platforms,
  season,
  kinopoisk_url,
  imdb_url,
  trailer_url,
  is_digital,
  stores,
  original_title,
}) {
  const { query } = useRouter()
  const url = `https://released.at/release/${query.id}`

  return (
    <>
      <Head title={title} description={description} url={url} cover={cover} />
      <div className={styles.Breadcrumbs}>
        <Link
          href={`/${type}/${format(
            new Date(released),
            'MMMM-yyyy',
          )}`.toLowerCase()}
        >
          <a>
            {getRusReleaseType(type, true)}{' '}
            {format(new Date(released), 'MMM yyyy', {
              locale: ru,
            })}
          </a>
        </Link>
        <span> / </span>
        <Link href={`/release/${query.id}`}>
          <a>{title}</a>
        </Link>
      </div>
      <div className={styles.Cover}>
        <div className={styles.Gradient}></div>
        <img loading="lazy" src={cover} alt={title} />
      </div>
      <Title className={styles.Title}>{title}</Title>
      {original_title && (
        <Subtitle className={styles.OriginalTitle} size={5}>
          {original_title}
        </Subtitle>
      )}
      <div className={styles.Description}>
        <div className={styles.Data}>
          <header>
            <div>
              {format(new Date(released), 'd MMMM yyyy', {
                locale: ru,
              })}
            </div>
            <div>{getRusReleaseType(type)}</div>
            {type === 'films' && is_digital === true ? (
              <div>Цифровой релиз</div>
            ) : null}
            {type === 'films' && is_digital === false ? (
              <div>Релиз в кинотеатре</div>
            ) : null}
          </header>
          {trailer_url && (
            <Button
              className={styles.WatchTrailer}
              onClick={() => {
                const trailerEl = document.querySelector(`.${styles.Trailer}`)
                trailerEl.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
            >
              Смотреть трейлер
            </Button>
          )}
          <ExtraInfo
            type={type}
            director={director}
            platforms={platforms}
            season={season}
          />
          <div className={styles.Text}>{description}</div>
          <Sharing title={title} url={url} />
          <FilmButtons type={type} kinopoisk={kinopoisk_url} imdb={imdb_url} />
          {/* <StreamingServicesButtons type={type} /> */}
          <StoreButtons type={type} stores={stores} />
        </div>
        {trailer_url && <Trailer url={trailer_url} />}
      </div>
    </>
  )
}

export default Release
