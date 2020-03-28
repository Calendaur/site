import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import cx from 'classnames'
import ReleaseListInDay from '../ReleaseListInDay'
import MobileCalendar from '../MobileCalendar'
import ReleaseInfoModal from '../ReleaseInfoModal'
import { getWeeks, getCellWidth } from '../../../core/calendar'
import { useWindowSize } from '../../../hooks'

import styles from './styles.module.css'

const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

function Calendar({ type, month, year }) {
  const [openedRelease, setOpenedRelease] = useState({
    visible: false,
    release: null,
  })
  const releases = useSelector(state =>
    state.releases.filter(r => {
      const date = new Date(r.date)

      const m = date.getMonth()
      const y = date.getFullYear()

      return m === month && y === year && type.replace('s', '') === r.type
    }),
  )

  const cover = useSelector(state => {
    const bg = state.backgrounds.find(b => {
      const date = new Date(b.date)

      const m = date.getMonth()
      const y = date.getFullYear()

      return m === month && y === year && type.replace('s', '') === b.type
    })

    if (bg) return bg.cover

    return ''
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
              {cover && <img src={cover} alt="" />}
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
                      r => new Date(r.date).getDate() === day,
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
                          <div className={styles.Date}>{day}</div>
                        )}
                        <ReleaseListInDay
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
          <MobileCalendar releases={releases} openModal={openModal} />
          <ReleaseInfoModal
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
