import React from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import { Emoji } from 'components'

const Log = styled.article`
  margin-bottom: var(--vertical-2);

  & > ul {
    padding: 0;
    font-size: 1rem;
    line-height: 1.2;
    list-style-type: none;

    @media (min-width: 768px) {
      font-size: 1.375rem;
      line-height: 1.6;
    }

    & > li {
      margin-bottom: 12px;

      & > img {
        position: relative;
        top: 4px;
        width: 16px;
        margin: 0 4px;

        @media (min-width: 768px) {
          top: 5px;
          width: 22px;
          margin: 0 8px;
        }
      }
    }
  }
`

const Title = styled.h2`
  margin-bottom: var(--vertical-4);
`

function WhatsNew() {
  return (
    <>
      <Head>
        <title>Новые фичи released.at</title>
      </Head>
      <Log>
        <header>
          <Title>Июнь 2020</Title>
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
      </Log>
      <Log>
        <header>
          <Title>Май 2020</Title>
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
      </Log>
    </>
  )
}

export default WhatsNew
