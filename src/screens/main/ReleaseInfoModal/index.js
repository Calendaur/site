import React from 'react'
import Rodal from 'rodal'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import { getPlatformIcon } from '../ReleaseCard'

import styles from './styles.module.css'

function ReleaseInfoModal({ isOpen, onClose, release, type }) {
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
            <h2>{release.title}</h2>
            <p className={styles.Info}>
              <span>Дата выхода:</span>&nbsp;
              {format(new Date(release.released), 'd MMMM yyyy', {
                locale: ru,
              })}
            </p>
            {type === 'films' && (
              <p className={styles.Info}>
                <span>Режиссёры:</span>&nbsp;{release.director}
              </p>
            )}
            {type === 'games' && (
              <div className={styles.Info}>
                <span>Платформы:</span>&nbsp;
                <ul className={styles.PlatformList}>
                  {release.platforms.map(platform => (
                    <li key={platform}>{getPlatformIcon(platform)}</li>
                  ))}
                </ul>
              </div>
            )}
            {type === 'series' && (
              <p className={styles.Info}>
                <span>Сезон:</span>&nbsp;{release.season}
              </p>
            )}
            <p className={styles.Desc}>{release.description}</p>
          </div>
          <div className={styles.Cover}>
            <img src={release.cover} alt={release.title} />
          </div>
        </div>
      ) : null}
    </Rodal>
  )
}

export default ReleaseInfoModal
