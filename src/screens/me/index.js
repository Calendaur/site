import React from 'react'
import Head from 'next/head'
import { Button, Title } from '../../components'
import Card from '../main/ReleaseCard'

import styles from './styles.module.css'

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
      <section className={styles.Settings}>
        <h3>Настройте календарь под себя</h3>
        <div className={styles.SettingsItem}>
          <p>Выберите типы релизов:</p>
          <div className={styles.Buttons}>
            <Button>Кино</Button>
            <Button>Игры</Button>
            <Button>Сериалы</Button>
          </div>
        </div>
        <div className={styles.SettingsItem}>
          <p>Выберите игровые платформы:</p>
          <div className={styles.Buttons}>
            <Button>PC</Button>
            <Button>PlayStation 4</Button>
            <Button>Xbox One</Button>
            <Button>Nintendo Switch</Button>
          </div>
        </div>
        <div className={styles.SettingsItem}>
          <p>Выберите стриминговые сервисы:</p>
          <div className={styles.Buttons}>
            <Button>Netflix</Button>
            <Button>Okko</Button>
            <Button>Amediateka</Button>
            <Button>Ivi</Button>
            <Button>Kinopoisk HD</Button>
          </div>
        </div>
      </section>
      <section className={styles.ExpectedReleases}>
        <h3>Ожидаемые релизы</h3>
        <p className={styles.Note}>
          Чтобы добавить релиз в этот список, откройте его карточку и нажмите
          <span>Ожидаю</span>
        </p>
        <div className={styles.ReleasesSection}>
          <Title as="h3" size={4}>
            Кино
          </Title>
          <div className={styles.ReleasesGrid}>
            <Card type={'films'} release={film} />
            <Card type={'films'} release={film} />
            <Card type={'films'} release={film} />
            <Card type={'films'} release={film} />
          </div>
        </div>
        <div className={styles.ReleasesSection}>
          <Title as="h3" size={4}>
            Игры
          </Title>
          <div className={styles.ReleasesGrid}>
            <Card type={'games'} release={game} />
            <Card type={'games'} release={game} />
            <Card type={'games'} release={game} />
            <Card type={'games'} release={game} />
          </div>
        </div>
        <div className={styles.ReleasesSection}>
          <Title as="h3" size={4}>
            Сериалы
          </Title>
          <div className={styles.ReleasesGrid}>
            <Card type={'series'} release={series} />
            <Card type={'series'} release={series} />
            <Card type={'series'} release={series} />
            <Card type={'series'} release={series} />
          </div>
        </div>
      </section>
      <section className={styles.ExpectedReleases}>
        <Title as="h2" size={3}>
          Просмотрено / пройдено
        </Title>
        <p className={styles.Note}>
          Чтобы добавить релиз в этот список, откройте его карточку и нажмите
          <span>Просмотрено (для фильмов и сериалов)</span>
          <span>Пройдено (для игр)</span>
        </p>
        <div className={styles.ReleasesSection}>
          <Title as="h3" size={4}>
            Кино
          </Title>
          <div className={styles.ReleasesGrid}>
            <Card type={'films'} release={film} />
            <Card type={'films'} release={film} />
            <Card type={'films'} release={film} />
            <Card type={'films'} release={film} />
          </div>
        </div>
        <div className={styles.ReleasesSection}>
          <Title as="h3" size={4}>
            Игры
          </Title>
          <div className={styles.ReleasesGrid}>
            <Card type={'games'} release={game} />
            <Card type={'games'} release={game} />
            <Card type={'games'} release={game} />
            <Card type={'games'} release={game} />
          </div>
        </div>
        <div className={styles.ReleasesSection}>
          <Title as="h3" size={4}>
            Сериалы
          </Title>
          <div className={styles.ReleasesGrid}>
            <Card type={'series'} release={series} />
            <Card type={'series'} release={series} />
            <Card type={'series'} release={series} />
            <Card type={'series'} release={series} />
          </div>
        </div>
      </section>
    </>
  )
}

export default Me
