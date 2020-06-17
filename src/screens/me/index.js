import React from 'react'
import Head from 'next/head'
import { Header, MainPageContent, Button, Title } from '../../components'
import Card from '../main/ReleaseCard'

import styles from './styles.module.css'

const release = {
  cover:
    'https://api.calendaur.com/uploads/release/cover/18017/%D0%A8%D0%B8%D1%80%D0%BB%D0%B8_-_%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F.jpg',
  description:
    'Известная писательница романов ужасов находит вдохновение для следующей книги, когда в дом по соседству переезжает молодая пара.',
  details_cover: null,
  director: 'Жозефин Декер',
  id: 58,
  imdb_url: 'https://www.imdb.com/title/tt8430598/',
  is_digital: true,
  is_premier: true,
  kinopoisk_url: 'https://www.kinopoisk.ru/film/1146759/',
  release_id: 18017,
  released: '2020-06-05',
  site: '',
  title: 'Ширли',
}

function Me() {
  return (
    <>
      <Head>
        <title>Calendaur | Профиль</title>
      </Head>
      <Header />
      <MainPageContent>
        <section className={styles.User}>
          <div>
            <img src="https://picsum.photos/200" alt="" />
          </div>
          <Title size={1}>Nickname</Title>
        </section>
        <section className={styles.Settings}>
          <Title as="h2" size={3}>
            Настройте календарь под себя
          </Title>
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
            </div>
          </div>
        </section>
        <section className={styles.ExpectedReleases}>
          <Title as="h2" size={3}>
            Ожидаемые релизы
          </Title>
          <p className={styles.Note}>
            Чтобы добавить релиз в этот список, откройте его карточку и нажмите
            <span>Ожидаю</span>
          </p>
          <div className={styles.ReleasesSection}>
            <Title as="h3" size={4}>
              Кино
            </Title>
            <div className={styles.ReleasesGrid}>
              <Card type={'films'} release={release} />
              <Card type={'films'} release={release} />
              <Card type={'films'} release={release} />
              <Card type={'films'} release={release} />
            </div>
          </div>
          <div className={styles.ReleasesSection}>
            <Title as="h3" size={4}>
              Игры
            </Title>
            <div className={styles.ReleasesGrid}>
              <Card type={'films'} release={release} />
              <Card type={'films'} release={release} />
              <Card type={'films'} release={release} />
              <Card type={'films'} release={release} />
            </div>
          </div>
          <div className={styles.ReleasesSection}>
            <Title as="h3" size={4}>
              Сериалы
            </Title>
            <div className={styles.ReleasesGrid}>
              <Card type={'films'} release={release} />
              <Card type={'films'} release={release} />
              <Card type={'films'} release={release} />
              <Card type={'films'} release={release} />
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
              <Card type={'films'} release={release} />
              <Card type={'films'} release={release} />
              <Card type={'films'} release={release} />
              <Card type={'films'} release={release} />
            </div>
          </div>
          <div className={styles.ReleasesSection}>
            <Title as="h3" size={4}>
              Игры
            </Title>
            <div className={styles.ReleasesGrid}>
              <Card type={'films'} release={release} />
              <Card type={'films'} release={release} />
              <Card type={'films'} release={release} />
              <Card type={'films'} release={release} />
            </div>
          </div>
          <div className={styles.ReleasesSection}>
            <Title as="h3" size={4}>
              Сериалы
            </Title>
            <div className={styles.ReleasesGrid}>
              <Card type={'films'} release={release} />
              <Card type={'films'} release={release} />
              <Card type={'films'} release={release} />
              <Card type={'films'} release={release} />
            </div>
          </div>
        </section>
      </MainPageContent>
    </>
  )
}

export default Me
