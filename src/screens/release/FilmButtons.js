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
  }

  & > .imdb {
    background-color: var(--imdb);
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
