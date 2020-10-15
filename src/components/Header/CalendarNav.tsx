import React from 'react'
import { useRouter } from 'next/router'
import { months, routes } from 'shared/constants'
import Image from '../Image'
import Button from '../Button'

import styles from './styles.module.css'

const pagesWithCalendar = new Set([
  '/',
  '/games/[date]',
  '/films/[date]',
  '/series/[date]',
])

const engMonths = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
}

function dateCarousel(type: string, month: number, year: number) {
  const nextMonth = month === 11 ? 'january' : months[month + 1].eng
  const nextYear = nextMonth === 'january' ? year + 1 : year

  const prevMonth = month === 0 ? 'december' : months[month - 1].eng
  const prevYear = prevMonth === 'december' ? year - 1 : year

  return {
    nextMonth,
    prevMonth,
    nextLink: {
      href: `/${type}/[date]`,
      as: `/${type}/${nextMonth}-${nextYear}`,
    },
    prevLink: {
      href: `/${type}/[date]`,
      as: `/${type}/${prevMonth}-${prevYear}`,
    },
  }
}

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()

function CalendarNav() {
  const { route, asPath, push } = useRouter()

  if (!pagesWithCalendar.has(route)) return null

  let [type, date] = asPath.split('/').slice(1)

  if (type === '') {
    type = 'films'
    date = `${months[currentMonth].eng}-${currentYear}`
  }

  const [engMonth, year] = date.split('-')

  const { nextLink, prevLink, nextMonth } = dateCarousel(
    type,
    engMonths[engMonth],
    +year,
  )

  return (
    <div className={styles.calendarNav}>
      <Button
        outline
        className={styles.today}
        onClick={() => push(routes.TODAY)}
      >
        Сегодня
      </Button>
      <div className={styles.changeMonthButtons}>
        <button
          disabled={engMonth === 'january' && +year === 2020}
          onClick={() => {
            push(prevLink.href, prevLink.as)
          }}
        >
          <Image width="16" height="16" src="/icons/left.svg" />
        </button>
        <p className={styles.currentMonth}>
          {months[engMonths[engMonth]].rus} <span>{year}</span>
        </p>
        <button
          disabled={nextMonth === months[currentMonth + 2].eng}
          onClick={() => {
            push(nextLink.href, nextLink.as)
          }}
        >
          <Image width="16" height="16" src="/icons/right.svg" />
        </button>
      </div>
    </div>
  )
}

export default CalendarNav
