import React, { useMemo } from 'react'
import cx from 'classnames'
import styled from '@emotion/styled'
import { getWeeks } from 'features/releases/helpers'
import NoReleases from './NoReleases'
import ReleaseListInDay from '../ReleaseListInDay'
import MobileCalendar from '../MobileCalendar'

const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
const currentDay = new Date().getDate()
const currentMonth = new Date().getMonth()
const currentYear = new Date().getFullYear()

const DesktopCalendar = styled.div`
  position: relative;
  display: none;
  user-select: none;

  @media (min-width: 1200px) {
    display: block;
  }
`

const DayOfWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 16px;
  justify-items: center;
  margin-bottom: var(--vertical-5);
  font-size: 16px;
  font-weight: normal;
  line-height: 1;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
  text-transform: lowercase;
  letter-spacing: 1px;
  user-select: none;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(140px, auto);
  grid-gap: 16px;

  @media (min-width: 2200px) {
    grid-auto-rows: minmax(220px, auto);
  }
`

const Day = styled.div`
  position: relative;
  user-select: none;
  background: rgba(255, 255, 255, 0.02);
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
`

const DateLabel = styled.div`
  --size: 30px;
  --offset: 8px;

  position: absolute;
  top: var(--offset);
  left: var(--offset);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--size);
  height: var(--size);
  font-size: 14px;
  user-select: none;
  border-radius: 50%;

  &.hasRelease {
    font-weight: bold;
    color: var(--black-color);
    background-color: var(--white-color);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  &.isToday {
    font-weight: bold;
    color: var(--white-color);
    background-color: var(--blue);
  }
`

function Calendar({ type, month, year, releases }) {
  const weeks = useMemo(() => getWeeks(year, month), [year, month])

  return (
    <>
      {releases.length === 0 ? (
        <NoReleases />
      ) : (
        <>
          <DesktopCalendar>
            <DayOfWeek>
              {daysOfWeek.map(weekDay => (
                <div key={weekDay}>{weekDay}</div>
              ))}
            </DayOfWeek>
            <Grid>
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
                  <Day
                    key={index}
                    className={cx({
                      isNotWithinRange: day === undefined,
                      someReleases: dayReleases.length > 1,
                      hasRelease,
                    })}
                  >
                    <DateLabel
                      className={cx({
                        hasRelease,
                        isToday,
                      })}
                    >
                      <span>{day}</span>
                    </DateLabel>
                    <ReleaseListInDay type={type} releases={dayReleases} />
                  </Day>
                )
              })}
            </Grid>
          </DesktopCalendar>
          <MobileCalendar type={type} releases={releases} />
        </>
      )}
    </>
  )
}

export default Calendar
