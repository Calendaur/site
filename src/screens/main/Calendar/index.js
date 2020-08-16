import React, { useMemo } from 'react'
import cx from 'classnames'
import { getWeeks } from 'core/calendar'
import NoReleases from './NoReleases'
import ReleaseListInDay from '../ReleaseListInDay'
import MobileCalendar from '../MobileCalendar'

import styles from './styles.module.css'

const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
const currentDay = new Date().getDate()
const currentMonth = new Date().getMonth()
const currentYear = new Date().getFullYear()

function Calendar({ type, month, year, releases }) {
  const weeks = useMemo(() => getWeeks(year, month), [year, month])

  return (
    <>
      {releases.length === 0 ? (
        <NoReleases />
      ) : (
        <>
          <div className={styles.DesktopCalendar}>
            <div className={styles.DayOfWeek}>
              {daysOfWeek.map(weekDay => (
                <div key={weekDay}>{weekDay}</div>
              ))}
            </div>
            <div className={styles.Grid}>
              {weeks.flat().map((day, index) => {
                const dayReleases = releases.filter(
                  r => new Date(r.released).getDate() === day,
                )
                const hasRelease = dayReleases.length > 0
                const isToday =
                  day === currentDay &&
                  month === currentMonth &&
                  year === currentYear

                return (
                  <div
                    key={index}
                    className={cx(styles.Day, {
                      [styles.isNotWithinRange]: day === undefined,
                      [styles.someReleases]: dayReleases.length > 1,
                      [styles.hasRelease]: hasRelease,
                    })}
                  >
                    <div
                      className={cx(styles.DateLabel, {
                        [styles.hasRelease]: hasRelease,
                        [styles.isToday]: isToday,
                      })}
                    >
                      <span>{day}</span>
                    </div>
                    <ReleaseListInDay type={type} releases={dayReleases} />
                  </div>
                )
              })}
            </div>
          </div>
          <MobileCalendar type={type} releases={releases} />
        </>
      )}
    </>
  )
}

export default Calendar
