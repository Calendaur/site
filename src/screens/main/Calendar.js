import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useTransition, useChain, animated } from 'react-spring'
import { getDaysInMonth, startOfMonth, format, compareAsc } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'
import cx from 'classnames'
import Dotdotdot from 'react-dotdotdot'
import useWindowSize from './useWindowSize'
import { chunkify, range, getPlatformIcon } from './helpers'

import styles from './Calendar.module.css'

const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

function MobileCalendar({ releases }) {
  const data = releases.sort((a, b) =>
    compareAsc(new Date(a.date), new Date(b.date)),
  )

  const transRef = useRef()
  const transitions = useTransition(data, item => item.name, {
    ref: transRef,
    unique: true,
    trail: 200 / data.length,
    from: { opacity: 0, transform: 'scale(0.4)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.4)' },
  })

  useChain([transRef], [0.1])

  return (
    <ul className={styles.MobileCalendar}>
      {transitions.map(({ item, key, props }) => {
        const day = new Date(item.date).getDate()

        return (
          <animated.li
            className={styles.DayItem}
            key={key}
            style={{ ...props }}
          >
            <div className={cx(styles.Date, styles.hasRelease)}>{day}</div>
            <div className={styles.Releases}>
              <div
                className={styles.Release}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 100%), url(${item.cover})`,
                }}
              >
                <div className={styles.Info}>
                  <Dotdotdot clamp="auto">
                    <p>{item.name}</p>
                  </Dotdotdot>
                  {item.type === 'film' ? (
                    <Dotdotdot clamp="auto">
                      <p className={styles.Extra}>{item.director}</p>
                    </Dotdotdot>
                  ) : (
                    <ul className={styles.PlatformList}>
                      {item.platforms.map(platform => (
                        <li key={platform}>{getPlatformIcon(platform)}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </animated.li>
        )
      })}
    </ul>
  )
}

function Releases({ dayReleases }) {
  const transRef = useRef()
  const transitions = useTransition(dayReleases, item => item.name, {
    ref: transRef,
    unique: true,
    trail: 200 / dayReleases.length,
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0)' },
  })

  useChain([transRef], [0.1])

  return (
    <div className={styles.Releases}>
      {transitions.map(({ item: release, key, props }) => {
        return (
          <animated.div
            key={key}
            className={styles.Release}
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 100%), url(${release.cover})`,
              ...props,
            }}
          >
            <div className={styles.Info}>
              <Dotdotdot clamp="auto">
                <p>{release.name}</p>
              </Dotdotdot>
              {release.type === 'film' ? (
                <Dotdotdot clamp="auto">
                  <p className={styles.Extra}>{release.director}</p>
                </Dotdotdot>
              ) : (
                <ul className={styles.PlatformList}>
                  {release.platforms.map(platform => (
                    <li key={platform}>{getPlatformIcon(platform)}</li>
                  ))}
                </ul>
              )}
            </div>
          </animated.div>
        )
      })}
    </div>
  )
}

function Calendar({ type, month, year }) {
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

  const tableRef = useRef()

  const { width } = useWindowSize()

  const date = new Date(Date.UTC(year, month, 1))
  const daysQty = getDaysInMonth(date)
  const daysArray = range(1, daysQty)
  const firstDay = format(startOfMonth(date), 'EEEEEE', { locale: ruLocale })
  const firstDayIndex = daysOfWeek.findIndex(i => i === firstDay)

  const weeks = chunkify(
    firstDayIndex === 0
      ? daysArray
      : [...Array.from({ length: firstDayIndex }), ...daysArray],
    7,
  )

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
            <div className={styles.BottomGradient}></div>
          </div>
          <table ref={tableRef} className={styles.DesktopCalendar}>
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

                    function getTableItemWidth() {
                      if (dayReleases.length > 0) {
                        const pxWidth = dayReleases
                          .map(release => +release.width)
                          .reduce((acc, curr) => acc + curr, 0)

                        const percentageWidth = `${(pxWidth / width) * 85}%`

                        if (!width) return pxWidth

                        return percentageWidth
                      }

                      return 'inherit'
                    }

                    const tdWidth = getTableItemWidth()

                    return (
                      <td
                        style={{
                          width: tdWidth,
                        }}
                        className={cx(styles.DayItem, {
                          [styles.isNotWithinRange]: day === undefined,
                          [styles.someReleases]: dayReleases.length > 1,
                          [styles.hasRelease]: dayReleases.length > 0,
                        })}
                        key={`day_${index}`}
                      >
                        <div
                          className={cx(styles.Date, {
                            [styles.hasRelease]: dayReleases.length > 0,
                          })}
                        >
                          {day}
                        </div>
                        <Releases dayReleases={dayReleases} />
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <MobileCalendar releases={releases} />
        </>
      )}
    </main>
  )
}

export default Calendar
