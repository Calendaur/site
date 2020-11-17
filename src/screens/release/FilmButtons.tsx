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
          КиноПоиск
          {kinopoisk.rating && kinopoisk.rating > 0 ? (
            <span>&nbsp;{kinopoisk.rating.toFixed(1)}</span>
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
          iMDB
          {imdb.rating && imdb.rating > 0 ? (
            <span>&nbsp;{imdb.rating.toFixed(1)}</span>
          ) : null}
        </Button>
      )}
    </div>
  )
}

export default FilmButtons
