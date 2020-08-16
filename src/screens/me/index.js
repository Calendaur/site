import React from 'react'
import Head from 'next/head'
import { compareAsc } from 'date-fns'
import Card from 'screens/main/ReleaseCard'
import { useUser } from 'features/user/use-user'

import styles from './styles.module.css'

function actual(arr) {
  return arr.filter(i => compareAsc(new Date(), new Date(i.released)) <= 0)
}

function nonActual(arr) {
  return arr.filter(i => compareAsc(new Date(), new Date(i.released)) > 0)
}

function Me({ user: ssrUser }) {
  const { user } = useUser(ssrUser)

  if (!user) return null

  const actualFilms = actual(user.extensions.movies)
  const actualGames = actual(user.extensions.games)
  const actualSeries = actual(user.extensions.serials)

  const nonActualFilms = nonActual(user.extensions.movies)
  const nonActualGames = nonActual(user.extensions.games)
  const nonActualSeries = nonActual(user.extensions.serials)

  const hasNonActual =
    [...nonActualFilms, ...nonActualGames, ...nonActualSeries].length > 0

  return (
    <>
      <Head>
        <title>Личный кабинет</title>
      </Head>
      <section className={styles.ExpectedReleases}>
        <h1>Ожидаемые релизы</h1>
        <p className={styles.Note}>
          Чтобы добавить релиз в этот список, откройте его карточку и нажмите
          <span>Жду</span>.
        </p>
        <div className={styles.ReleasesSection}>
          <h3>Кино</h3>
          {actualFilms.length ? (
            <div className={styles.Grid}>
              {actualFilms.map(film => (
                <Card showDate type="films" release={film} />
              ))}
            </div>
          ) : (
            <p>Нет ожидаемых фильмов</p>
          )}
        </div>
        <div className={styles.ReleasesSection}>
          <h3>Сериалы</h3>
          {actualSeries.length ? (
            <div className={styles.Grid}>
              {actualSeries.map(series => (
                <Card showDate type="series" release={series} />
              ))}
            </div>
          ) : (
            <p>Нет ожидаемых сериалов</p>
          )}
        </div>
        <div className={styles.ReleasesSection}>
          <h3>Игры</h3>
          {actualGames.length ? (
            <div className={styles.Grid}>
              {actualGames.map(game => (
                <Card showDate type="games" release={game} />
              ))}
            </div>
          ) : (
            <p>Нет ожидаемых игр</p>
          )}
        </div>
      </section>
      {hasNonActual ? (
        <section>
          <h1>Уже вышли</h1>
          <p>
            Сюда автоматически попадают ваши ожидаемые релизы после выхода.
            Также вы&nbsp;можете нажать кнопку <span>В&nbsp;закладки</span> для
            добавления релиза&nbsp;в этот список.
          </p>
          {nonActualFilms.length ? (
            <div className={styles.ReleasesSection}>
              <h3>Кино</h3>
              <div className={styles.Grid}>
                {nonActualFilms.map(film => (
                  <Card showDate type="films" release={film} />
                ))}
              </div>
            </div>
          ) : null}
          {nonActualSeries.length ? (
            <div className={styles.ReleasesSection}>
              <h3>Сериалы</h3>
              <div className={styles.Grid}>
                {nonActualSeries.map(series => (
                  <Card showDate type="series" release={series} />
                ))}
              </div>
            </div>
          ) : null}
          {nonActualGames.length ? (
            <div className={styles.ReleasesSection}>
              <h3>Игры</h3>
              <div className={styles.Grid}>
                {nonActualGames.map(game => (
                  <Card showDate type="games" release={game} />
                ))}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}
    </>
  )
}

export default Me
