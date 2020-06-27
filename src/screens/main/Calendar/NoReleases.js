import React from 'react'

import styles from './styles.module.css'

function NoReleases() {
  return (
    <div className={styles.NotYetFilled}>
      <p>Релизы для этого месяца еще заполняются</p>
    </div>
  )
}

export default NoReleases
