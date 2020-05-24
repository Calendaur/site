import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import cx from 'classnames'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import getYouTubeId from 'get-youtube-id'
import { TargetBlankA, PlatformList, Header } from '../../components'
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
}) {
  const { query } = useRouter()
  const url = `https://calendaur.com/release/${query.id}`

  function renderFilmInfoButtons() {
    return (
      <div className={styles.Buttons}>
        {kinopoisk_url && (
          <TargetBlankA
            href={kinopoisk_url}
            className={cx(styles.Button, styles.Kinopoisk)}
          >
            <img src="/icons/kinopoisk.svg" alt="КиноПоиск" />
          </TargetBlankA>
        )}
        {imdb_url && (
          <TargetBlankA
            href={imdb_url}
            className={cx(styles.Button, styles.Imdb)}
          >
            <img src="/icons/imdb.svg" alt="IMDB" />
          </TargetBlankA>
        )}
      </div>
    )
  }

  function renderMetaBlock() {
    switch (type) {
      case 'films':
        return (
          <>
            <div className={styles.Label}>Режиссер:</div>
            <div className={styles.Value}>{director}</div>
          </>
        )
      case 'games':
        return (
          <>
            <div className={styles.Label}>Платформы:</div>
            <div className={styles.Value}>
              <PlatformList
                className={styles.PlatformList}
                platforms={platforms}
              />
            </div>
          </>
        )
      case 'series':
        return (
          <>
            <div className={styles.Label}>Сезон:</div>
            <div className={styles.Value}>{season}</div>
          </>
        )
    }
  }

  return (
    <>
      <Head>
        <title>Calendaur | {title}</title>
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
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              body {
                background-color: #000 !important;
              }
            `,
          }}
        ></style>
      </Head>
      <Header hasBack />
      <main className={styles.Content}>
        <div className={styles.Cover}>
          <div className={styles.Gradient}></div>
          <img loading="lazy" src={cover} alt={title} />
        </div>
        <h1 className={styles.Title}>{title}</h1>
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
                <div title="Цифровой релиз">
                  <img src="/icons/digital.svg" alt="" />
                </div>
              ) : null}
              {type === 'films' && is_digital === false ? (
                <div title="Релиз в кинотеатре">
                  <img src="/icons/cinema.svg" alt="" />
                </div>
              ) : null}
            </header>
            <div className={styles.Sharing}>
              <span>Поделиться:</span>
              <div>
                <TargetBlankA
                  href={`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`}
                >
                  <img
                    src="/icons/facebook.svg"
                    alt="Поделиться через Facebook"
                  />
                </TargetBlankA>
                <TargetBlankA
                  href={`https://vk.com/share.php?url=${url}&title=${title}&utm_source=share2`}
                >
                  <img src="/icons/vk.svg" alt="Поделиться через VK" />
                </TargetBlankA>
                <TargetBlankA
                  href={`https://twitter.com/intent/tweet/?text=${title}&url=${url}`}
                >
                  <img
                    src="/icons/twitter.svg"
                    alt="Поделиться через Twitter"
                  />
                </TargetBlankA>
                <TargetBlankA href={`tg://msg_url?url=${url}&text=${title}`}>
                  <img
                    src="/icons/telegram.svg"
                    alt="Поделиться через Telegram"
                  />
                </TargetBlankA>
              </div>
            </div>
            <div className={styles.Text}>{description}</div>
            <div className={styles.Meta}>{renderMetaBlock()}</div>
            {type === 'films' || type === 'series'
              ? renderFilmInfoButtons()
              : null}
          </div>
          {trailer_url && (
            <div className={styles.Trailer}>
              <div className={styles.aspectRatio}>
                <iframe
                  title="Trailer"
                  frameBorder="0"
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${getYouTubeId(
                    trailer_url,
                  )}`}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default Release
