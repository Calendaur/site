import React, { useContext, useMemo } from 'react'
import Link from 'next/link'
import { UrlDataContext } from '../../../core/urlDataContext'

import styles from './styles.module.css'

function CalendarHeader() {
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
  } = useContext(UrlDataContext)
  const isNotActual = !isCurrentMonth && !isNextMonth
  const currentYear = new Date().getFullYear()

  const actualTypeText = useMemo(() => {
    if (type === 'films') return 'кино'
    if (type === 'games') return 'игр'
    if (type === 'series') return 'сериалов'
  }, [type])
  const nonActualTypeText = useMemo(() => {
    if (type === 'films') return 'Кино'
    if (type === 'games') return 'Игры'
    if (type === 'series') return 'Сериалы'
  }, [type])

  if (isNotActual)
    return (
      <h1 className={styles.Title}>
        {nonActualTypeText} за {month.rus} {year}
      </h1>
    )

  return (
    <h1 className={styles.Title}>
      Новинки {actualTypeText} за {month.rus} {year === currentYear ? '' : year}{' '}
      {isCurrentMonth ? (
        <Link {...nextLink}>
          <a>{nextMonth.rus}&nbsp;→</a>
        </Link>
      ) : (
        <Link {...prevLink}>
          <a>←&nbsp;{prevMonth.rus}</a>
        </Link>
      )}
    </h1>
  )
}

export default CalendarHeader
