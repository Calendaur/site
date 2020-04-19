import React from 'react'
import { animated } from 'react-spring'

import styles from './styles.module.css'

export function getPlatformIcon(platform) {
  switch (platform) {
    case 'pc':
      return <img src="/icons/windows.svg" alt="" />
    case 'ps_4':
      return <img src="/icons/playstation.svg" alt="" />
    case 'xbox_one':
      return <img src="/icons/xbox.svg" alt="" />
    case 'nintendo_switch':
      return <img src="/icons/nintendo-switch.svg" alt="" />
    default:
      break
  }
}

function Info({ release, type }) {
  switch (type) {
    case 'films':
      return <p className={styles.Extra}>{release.director}</p>
    case 'games':
      return (
        <ul className={styles.PlatformList}>
          {release.platforms.map(platform => (
            <li key={platform}>{getPlatformIcon(platform)}</li>
          ))}
        </ul>
      )
    case 'series':
      return <p className={styles.Extra}>{release.season} сезон</p>
    default:
      return null
  }
}

function ReleaseCard({ release, transitionProps, openModal, type }) {
  const day = new Date(release.released).getDate()

  return (
    <animated.div
      className={styles.Release}
      onClick={() => openModal(release)}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 100%), url(${release.cover})`,
        ...transitionProps,
      }}
    >
      <div className={styles.Date}>{day}</div>
      <div className={styles.Info}>
        <p>{release.title}</p>
        <Info release={release} type={type} />
      </div>
    </animated.div>
  )
}

export default ReleaseCard
