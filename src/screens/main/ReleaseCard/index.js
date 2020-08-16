import React from 'react'
import { format } from 'date-fns'
import ru from 'date-fns/locale/ru'
import cx from 'classnames'
import { A, ExpectButton, Image } from 'components'
import Info from './Info'

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

function ReleaseCard({ release, type, showDate = false }) {
  return (
    <A
      className={styles.Card}
      href="/release/[id]"
      as={`/release/${release.release_id}`}
    >
      {showDate && (
        <div className={cx(styles.Released, styles.ReleasedDate)}>
          {format(new Date(release.released), 'd MMM', { locale: ru })}
        </div>
      )}
      <ExpectButton className={styles.ExpectButton} release={release} />
      <div className={styles.aspectRatio}>
        <Image src={release.cover} alt={release.title} />
      </div>
      <Info release={release} type={type} />
    </A>
  )
}

export default ReleaseCard
