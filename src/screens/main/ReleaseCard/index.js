import React from 'react'
import { animated } from 'react-spring'
import Dotdotdot from 'react-dotdotdot'

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

function Info({ release }) {
  switch (release.type) {
    case 'film':
      return (
        <Dotdotdot clamp="auto">
          <p className={styles.Extra}>{release.director}</p>
        </Dotdotdot>
      )
    case 'game':
      return (
        <ul className={styles.PlatformList}>
          {release.platforms.map(platform => (
            <li key={platform}>{getPlatformIcon(platform)}</li>
          ))}
        </ul>
      )
    case 'series':
      return (
        <Dotdotdot clamp="auto">
          <p className={styles.Extra}>{release.season} сезон</p>
        </Dotdotdot>
      )
    default:
      return null
  }
}

function ReleaseCard({ release, transitionProps, openModal }) {
  return (
    <animated.div
      className={styles.Release}
      onClick={() => openModal(release)}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 100%), url(${release.cover})`,
        ...transitionProps,
      }}
    >
      <div className={styles.Date}>{new Date(release.date).getDate()}</div>
      <div className={styles.Info}>
        <Dotdotdot clamp="auto">
          <p>{release.name}</p>
        </Dotdotdot>
        <Info release={release} />
      </div>
    </animated.div>
  )
}

export default ReleaseCard
