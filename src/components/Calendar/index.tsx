import { useRouter } from 'next/router'
import format from 'date-fns/format'
import isToday from 'date-fns/isToday'
import cx from 'classnames'
import { ReleaseInList } from 'types/common'
import { monthsDict } from 'shared/constants'
import Header from './Header'
import ReleaseCard, { Source } from '../ReleaseCard'

import styles from './styles.module.css'

const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

interface Props {
  weeks: string
  releases: {
    [date: string]: ReleaseInList[]
  }
}

const currentMonth = new Date().getMonth()
const currentYear = new Date().getFullYear()

function Calendar({ weeks, releases }: Props) {
  const { asPath } = useRouter()
  const weeksArray = JSON.parse(weeks) as Array<number | null>

  let url = asPath
  let month = currentMonth
  let year = currentYear

  if (url !== '/') {
    const [, date] = asPath.split('/').slice(1)
    const [m, y] = date.split('-')

    month = monthsDict[m] - 1
    year = +y
  }

  return (
    <>
      <Header />
      <div className={styles.Calendar}>
        <div className={styles.DaysOfWeek}>
          {daysOfWeek.map(weekDay => (
            <div key={weekDay}>{weekDay}</div>
          ))}
        </div>
        <div className={styles.Grid}>
          {weeksArray.map((day, index) => {
            const date = new Date(year, month, day)
            const formatted = format(date, 'yyyy-LL-dd')
            const releasesInDay = releases[formatted]
            const hasReleases = !!releasesInDay

            return (
              <div
                className={cx(styles.Day, {
                  [styles.noReleases]: !hasReleases,
                })}
                key={index}
              >
                <div
                  className={cx(styles.DayOfMonth, {
                    [styles.hasReleases]: hasReleases,
                    [styles.isToday]: isToday(date) && day !== null,
                  })}
                >
                  {day}
                </div>
                {hasReleases ? (
                  <div className={styles.ReleasesInDay}>
                    {releases[formatted].map(release => (
                      <ReleaseCard
                        key={release.release_id}
                        release={release}
                        source={Source.Calendar}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Calendar
