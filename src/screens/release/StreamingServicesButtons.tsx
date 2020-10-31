import { Button } from 'components'

import styles from './styles.module.css'

function StreamingServicesButtons() {
  return (
    <div className={styles.StreamingServicesButtons}>
      <p>Где смотреть:</p>
      <div className={styles.Services}>
        <Button className={styles['amediateka']}>
          <img
            src="/icons/streaming-services/amediateka.svg"
            alt="Amediateka"
          />
        </Button>
        <Button className={styles['ivi']}>
          <img src="/icons/streaming-services/ivi.svg" alt="Ivi" />
        </Button>
        <Button className={styles['kinopoisk-hd']}>
          <img
            src="/icons/streaming-services/kinopoisk-hd.svg"
            alt="Kinopoisk HD"
          />
        </Button>
        <Button className={styles['netflix']}>
          <img src="/icons/streaming-services/netflix.svg" alt="Netflix" />
        </Button>
        <Button className={styles['okko']}>
          <img src="/icons/streaming-services/okko.svg" alt="Okko" />
        </Button>
      </div>
    </div>
  )
}

export default StreamingServicesButtons
