import React from 'react'
import styled from '@emotion/styled'
import { Button } from 'components'

const Buttons = styled.div`
  margin-bottom: var(--vertical-4);

  & > p {
    margin-bottom: var(--vertical-6);
    color: var(--secondary-text);
  }

  & > .kinopoisk {
    margin-right: var(--horizontal-4);
    background-color: var(--kinopoisk);

    & > img {
      filter: invert(1);
    }

    &:hover {
      background-color: #e65c00;
    }

    &:active {
      background-color: #cc5200;
    }

    &:focus:not(:active) {
      box-shadow: 0 0 0 0.125em rgba(255, 102, 0, 0.25);
    }
  }

  & > .imdb {
    background-color: var(--imdb);

    &:hover {
      background-color: #e9b90a;
    }

    &:active {
      background-color: #d1a609;
    }

    &:focus:not(:active) {
      box-shadow: 0 0 0 0.125em rgba(245, 197, 24, 0.25);
    }
  }
`

function FilmButtons({ kinopoisk, imdb, type }) {
  return type === 'films' || type === 'series' ? (
    <Buttons>
      {(kinopoisk || imdb) && <p>Подробнее:</p>}
      {kinopoisk && (
        <Button
          as="a"
          href={kinopoisk}
          className="kinopoisk"
          target="_blank"
          rel="nofollow"
        >
          <img src="/icons/kinopoisk.svg" alt="КиноПоиск" />
        </Button>
      )}
      {imdb && (
        <Button
          as="a"
          href={imdb}
          className="imdb"
          target="_blank"
          rel="nofollow"
        >
          <img src="/icons/imdb.svg" alt="IMDB" />
        </Button>
      )}
    </Buttons>
  ) : null
}

export default FilmButtons
