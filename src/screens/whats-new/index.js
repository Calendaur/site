import React from 'react'
import Head from 'next/head'
import { Emoji } from '../../components'

import styles from './styles.module.css'

function WhatsNew() {
  return (
    <>
      <Head>
        <title>Что нового?</title>
      </Head>
      <article className={styles.Log}>
        <header>
          <h2 className={styles.Title}>Июнь 2020</h2>
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
        </header>
      </article>
      <article className={styles.Log}>
        <header>
          <h2 className={styles.Title}>Май 2020</h2>
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
              ✓ Добавили трейлеры к&nbsp;релизам{' '}
              <Emoji label="feature">🎉</Emoji>
            </li>
            <li>
              ✓ Переработали дизайн страницы релиза{' '}
              <Emoji label="polish">💅</Emoji>
            </li>
            <li>
              ✓ Добавили иконки, которые показывают где вышел фильм
              (в&nbsp;цифре <img src="/icons/digital.svg" alt="" /> или
              в&nbsp;кинотеатре <img src="/icons/cinema.svg" alt="" />){' '}
              <Emoji label="feature">🎉</Emoji>
            </li>
          </ul>
        </header>
      </article>
    </>
  )
}

export default WhatsNew
