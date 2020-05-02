import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import cx from 'classnames'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import { TargetBlankA, PlatformList, Footer } from '../../components'

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
}) {
  const [referrer, setReferrer] = useState('')
  const { back, query, push } = useRouter()
  const url = `https://calendaur.com/release/${query.id}`

  useEffect(() => {
    setReferrer(window.document.referrer)
  }, [id])

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
        return <p className={styles.Director}>{director}</p>
      case 'games':
        return (
          <PlatformList className={styles.PlatformList} platforms={platforms} />
        )
      case 'series':
        return <p className={styles.Season}>{season} сезон</p>
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
        <style
          dangerouslySetInnerHTML={{
            __html: `
              body {
                background-color: #000 !important;
              }

              main {
                min-height: calc(100vh - 195px) !important;
              }

              @media (min-width: 768px) {
                main {
                  min-height: calc(100vh - 162px) !important;
                }
              }
            `,
          }}
        ></style>
      </Head>
      <button
        type="button"
        className={styles.Back}
        onClick={() => {
          if (!referrer || !referrer.includes('calendaur.com')) {
            push('/')
          } else {
            back()
          }
        }}
      >
        <img src="/icons/back-1.svg" alt="Назад" />
      </button>
      <main className={styles.Content}>
        <div className={styles.Cover}>
          <div className={styles.Gradient}></div>
          <img src={cover} alt={title} />
        </div>
        <div className={styles.Info}>
          <p className={styles.Date}>
            {format(new Date(released), 'd MMMM yyyy', {
              locale: ru,
            })}
          </p>
          <h1 className={styles.Title}>{title}</h1>
          <div className={styles.Sharing}>
            <TargetBlankA
              href={`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`}
            >
              <img src="/icons/facebook.svg" alt="Поделиться через Facebook" />
            </TargetBlankA>
            <TargetBlankA
              href={`https://vk.com/share.php?url=${url}&title=${title}&utm_source=share2`}
            >
              <img src="/icons/vk.svg" alt="Поделиться через VK" />
            </TargetBlankA>
            <TargetBlankA
              href={`https://twitter.com/intent/tweet/?text=${title}&url=${url}`}
            >
              <img src="/icons/twitter.svg" alt="Поделиться через Twitter" />
            </TargetBlankA>
            <TargetBlankA href={`tg://msg_url?url=${url}&text=${title}`}>
              <img src="/icons/telegram.svg" alt="Поделиться через Telegram" />
            </TargetBlankA>
          </div>
          {renderMetaBlock()}
          <p className={styles.Description}>{description}</p>
          {type === 'films' || type === 'series'
            ? renderFilmInfoButtons()
            : null}
        </div>
      </main>
      <Footer className={styles.Footer} />
    </>
  )
}

export default Release
