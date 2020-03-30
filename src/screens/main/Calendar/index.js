import React, { useState, useEffect, useCallback, useMemo } from 'react'
import cx from 'classnames'
import ReleaseListInDay from '../ReleaseListInDay'
import MobileCalendar from '../MobileCalendar'
import ReleaseInfoModal from '../ReleaseInfoModal'
import { getWeeks, getCellWidth } from '../../../core/calendar'
import { useWindowSize } from '../../../hooks'

import styles from './styles.module.css'

const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

function modifyType(type) {
  switch (type) {
    case 'films':
      return 'film'
    case 'games':
      return 'game'
    case 'series':
      return type
    default:
      break
  }
}

function Calendar({ type, month, year, releases, backgrounds }) {
  const [openedRelease, setOpenedRelease] = useState({
    visible: false,
    release: null,
  })
  const filteredReleases = useMemo(() => {
    return releases.filter(r => {
      const date = new Date(r.date)

      const m = date.getMonth()
      const y = date.getFullYear()

      return m === month && y === year && modifyType(type) === r.type
    })
  }, [type, month, year]) // eslint-disable-line

  const cover = useMemo(() => {
    const bg = backgrounds.find(b => {
      const date = new Date(b.date)

      const m = date.getMonth()
      const y = date.getFullYear()

      return m === month && y === year && modifyType(type) === b.type
    })

    if (bg) return bg.cover

    return ''
  }, [type, month, year]) // eslint-disable-line

  const { width } = useWindowSize()

  const getReleasesCellWidth = useCallback(
    day => {
      return getCellWidth(width, filteredReleases, day)
    },
    [filteredReleases, width],
  )

  const weeks = getWeeks(year, month)

  function openModal(release) {
    setOpenedRelease({
      visible: true,
      release,
    })
  }

  useEffect(() => {
    if (openedRelease.visible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'inherit'
    }
  }, [openedRelease.visible])

  return (
    <main>
      {filteredReleases.length === 0 ? (
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
                    const dayReleases = filteredReleases.filter(
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
          <MobileCalendar releases={filteredReleases} openModal={openModal} />
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
