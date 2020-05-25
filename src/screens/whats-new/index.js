import React from 'react'
import Head from 'next/head'
import { Header, MainPageContent, Emoji } from '../../components'

import styles from './styles.module.css'

function WhatsNew() {
  return (
    <>
      <Head>
        <title>Calendaur | Что нового?</title>
      </Head>
      <Header />
      <MainPageContent>
        <article className={styles.Log}>
          <header>
            <h1>Май 2020</h1>
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
      </MainPageContent>
    </>
  )
}

export default WhatsNew
