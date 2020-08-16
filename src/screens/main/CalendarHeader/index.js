import React from 'react'
import { A } from 'components'
import { usePageData } from 'features/releases/page-data'

import styles from './styles.module.css'

const currentYear = new Date().getFullYear()

function CalendarHeader() {
  const data = usePageData()

  if (!data) return null

  const {
    month,
    year,
    type,
    isCurrentMonth,
    isNextMonth,
    nextMonth,
    prevMonth,
    prevLink,
    nextLink,
  } = data
  const isNotActual = !isCurrentMonth && !isNextMonth

  const actualTypeText = () => {
    if (type === 'films') return 'кино'
    if (type === 'games') return 'игр'
    if (type === 'series') return 'сериалов'
  }

  const nonActualTypeText = () => {
    if (type === 'films') return 'Кино'
    if (type === 'games') return 'Игры'
    if (type === 'series') return 'Сериалы'
  }

  if (isNotActual)
    return (
      <h1 className={styles.Title}>
        {nonActualTypeText()} {month.rus} {year}
      </h1>
    )

  return (
    <h1 className={styles.Title}>
      Новинки {actualTypeText()} за {month.rus}{' '}
      {year === currentYear ? '' : year}{' '}
      {isCurrentMonth ? (
        <A {...nextLink}>{nextMonth.rus}&nbsp;→</A>
      ) : (
        <A {...prevLink}>←&nbsp;{prevMonth.rus}</A>
      )}
    </h1>
  )
}

export default CalendarHeader
