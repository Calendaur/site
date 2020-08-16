import React from 'react'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import ru from 'date-fns/locale/ru'
import { Button, ExpectButton, Image, A } from 'components'
import { getRusReleaseType } from 'core/helpers'
import Head from './Head'
import ExtraInfo from './ExtraInfo'
import StoreButtons from './StoreButtons'
// import StreamingServicesButtons from './StreamingServicesButtons'
import FilmButtons from './FilmButtons'
import Sharing from './Sharing'
import Trailer from './Trailer'

import styles from './styles.module.css'

function Release({
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
  stores,
  original_title,
  rawg_io_fields,
  id,
}) {
  const { query } = useRouter()
  const url = `https://released.at/release/${query.id}`

  return (
    <>
      <Head title={title} description={description} url={url} cover={cover} />
      <div className={styles.Breadcrumbs}>
        <A
          href={`/${type}/[date]`}
          as={`/${type}/${format(
            new Date(released),
            'MMMM-yyyy',
          )}`.toLowerCase()}
        >
          {getRusReleaseType(type, true)}{' '}
          {format(new Date(released), 'LLLL yyyy', {
            locale: ru,
          })}
        </A>
        <span> / </span>
        <p>{title}</p>
      </div>
      <div className={styles.Cover}>
        <div className={styles.Gradient} />
        <Image src={cover} alt={title} />
      </div>
      <div className={styles.ReleaseDate}>
        {format(new Date(released), 'd MMMM yyyy', {
          locale: ru,
        })}
      </div>
      <div className={styles.Titles}>
        <h1>{title}</h1>
        {original_title && (
          <h2 className={styles.OriginalTitle}>{original_title}</h2>
        )}
      </div>
      <div className={styles.Description}>
        <div className={styles.Data}>
          <div className={styles.Buttons}>
            {trailer_url && (
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
              className={styles.Expect}
              release={{ released, release_id: query.id, id }}
            />
          </div>
          <div className={styles.Text}>{description}</div>
          <ExtraInfo
            type={type}
            director={director}
            platforms={platforms}
            season={season}
          />
          <FilmButtons type={type} kinopoisk={kinopoisk_url} imdb={imdb_url} />
          {/* <StreamingServicesButtons type={type} /> */}
          <StoreButtons
            type={type}
            rawgStores={rawg_io_fields?.stores}
            stores={stores}
          />
          <Sharing title={title} url={url} />
        </div>
        {trailer_url && <Trailer url={trailer_url} />}
      </div>
    </>
  )
}

export default Release
