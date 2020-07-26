import React from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import { Button } from 'components'
import Card from '../main/ReleaseCard'

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

function Me({ film, game, series }) {
  return (
    <>
      <Head>
        <title>Личный кабинет</title>
      </Head>
      <section>
        <p>
          Ниже вы&nbsp;можете увидеть пример того, как будет выглядеть личный
          кабинет, когда мы&nbsp;закончим над ним работу. Если у&nbsp;вас есть
          предложения по&nbsp;функционалу, то&nbsp;можете написать&nbsp;нам
          на&nbsp;почту{' '}
          <a
            style={{ textDecoration: 'underline' }}
            href="mailto:support@released.at"
          >
            support@released.at
          </a>
        </p>
      </section>
      <Settings>
        <h2>Настройте календарь под себя</h2>
        <SettingsItem>
          <p>Выберите типы релизов:</p>
          <Buttons>
            <Button>Кино</Button>
            <Button>Игры</Button>
            <Button>Сериалы</Button>
          </Buttons>
        </SettingsItem>
        <SettingsItem>
          <p>Выберите игровые платформы:</p>
          <Buttons>
            <Button>PC</Button>
            <Button>PlayStation 4</Button>
            <Button>Xbox One</Button>
            <Button>Nintendo Switch</Button>
          </Buttons>
        </SettingsItem>
        <SettingsItem>
          <p>Выберите стриминговые сервисы:</p>
          <Buttons>
            <Button>Netflix</Button>
            <Button>Okko</Button>
            <Button>Amediateka</Button>
            <Button>Ivi</Button>
            <Button>Kinopoisk HD</Button>
          </Buttons>
        </SettingsItem>
      </Settings>
      <ExpectedReleases>
        <h3>Ожидаемые релизы</h3>
        <Note>
          Чтобы добавить релиз в этот список, откройте его карточку и нажмите
          <span>Ожидаю</span>
        </Note>
        <ReleasesSection>
          <h3>Кино</h3>
          <Grid>
            <Card type={'films'} release={film} />
            <Card type={'films'} release={film} />
            <Card type={'films'} release={film} />
            <Card type={'films'} release={film} />
          </Grid>
        </ReleasesSection>
        <ReleasesSection>
          <h3>Игры</h3>
          <Grid>
            <Card type={'games'} release={game} />
            <Card type={'games'} release={game} />
            <Card type={'games'} release={game} />
            <Card type={'games'} release={game} />
          </Grid>
        </ReleasesSection>
        <ReleasesSection>
          <h3>Сериалы</h3>
          <Grid>
            <Card type={'series'} release={series} />
            <Card type={'series'} release={series} />
            <Card type={'series'} release={series} />
            <Card type={'series'} release={series} />
          </Grid>
        </ReleasesSection>
      </ExpectedReleases>
      <ExpectedReleases>
        <h2>Просмотрено / пройдено</h2>
        <Note>
          Чтобы добавить релиз в этот список, откройте его карточку и нажмите
          <span>Просмотрено (для фильмов и сериалов)</span>
          <span>Пройдено (для игр)</span>
        </Note>
        <ReleasesSection>
          <h3>Кино</h3>
          <Grid>
            <Card type={'films'} release={film} />
            <Card type={'films'} release={film} />
            <Card type={'films'} release={film} />
            <Card type={'films'} release={film} />
          </Grid>
        </ReleasesSection>
        <ReleasesSection>
          <h3>Игры</h3>
          <Grid>
            <Card type={'games'} release={game} />
            <Card type={'games'} release={game} />
            <Card type={'games'} release={game} />
            <Card type={'games'} release={game} />
          </Grid>
        </ReleasesSection>
        <ReleasesSection>
          <h3>Сериалы</h3>
          <Grid>
            <Card type={'series'} release={series} />
            <Card type={'series'} release={series} />
            <Card type={'series'} release={series} />
            <Card type={'series'} release={series} />
          </Grid>
        </ReleasesSection>
      </ExpectedReleases>
    </>
  )
}

export default Me
