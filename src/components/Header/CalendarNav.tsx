import React from 'react'
import { routes } from 'shared/constants'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import Image from '../Image'
import Button from '../Button'
import { useDateCarousel } from './useDateCarousel'

import styles from './styles.module.css'

function CalendarNav() {
  const dateCarousel = useDateCarousel()

  if (!dateCarousel) return null

  const {
    push,
    disabledPrev,
    disabledNext,
    prevLink,
    nextLink,
    date,
    year,
  } = dateCarousel

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
          disabled={disabledPrev}
          onClick={() => {
            push(prevLink.href, prevLink.as)
          }}
        >
          <Image width="16" height="16" src="/icons/left.svg" />
        </button>
        <p className={styles.currentMonth}>
          {format(date, 'LLLL', { locale: ru })} <span>{year}</span>
        </p>
        <button
          disabled={disabledNext}
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
