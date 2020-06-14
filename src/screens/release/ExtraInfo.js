import React from 'react'
import { PlatformList } from '../../components'

import styles from './styles.module.css'

function ExtraInfo({ type, director, platforms, season }) {
  return (
    <div className={styles.Meta}>
      {type === 'films' && (
        <div className={styles.Label}>Режиссер {director}</div>
      )}
      {type === 'games' && (
        <>
          <div className={styles.Label}>Платформы:</div>
          <div className={styles.Value}>
            <PlatformList
              className={styles.PlatformList}
              platforms={platforms}
            />
          </div>
        </>
      )}
      {type === 'series' && <div className={styles.Label}>Сезон {season}</div>}
    </div>
  )
}

export default ExtraInfo
