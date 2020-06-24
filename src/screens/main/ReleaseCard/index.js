import React from 'react'
import Link from 'next/link'
import { animated } from 'react-spring'
import cx from 'classnames'
import isToday from 'date-fns/isToday'

import styles from './styles.module.css'
import calendarStyles from '../Calendar/styles.module.css'

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
    case 'digital':
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

function ReleaseCard({ release, transitionProps, type }) {
  console.log(123)
  const date = new Date(release.released)
  const day = date.getDate()

  return (
    <animated.div
      className={styles.Release}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 100%), url(${release.cover})`,
        ...transitionProps,
      }}
    >
      <Link href="/release/[id]" as={`/release/${release.release_id}`}>
        <a>
          <div className={styles.Substrate}></div>
          <div
            className={cx(calendarStyles.Date, calendarStyles.hasRelease, {
              [calendarStyles.isToday]: isToday(date),
            })}
          >
            {day}
          </div>
          <div className={styles.Info}>
            <p>{release.title}</p>
            <Info release={release} type={type} />
          </div>
        </a>
      </Link>
    </animated.div>
  )
}

export default ReleaseCard
