import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQueryCache, useMutation } from 'react-query'
import { remove } from 'js-cookie'
import compareAsc from 'date-fns/compareAsc'
import { Button, Title, Text } from 'components-css'
import { logout } from 'shared/api'
import { routes, endpoints, cookies } from 'shared/constants'
import ReleasesGrid from './ReleasesGrid'

import styles from './styles.module.css'

function prepareData(arr) {
  let result = {
    actual: [],
    nonActual: [],
  }

  arr.forEach(i => {
    if (compareAsc(new Date(), new Date(i.released)) <= 0) {
      result.actual.push(i)
    } else {
      result.nonActual.push(i)
    }
  })

  return result
}

function Me({ user }) {
  const queryCache = useQueryCache()
  const { push } = useRouter()
  const [signOut] = useMutation(logout, {
    onSuccess: async () => {
      remove(cookies.AUTHORIZATION)
      queryCache.invalidateQueries(endpoints.PROFILE)
      push(routes.HOME)
    },
  })
  const { expected, email } = user

  const films = prepareData(expected.films)
  const games = prepareData(expected.games)
  const series = prepareData(expected.series)

  const hasActual = [...films.actual, games.actual, series.actual].length > 0
  const hasNonActual =
    [...films.nonActual, ...games.nonActual, ...series.nonActual].length > 0

  const noReleases = !hasActual && !hasNonActual

  return (
    <>
      <Head>
        <title>Личный кабинет</title>
      </Head>
      <Title>{email}</Title>
      {noReleases && (
        <Text>
          Сейчас у&nbsp;вас нет ожидаемых релизов. Чтобы их&nbsp;добавить,
          нажмите на&nbsp;кнопку с&nbsp;огнем или с&nbsp;закладкой
          в&nbsp;карточке релиза. В&nbsp;день релиза вы&nbsp;получите
          пуш-уведомление, поэтому не&nbsp;забудьте их&nbsp;включить. Если релиз
          еще не&nbsp;вышел, то&nbsp;он&nbsp;попадет в&nbsp;секцию
          &laquo;Ожидаемые релизы&raquo;, а&nbsp;если уже вышел,
          то&nbsp;в&nbsp;секцию &laquo;Уже вышло&raquo;.
        </Text>
      )}
      {hasActual ? (
        <section className={styles.Section}>
          <Title h2>Ожидаемые релизы</Title>
          <ReleasesGrid title="Кино" releases={films.actual} />
          <ReleasesGrid title="Сериалы" releases={series.actual} />
          <ReleasesGrid title="Игры" releases={games.actual} last />
        </section>
      ) : (
        <Text>Нет ожидаемых релизов</Text>
      )}
      {hasNonActual && (
        <section className={styles.Section}>
          <Title h2>Вышедшие релизы</Title>
          <ReleasesGrid title="Кино" releases={films.nonActual} />
          <ReleasesGrid title="Сериалы" releases={series.nonActual} />
          <ReleasesGrid title="Игры" releases={games.nonActual} last />
        </section>
      )}
      <Button
        secondary
        onClick={() => {
          signOut()
        }}
      >
        Выйти
      </Button>
    </>
  )

  // return (
  //   <>
  //     <Head>
  //       <title>Личный кабинет</title>
  //     </Head>
  //     <ExpectedReleases>
  //       <Title>Ожидаемые релизы</Title>
  //       <Note>
  //         Чтобы добавить релиз в этот список, откройте его карточку и нажмите
  //         <span>Жду</span>.
  //       </Note>
  //       <ReleasesSection>
  //         <h3>Кино</h3>
  //         {actualFilms.length ? (
  //           <Grid>
  //             {actualFilms.map(film => (
  //               <ReleaseCard
  //                 key={`actual-${film.release_id}`}
  //                 showDate
  //                 type="films"
  //                 release={film}
  //               />
  //             ))}
  //           </Grid>
  //         ) : (
  //           <p>Нет ожидаемых фильмов</p>
  //         )}
  //       </ReleasesSection>
  //       <ReleasesSection>
  //         <h3>Сериалы</h3>
  //         {actualSeries.length ? (
  //           <Grid>
  //             {actualSeries.map(series => (
  //               <ReleaseCard
  //                 key={`actual-${series.release_id}`}
  //                 showDate
  //                 type="series"
  //                 release={series}
  //               />
  //             ))}
  //           </Grid>
  //         ) : (
  //           <p>Нет ожидаемых сериалов</p>
  //         )}
  //       </ReleasesSection>
  //       <ReleasesSection>
  //         <h3>Игры</h3>
  //         {actualGames.length ? (
  //           <Grid>
  //             {actualGames.map(game => (
  //               <ReleaseCard
  //                 key={`actual-${game.release_id}`}
  //                 showDate
  //                 type="games"
  //                 release={game}
  //               />
  //             ))}
  //           </Grid>
  //         ) : (
  //           <p>Нет ожидаемых игр</p>
  //         )}
  //       </ReleasesSection>
  //     </ExpectedReleases>
  //     {hasNonActual ? (
  //       <ExpectedReleases>
  //         <h1>Уже вышли</h1>
  //         <Note>
  //           Сюда автоматически попадают ваши ожидаемые релизы после выхода.
  //           Также вы&nbsp;можете нажать кнопку <span>В&nbsp;закладки</span> для
  //           добавления релиза&nbsp;в этот список.
  //         </Note>
  //         {nonActualFilms.length ? (
  //           <ReleasesSection>
  //             <h3>Кино</h3>
  //             <Grid>
  //               {nonActualFilms.map(film => (
  //                 <ReleaseCard
  //                   key={`nonactual-${film.release_id}`}
  //                   showDate
  //                   type="films"
  //                   release={film}
  //                 />
  //               ))}
  //             </Grid>
  //           </ReleasesSection>
  //         ) : null}
  //         {nonActualSeries.length ? (
  //           <ReleasesSection>
  //             <h3>Сериалы</h3>
  //             <Grid>
  //               {nonActualSeries.map(series => (
  //                 <ReleaseCard
  //                   key={`nonactual-${series.release_id}`}
  //                   showDate
  //                   type="series"
  //                   release={series}
  //                 />
  //               ))}
  //             </Grid>
  //           </ReleasesSection>
  //         ) : null}
  //         {nonActualGames.length ? (
  //           <ReleasesSection>
  //             <h3>Игры</h3>
  //             <Grid>
  //               {nonActualGames.map(game => (
  //                 <ReleaseCard
  //                   key={`nonactual-${game.release_id}`}
  //                   showDate
  //                   type="games"
  //                   release={game}
  //                 />
  //               ))}
  //             </Grid>
  //           </ReleasesSection>
  //         ) : null}
  //       </ExpectedReleases>
  //     ) : null}
  //     <Button
  //       onClick={async () => {
  //         await logout()
  //         push(routes.HOME)
  //       }}
  //     >
  //       Выйти
  //     </Button>
  //   </>
  // )
}

export default Me
