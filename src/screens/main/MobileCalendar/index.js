import React, { useMemo } from 'react'
import { compareAsc, format, parseISO } from 'date-fns'
import ru from 'date-fns/locale/ru'
import { groupBy } from 'shared/utils'
import ReleaseCard from '../ReleaseCard'

import styles from './styles.module.css'

function MobileCalendar({ releases, type }) {
  const data = useMemo(
    () =>
      groupBy('released')(
        releases.sort((a, b) =>
          compareAsc(new Date(a.released), new Date(b.released)),
        ),
      ),
    [releases],
  )

  return (
    <div className={styles.Calendar}>
      {Object.keys(data).map(date => (
        <div className={styles.Day} key={`${type}-${date}`}>
          <p>{format(parseISO(date), 'dd EEEEEE', { locale: ru })}</p>
          <div className={styles.Releases}>
            {data[date].map(release => (
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
