import React from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import { Emoji, A } from 'components'
import { routes } from 'shared/constants'

function WhatsNew() {
  return (
    <>
      <Head>
        <title>Новые фичи released.at</title>
      </Head>
      <Donate>
        <p>Поддержите проект материально и ускорьте его развитие</p>
        <a
          href="https://www.patreon.com/bePatron?u=40325871"
          data-patreon-widget-type="become-patron-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/icons/patreon.svg" alt="Patreon" />
          Поддержать
        </a>
        <script
          async
          src="https://c6.patreon.com/becomePatronButton.bundle.js"
        ></script>
      </Donate>
      <Log>
        <header>
          <Title>Июль 2020</Title>
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
      </Log>
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

const Log = styled.article`
  margin-bottom: var(--vertical-2);

  a {
    text-decoration: underline;
  }

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

const Donate = styled.div`
  margin-bottom: var(--vertical-2);

  p {
    margin: 0;
    margin-bottom: var(--vertical-6);
  }

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.46875rem 1rem;
    font-weight: 600;
    border-radius: 25px;
    background-color: var(--blue);

    &:hover {
      background-color: var(--blue-hover);
    }

    &:active {
      background-color: var(--blue-active);
    }

    &:focus:not(:active) {
      box-shadow: 0 0 0 0.125em rgba(66, 135, 245, 0.25);
    }

    img {
      width: 16px;
      height: 16px;
      margin-right: var(--horizontal-6);
    }
  }
`

export default WhatsNew
