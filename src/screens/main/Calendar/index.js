import React, { useState, useEffect, useCallback } from 'react'
import cx from 'classnames'
import ReleaseListInDay from '../ReleaseListInDay'
import MobileCalendar from '../MobileCalendar'
import ReleaseInfoModal from '../ReleaseInfoModal'
import { getWeeks, getCellWidth } from '../../../core/calendar'
import { monthString, getTypeWithoutS } from '../../../core/helpers'
import { useWindowSize } from '../../../hooks'

import styles from './styles.module.css'

const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

function Calendar({ type, month, year, releases }) {
  const [openedRelease, setOpenedRelease] = useState({
    visible: false,
    release: null,
  })

  const { width } = useWindowSize()

  const getReleasesCellWidth = useCallback(
    day => {
      return getCellWidth(width, releases, day)
    },
    [releases, width],
  )

  const weeks = getWeeks(year, month)

  function openModal(release) {
    setOpenedRelease({
      visible: true,
      release,
    })
  }

  useEffect(() => {
    if (window.location.hash) {
      const { hash } = window.location
      const release = releases.find(r => r.id === +hash.replace('#', ''))

      if (release) {
        openModal(release)
      }
    }
  }, [releases])

  useEffect(() => {
    if (openedRelease.visible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'inherit'
    }
  }, [openedRelease.visible])

  return (
    <main>
      {releases.length === 0 ? (
        <div className={styles.NotYetFilled}>
          <p>Релизы для этого месяца еще заполняются</p>
        </div>
      ) : (
        <>
          <div className={styles.Cover}>
            <div className={styles.Gradient}>
              <img
                src={`https://api.calendaur.com/uploads/bg/${year}-${monthString(
                  month + 1,
                )}-${getTypeWithoutS(type)}.jpg`}
                alt=""
              />
            </div>
          </div>
          <table className={styles.DesktopCalendar}>
            <thead>
              <tr>
                {daysOfWeek.map(dayOfWeek => (
                  <th className={styles.DayOfWeek} key={dayOfWeek}>
                    {dayOfWeek}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, index) => (
                <tr key={`week_${index}`}>
                  {week.map((day, index) => {
                    const dayReleases = releases.filter(
                      r => new Date(r.released).getDate() === day,
                    )

                    const hasReleases = dayReleases.length > 0

                    return (
                      <td
                        style={{
                          width: getReleasesCellWidth(day),
                        }}
                        className={cx(styles.DayItem, {
                          [styles.isNotWithinRange]: day === undefined,
                          [styles.someReleases]: dayReleases.length > 1,
                          [styles.hasRelease]: dayReleases.length > 0,
                        })}
                        key={`day_${index}`}
                      >
                        {!hasReleases && (
                          <div
                            className={cx(styles.Date, {
                              [styles.isToday]:
                                day === new Date().getDate() &&
                                month === new Date().getMonth() &&
                                year === new Date().getFullYear(),
                            })}
                          >
                            {day}
                          </div>
                        )}
                        <ReleaseListInDay
                          type={type}
                          releases={dayReleases}
                          openModal={openModal}
                        />
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <MobileCalendar
            type={type}
            releases={releases}
            openModal={openModal}
          />
          <ReleaseInfoModal
            type={type}
            release={openedRelease.release}
            isOpen={openedRelease.visible}
            onClose={() => {
              setOpenedRelease({
                visible: false,
                release: null,
              })
            }}
          />
        </>
      )}
    </main>
  )
}

export default Calendar
