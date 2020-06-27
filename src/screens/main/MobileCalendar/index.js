import React from 'react'
import { compareAsc, format, parseISO } from 'date-fns'
import ru from 'date-fns/locale/ru'
import ReleaseCard from '../ReleaseCard'
import { groupBy } from '../../../core/helpers'

import styles from './styles.module.css'

function MobileCalendar({ releases, type }) {
  const data = releases.sort((a, b) =>
    compareAsc(new Date(a.released), new Date(b.released)),
  )

  const preparedReleases = groupBy('released')(data)

  return (
    <div className={styles.MobileCalendar}>
      {Object.keys(preparedReleases).map(date => (
        <div className={styles.Day} key={`${type}-${date}`}>
          <h3>{format(parseISO(date), 'dd EEEEEE', { locale: ru })}</h3>
          <div className={styles.Releases}>
            {preparedReleases[date].map(release => (
              <ReleaseCard
                type={type}
                key={`${date}-${release.id}`}
                release={release}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MobileCalendar
