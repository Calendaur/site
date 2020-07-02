import React from 'react'
import cx from 'classnames'
import ReleaseListInDay from '../ReleaseListInDay'
import MobileCalendar from '../MobileCalendar'
import NoReleases from './NoReleases'
import { getWeeks } from '../../../core/calendar'

import styles from './styles.module.css'

const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

function Calendar({ type, month, year, releases }) {
  const weeks = getWeeks(year, month)

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
            <div className={styles.Calendar}>
              {weeks.flat().map((day, index) => {
                const dayReleases = releases.filter(
                  r => new Date(r.released).getDate() === day,
                )
                const nDate = new Date()

                return (
                  <div
                    key={index}
                    className={cx(styles.DayItem, {
                      [styles.isNotWithinRange]: day === undefined,
                      [styles.someReleases]: dayReleases.length > 1,
                      [styles.hasRelease]: dayReleases.length > 0,
                    })}
                  >
                    <div
                      className={cx(styles.Date, {
                        [styles.isToday]:
                          day === nDate.getDate() &&
                          month === nDate.getMonth() &&
                          year === nDate.getFullYear(),
                      })}
                    >
                      {day}
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
