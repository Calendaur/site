import React from 'react'
import { PlatformList } from 'components'

import styles from './styles.module.css'

function ExtraInfo({ type, director, platforms, season }) {
  return (
    <div className={styles.ExtraInfo}>
      {type === 'films' && (
        <p className={styles.Label}>
          <span>Режиссер:</span> {director}
        </p>
      )}
      {type === 'games' && (
        <>
          <p className={styles.Label}>
            <span>Платформы:</span>
          </p>
          <PlatformList className={styles.Platforms} platforms={platforms} />
        </>
      )}
      {type === 'series' && (
        <p className={styles.Label}>
          <span>Сезон:</span> {season}
        </p>
      )}
    </div>
  )
}

export default ExtraInfo
