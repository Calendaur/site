import React from 'react'
import cx from 'classnames'

import styles from './styles.module.css'

function icon(platform) {
  switch (platform) {
    case 'pc':
      return <img src="/icons/windows.svg" alt="PC" />
    case 'ps_4':
      return <img src="/icons/playstation.svg" alt="PlayStation 4" />
    case 'xbox_one':
      return <img src="/icons/xbox.svg" alt="Xbox One" />
    case 'nintendo_switch':
      return <img src="/icons/nintendo-switch.svg" alt="Nintendo Switch" />
  }
}

function PlatformList({ platforms, className }) {
  return (
    <ul className={cx(styles.PlatformList, className)}>
      {platforms.map(platform => (
        <li key={platform}>{icon(platform)}</li>
      ))}
    </ul>
  )
}

export default PlatformList
