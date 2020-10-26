import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQueryCache, useMutation } from 'react-query'
import { remove } from 'js-cookie'
import compareAsc from 'date-fns/compareAsc'
import { Button, ResponsiveGrid, Title, Text } from 'components-css'
import ReleaseCard, { Source } from 'components-css/ReleaseCard'
import { logout } from 'shared/api'
import { routes, endpoints, cookies } from 'shared/constants'

// const ExpectedReleases = styled.section`
//   margin-bottom: var(--vertical-1);

//   & > h1 {
//     line-height: 1;
//   }

//   & > h3 {
//     margin-bottom: var(--vertical-6);
//   }
// `

// const Note = styled.p`
//   margin: 0;
//   margin-bottom: var(--vertical-5);
//   font-size: 14px;
//   color: var(--secondary-text);

//   & > span {
//     padding: 1px 4px;
//     margin-left: var(--horizontal-6);
//     color: var(--black);
//     white-space: nowrap;
//     background-color: #dbdbdb;
//     border-radius: 4px;
//   }
// `

// const ReleasesSection = styled.div`
//   margin-bottom: var(--vertical-4);
// `

// const Grid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
//   grid-gap: 16px;

//   & > a {
//     height: 200px;
//   }
// `

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

  return (
    <>
      <Head>
        <title>Личный кабинет</title>
      </Head>
      <Title>{email}</Title>
      {hasActual ? (
        <section>
          <Title h2>Ожидаемые релизы</Title>
          <Title h3>Кино</Title>
          {films.actual.length ? (
            <ResponsiveGrid tileWidth={288}>
              {films.actual.map(r => (
                <ReleaseCard
                  key={r.release_id}
                  release={r}
                  source={Source.Profile}
                />
              ))}
            </ResponsiveGrid>
          ) : null}
          <Title h3>Сериалы</Title>
          {series.actual.length ? (
            <ResponsiveGrid tileWidth={288}>
              {series.actual.map(r => (
                <ReleaseCard
                  key={r.release_id}
                  release={r}
                  source={Source.Profile}
                />
              ))}
            </ResponsiveGrid>
          ) : null}
          <Title h3>Игры</Title>
          {games.actual.length ? (
            <ResponsiveGrid tileWidth={288}>
              {games.actual.map(r => (
                <ReleaseCard
                  key={r.release_id}
                  release={r}
                  source={Source.Profile}
                />
              ))}
            </ResponsiveGrid>
          ) : null}
        </section>
      ) : (
        <Text>Нет ожидаемых релизов</Text>
      )}
      {hasNonActual && (
        <section>
          <Title h2>Вышедшие релизы</Title>
          <Title h3>Кино</Title>
          <Title h3>Сериалы</Title>
          <Title h3>Игры</Title>
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
