import React from 'react'
import cx from 'classnames'
import styled from '@emotion/styled'
import { useWindowWidth } from 'shared/hooks'
import NoReleases from './NoReleases'
import ReleaseListInDay from '../ReleaseListInDay'
import MobileCalendar from '../MobileCalendar'

const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
const currentDay = new Date().getDate()
const currentMonth = new Date().getMonth()
const currentYear = new Date().getFullYear()

const StyledCalendar = styled.div`
  position: relative;
  display: block;
  user-select: none;

  .day-of-week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 24px;
    justify-items: center;
    margin-bottom: var(--vertical-5);
    font-size: 16px;
    font-weight: normal;
    line-height: 1;
    text-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
    text-transform: lowercase;
    letter-spacing: 1px;
    user-select: none;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: minmax(140px, auto);
    grid-gap: 24px;

    @media (min-width: 2200px) {
      grid-auto-rows: minmax(220px, auto);
    }
  }

  .day {
    position: relative;
    user-select: none;
    background: rgba(255, 255, 255, 0.006);
    border-radius: 14px;
    will-change: opacity;

    &.isNotWithinRange {
      opacity: 0.25;
    }

    &.someReleases {
      background: transparent;
    }

    &.hasRelease {
      background: initial;
    }
  }

  .date-label {
    --size: 30px;
    --offset: 8px;

    position: absolute;
    top: var(--offset);
    left: var(--offset);
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 24px;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    user-select: none;
    border-radius: 12px;

    &.hasRelease {
      font-weight: bold;
      color: var(--black-color);
      background-color: var(--white-color);
      box-shadow: 0 5px 24px rgba(0, 0, 0, 1);
    }

    &.isToday {
      font-weight: bold;
      color: var(--white-color);
      background-color: var(--blue);
    }
  }
`

function Calendar({ type, month, year, releases, grouped, weeks }) {
  const width = useWindowWidth()

  if (releases.length === 0) return <NoReleases />

  if (width >= 1200) {
    return (
      <StyledCalendar>
        <div className="day-of-week">
          {daysOfWeek.map(weekDay => (
            <div key={weekDay}>{weekDay}</div>
          ))}
        </div>
        <div className="grid">
          {JSON.parse(weeks).map((day, index) => {
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
                className={cx('day', {
                  isNotWithinRange: day === undefined,
                  someReleases: dayReleases.length > 1,
                  hasRelease,
                })}
              >
                <div
                  className={cx('date-label', {
                    hasRelease,
                    isToday,
                  })}
                >
                  <span>{day}</span>
                </div>
                <ReleaseListInDay type={type} releases={dayReleases} />
              </div>
            )
          })}
        </div>
      </StyledCalendar>
    )
  }

  return <MobileCalendar type={type} releases={grouped} />
}

export default Calendar
