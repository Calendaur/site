import React from 'react'
import cx from 'classnames'
import { Button } from '../../components'

import styles from './styles.module.css'

function StreamingServicesButtons({ type }) {
  if (type === 'games') return null

  return (
    <div className={styles.StreamingServicesButtons}>
      <p>Где смотреть:</p>
      <div className={styles.StreamingServices}>
        <Button
          className={cx(styles.StreamingServicesButton, styles.Amediateka)}
        >
          <img src="/icons/streaming-services/amediateka.svg" alt="" />
        </Button>
        <Button className={cx(styles.StreamingServicesButton, styles.Ivi)}>
          <img src="/icons/streaming-services/ivi.svg" alt="" />
        </Button>
        <Button
          className={cx(styles.StreamingServicesButton, styles.KinopoiskHD)}
        >
          <img src="/icons/streaming-services/kinopoisk-hd.svg" alt="" />
        </Button>
        <Button className={cx(styles.StreamingServicesButton, styles.Netflix)}>
          <img src="/icons/streaming-services/netflix.svg" alt="" />
        </Button>
        <Button className={cx(styles.StreamingServicesButton, styles.Okko)}>
          <img src="/icons/streaming-services/okko.svg" alt="" />
        </Button>
      </div>
    </div>
  )
}

export default StreamingServicesButtons
