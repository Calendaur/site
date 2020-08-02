import React from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import Card from 'screens/main/ReleaseCard'
import { useUser } from 'features/user/use-user'

const Settings = styled.section`
  margin-bottom: var(--vertical-1);

  & > h2 {
    margin-bottom: var(--vertical-5);
  }
`

const SettingsItem = styled.div`
  margin-bottom: var(--vertical-5);

  & > p {
    margin-bottom: var(--vertical-6);
    color: var(--secondary-text);
  }
`

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: calc(var(--horizontal-6) * -1);

  & > button {
    margin: var(--horizontal-6);
  }
`

const ExpectedReleases = styled.section`
  margin-bottom: var(--vertical-1);

  & > h3 {
    margin-bottom: var(--vertical-6);
  }
`

const Note = styled.p`
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

function Me({ user: ssrUser }) {
  const { user } = useUser(ssrUser)

  if (!user) return null

  return (
    <>
      <Head>
        <title>Личный кабинет</title>
      </Head>
      <ExpectedReleases>
        <h3>Ожидаемые релизы</h3>
        <Note>
          Чтобы добавить релиз в этот список, откройте его карточку и нажмите
          <span>Жду</span>
        </Note>
        <ReleasesSection>
          <h3>Кино</h3>
          <Grid>
            {user.extensions.movies.map(film => (
              <Card type="films" release={film} />
            ))}
          </Grid>
        </ReleasesSection>
        <ReleasesSection>
          <h3>Игры</h3>
          <Grid>
            {user.extensions.games.map(game => (
              <Card type="games" release={game} />
            ))}
          </Grid>
        </ReleasesSection>
        <ReleasesSection>
          <h3>Сериалы</h3>
          <Grid>
            {user.extensions.serials.map(series => (
              <Card type="series" release={series} />
            ))}
          </Grid>
        </ReleasesSection>
      </ExpectedReleases>
    </>
  )
}

export default Me
