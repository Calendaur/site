import React from 'react'
import { PlatformList } from '../../components'

import styles from './styles.module.css'

function ExtraInfo({ type, director, platforms, season }) {
  return (
    <div className={styles.Meta}>
      {type === 'films' && <i className={styles.Label}>Режиссер: {director}</i>}
      {type === 'games' && (
        <>
          <i className={styles.Label}>Платформы:</i>
          <div className={styles.Value}>
            <PlatformList
              className={styles.PlatformList}
              platforms={platforms}
            />
          </div>
        </>
      )}
      {type === 'series' && <i className={styles.Label}>Сезон: {season}</i>}
    </div>
  )
}

export default ExtraInfo
