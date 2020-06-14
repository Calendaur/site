import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import { Header, MainPageContent, Title } from '../../components'
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
}) {
  const { query } = useRouter()
  const url = `https://calendaur.com/release/${query.id}`

  return (
    <>
      <Head title={title} description={description} url={url} cover={cover} />
      <Header hasBack />
      <MainPageContent className={styles.Content}>
        <div className={styles.Breadcrumbs}>
          <Link
            href={`/${type}/${format(
              new Date(released),
              'MMMM-yyyy',
            )}`.toLowerCase()}
          >
            <a>
              {getRusReleaseType(type)}{' '}
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
                <div>В цифре</div>
              ) : null}
              {type === 'films' && is_digital === false ? (
                <div>В кино</div>
              ) : null}
            </header>
            <ExtraInfo
              type={type}
              director={director}
              platforms={platforms}
              season={season}
            />
            <div className={styles.Text}>{description}</div>
            <Sharing title={title} url={url} />
            <FilmButtons
              type={type}
              kinopoisk={kinopoisk_url}
              imdb={imdb_url}
            />
            {/* <StreamingServicesButtons type={type} />
            <StoreButtons type={type} stores={stores} /> */}
          </div>
          {trailer_url && <Trailer url={trailer_url} />}
        </div>
      </MainPageContent>
    </>
  )
}

export default Release
