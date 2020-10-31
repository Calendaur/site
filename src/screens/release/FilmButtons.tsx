import { Button } from 'components'

import styles from './styles.module.css'

interface Props {
  kinopoisk: {
    link: string
    rating?: number
  }
  imdb: {
    link: string
    rating?: number
  }
}

function FilmButtons({ kinopoisk, imdb }: Props) {
  return (
    <div className={styles.FilmButtons}>
      {(kinopoisk || imdb) && <p>Подробнее:</p>}
      {kinopoisk && (
        <Button
          onClick={() => {
            window.open(kinopoisk.link, '_blank')
          }}
          className={styles.isKinopoisk}
        >
          <img
            width="120"
            height="15"
            src="/icons/kinopoisk.svg"
            alt="КиноПоиск"
          />
          {kinopoisk.rating && kinopoisk.rating > 0 ? (
            <span>[{kinopoisk.rating.toFixed(1)}]</span>
          ) : null}
        </Button>
      )}
      {imdb && (
        <Button
          onClick={() => {
            window.open(imdb.link, '_blank')
          }}
          className={styles.isImdb}
        >
          <img width="64" height="32" src="/icons/imdb.svg" alt="IMDB" />
          {imdb.rating && imdb.rating > 0 ? (
            <span>[{imdb.rating.toFixed(1)}]</span>
          ) : null}
        </Button>
      )}
    </div>
  )
}

export default FilmButtons
