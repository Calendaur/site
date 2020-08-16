import React from 'react'
import { Button } from 'components'

import styles from './styles.module.css'

function FilmButtons({ kinopoisk, imdb, type }) {
  return type === 'films' || type === 'series' ? (
    <div className={styles.FilmButtons}>
      {(kinopoisk || imdb) && <p>Подробнее:</p>}
      {kinopoisk && (
        <Button
          className={styles.kinopoisk}
          onClick={() => {
            window.open(kinopoisk, '_blank')
          }}
        >
          <img src="/icons/kinopoisk.svg" alt="КиноПоиск" />
        </Button>
      )}
      {imdb && (
        <Button
          className={styles.imdb}
          onClick={() => {
            window.open(imdb, '_blank')
          }}
        >
          <img src="/icons/imdb.svg" alt="IMDB" />
        </Button>
      )}
    </div>
  ) : null
}

export default FilmButtons
