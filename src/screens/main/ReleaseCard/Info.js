import React from 'react'
import { PlatformList } from 'components'

import styles from './styles.module.css'

function Info({ type, release }) {
  function renderChildren() {
    switch (type) {
      case 'films':
        return <p className={styles.Extra}>Реж. {release.director}</p>
      case 'games':
        return (
          <PlatformList
            className={styles.Platforms}
            platforms={release.platforms}
          />
        )
      case 'series':
        return <p className={styles.Extra}>{release.season} сезон</p>
      default:
        return null
    }
  }

  return (
    <div className={styles.Info}>
      <p>{release.title}</p>
      {renderChildren()}
    </div>
  )
}

export default Info
