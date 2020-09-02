import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { compareAsc } from 'date-fns'
import Card from 'screens/main/ReleaseCard'
import { useUser } from 'features/user/use-user'
import { logout } from 'shared/api'
import { routes } from 'shared/constants'
import { Button } from 'components'

const ExpectedReleases = styled.section`
  margin-bottom: var(--vertical-1);

  & > h1 {
    line-height: 1;
  }

  & > h3 {
    margin-bottom: var(--vertical-6);
  }
`

const Note = styled.p`
  margin: 0;
  margin-bottom: var(--vertical-5);
  font-size: 14px;
  color: var(--secondary-text);

  & > span {
    padding: 1px 4px;
    margin-left: var(--horizontal-6);
    color: var(--black);
    white-space: nowrap;
    background-color: #dbdbdb;
    border-radius: 4px;
  }
`

const ReleasesSection = styled.div`
  margin-bottom: var(--vertical-4);
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
  grid-gap: 16px;

  & > a {
    height: 200px;
  }
`

function actual(arr) {
  return arr.filter(i => compareAsc(new Date(), new Date(i.released)) <= 0)
}

function nonActual(arr) {
  return arr.filter(i => compareAsc(new Date(), new Date(i.released)) > 0)
}

function Me({ user: ssrUser }) {
  const { push } = useRouter()
  const { user } = useUser(ssrUser)

  if (!user) return null

  const actualFilms = actual(user.expected.movies)
  const actualGames = actual(user.expected.games)
  const actualSeries = actual(user.expected.serials)

  const nonActualFilms = nonActual(user.expected.movies)
  const nonActualGames = nonActual(user.expected.games)
  const nonActualSeries = nonActual(user.expected.serials)

  const hasNonActual =
    [...nonActualFilms, ...nonActualGames, ...nonActualSeries].length > 0

  return (
    <>
      <Head>
        <title>Личный кабинет</title>
      </Head>
      <ExpectedReleases>
        <h1>Ожидаемые релизы</h1>
        <Note>
          Чтобы добавить релиз в этот список, откройте его карточку и нажмите
          <span>Жду</span>.
        </Note>
        <ReleasesSection>
          <h3>Кино</h3>
          {actualFilms.length ? (
            <Grid>
              {actualFilms.map(film => (
                <Card
                  key={`actual-${film.release_id}`}
                  showDate
                  type="films"
                  release={film}
                />
              ))}
            </Grid>
          ) : (
            <p>Нет ожидаемых фильмов</p>
          )}
        </ReleasesSection>
        <ReleasesSection>
          <h3>Сериалы</h3>
          {actualSeries.length ? (
            <Grid>
              {actualSeries.map(series => (
                <Card
                  key={`actual-${series.release_id}`}
                  showDate
                  type="series"
                  release={series}
                />
              ))}
            </Grid>
          ) : (
            <p>Нет ожидаемых сериалов</p>
          )}
        </ReleasesSection>
        <ReleasesSection>
          <h3>Игры</h3>
          {actualGames.length ? (
            <Grid>
              {actualGames.map(game => (
                <Card
                  key={`actual-${game.release_id}`}
                  showDate
                  type="games"
                  release={game}
                />
              ))}
            </Grid>
          ) : (
            <p>Нет ожидаемых игр</p>
          )}
        </ReleasesSection>
      </ExpectedReleases>
      {hasNonActual ? (
        <ExpectedReleases>
          <h1>Уже вышли</h1>
          <Note>
            Сюда автоматически попадают ваши ожидаемые релизы после выхода.
            Также вы&nbsp;можете нажать кнопку <span>В&nbsp;закладки</span> для
            добавления релиза&nbsp;в этот список.
          </Note>
          {nonActualFilms.length ? (
            <ReleasesSection>
              <h3>Кино</h3>
              <Grid>
                {nonActualFilms.map(film => (
                  <Card
                    key={`nonactual-${film.release_id}`}
                    showDate
                    type="films"
                    release={film}
                  />
                ))}
              </Grid>
            </ReleasesSection>
          ) : null}
          {nonActualSeries.length ? (
            <ReleasesSection>
              <h3>Сериалы</h3>
              <Grid>
                {nonActualSeries.map(series => (
                  <Card
                    key={`nonactual-${series.release_id}`}
                    showDate
                    type="series"
                    release={series}
                  />
                ))}
              </Grid>
            </ReleasesSection>
          ) : null}
          {nonActualGames.length ? (
            <ReleasesSection>
              <h3>Игры</h3>
              <Grid>
                {nonActualGames.map(game => (
                  <Card
                    key={`nonactual-${game.release_id}`}
                    showDate
                    type="games"
                    release={game}
                  />
                ))}
              </Grid>
            </ReleasesSection>
          ) : null}
        </ExpectedReleases>
      ) : null}
      <Button
        onClick={async () => {
          await logout()
          push(routes.HOME)
        }}
      >
        Выйти
      </Button>
    </>
  )
}

export default Me
