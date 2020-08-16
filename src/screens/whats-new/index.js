/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import Head from 'next/head'
import { Emoji, A, Button } from 'components'
import { routes } from 'shared/constants'

import styles from './styles.module.css'

function WhatsNew() {
  return (
    <>
      <Head>
        <title>Новые фичи released.at</title>
      </Head>
      <div className={styles.Donate}>
        <p>Поддержите проект материально и ускорьте его развитие</p>
        <Button
          as="a"
          href="https://www.patreon.com/bePatron?u=40325871"
          data-patreon-widget-type="become-patron-button"
          target="_blank"
          rel="noopener noreferrer"
          primary
        >
          <img src="/icons/patreon.svg" alt="Patreon" />
          Поддержать
        </Button>
        <script
          async
          src="https://c6.patreon.com/becomePatronButton.bundle.js"
        ></script>
      </div>
      <article className={styles.Log}>
        <header>
          <h2 className={styles.Title}>Июль 2020</h2>
        </header>
        <ul>
          <li>
            ✓ Добавили <A href={routes.SIGN_UP}>авторизацию</A> и&nbsp;
            <A href={routes.ME}>личный кабинет</A>{' '}
            <Emoji label="feature">🎉</Emoji>
          </li>
          <li>
            ✓ Добавили страницу <A href={routes.ARCHIVE}>Вышедшее</A>{' '}
            <Emoji label="feature">🎉</Emoji>
          </li>
          <li>
            ✓ Добавили цены для игр <Emoji label="feature">🎉</Emoji>
          </li>
          <li>
            ✓ Исправили баг перехода на&nbsp;страницу с&nbsp;релизами
            по&nbsp;прямой ссылке <Emoji label="fix">🔨</Emoji>
          </li>
          <li>
            ✓ Улучшили производительность страниц с&nbsp;релизами{' '}
            <Emoji label="fix">🔨</Emoji>
          </li>
          <li>
            ✓ Сделали мобильное приложение примерно на 70%{' '}
            <Emoji label="feature">🎉</Emoji>
          </li>
        </ul>
      </article>
      <article className={styles.Log}>
        <header>
          <h2 className={styles.Title}>Июнь 2020</h2>
        </header>
        <ul>
          <li>
            ✓ Переработали стили, чтобы проект смотрелся целостно и аккуратно{' '}
            <Emoji label="polish">💅</Emoji>
          </li>
          <li>
            ✓ Переработали отображение календаря{' '}
            <Emoji label="polish">💅</Emoji>
          </li>
          <li>
            ✓ Добавили магазины для игр <Emoji label="feature">🎉</Emoji>
          </li>
        </ul>
      </article>
      <article className={styles.Log}>
        <header>
          <h2 className={styles.Title}>Май 2020</h2>
        </header>
        <ul>
          <li>
            ✓ Исправили баги с переходами между страницами{' '}
            <Emoji label="fix">🔨</Emoji>
          </li>
          <li>
            ✓ Слегка переработали дизайн хэдэра и&nbsp;футэра{' '}
            <Emoji label="polish">💅</Emoji>
          </li>
          <li>
            ✓ Добавили трейлеры к&nbsp;релизам <Emoji label="feature">🎉</Emoji>
          </li>
          <li>
            ✓ Переработали дизайн страницы релиза{' '}
            <Emoji label="polish">💅</Emoji>
          </li>
          <li>
            ✓ Добавили иконки, которые показывают где вышел фильм (в&nbsp;цифре{' '}
            <img src="/icons/digital.svg" alt="" /> или в&nbsp;кинотеатре{' '}
            <img src="/icons/cinema.svg" alt="" />){' '}
            <Emoji label="feature">🎉</Emoji>
          </li>
        </ul>
      </article>
    </>
  )
}

export default WhatsNew
