import React from 'react'
import Rodal from 'rodal'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import { getPlatformIcon } from '../ReleaseCard'

import styles from './styles.module.css'

function ReleaseInfoModal({ isOpen, onClose, release }) {
  return (
    <Rodal
      className={styles.Modal}
      width={100}
      measure="%"
      visible={isOpen}
      onClose={onClose}
      animation="slideDown"
    >
      {release ? (
        <div className={styles.Content}>
          <div className={styles.About}>
            <h2>{release.name}</h2>
            <p className={styles.Info}>
              <span>Дата выхода:</span>{' '}
              {format(new Date(release.date), 'd MMMM yyyy', { locale: ru })}
            </p>
            {release.type === 'film' && (
              <p className={styles.Info}>
                <span>Режиссёры:</span> {release.director}
              </p>
            )}
            {release.type === 'game' && (
              <div className={styles.Info}>
                <span>Платформы:</span>{' '}
                <ul className={styles.PlatformList}>
                  {release.platforms.map(platform => (
                    <li key={platform}>{getPlatformIcon(platform)}</li>
                  ))}
                </ul>
              </div>
            )}
            <p className={styles.Desc}>{release.description}</p>
          </div>
          <div className={styles.Cover}>
            <img src={release.cover} alt={release.name} />
          </div>
        </div>
      ) : null}
    </Rodal>
  )
}

export default ReleaseInfoModal
