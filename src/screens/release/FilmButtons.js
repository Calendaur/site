import React from 'react'
import cx from 'classnames'
import { Button } from '../../components'

import styles from './styles.module.css'

function FilmButtons({ kinopoisk, imdb, type }) {
  return type === 'films' || type === 'series' ? (
    <div className={styles.FilmButtons}>
      {(kinopoisk || imdb) && <p>Подробнее:</p>}
      {kinopoisk && (
        <Button
          as="a"
          href={kinopoisk}
          className={cx(styles.Kinopoisk)}
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
          className={cx(styles.Imdb)}
          target="_blank"
          rel="nofollow"
        >
          <img src="/icons/imdb.svg" alt="IMDB" />
        </Button>
      )}
    </div>
  ) : null
}

export default FilmButtons
