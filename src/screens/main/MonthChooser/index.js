import React from 'react'
import { isThisMonth, parseISO } from 'date-fns'
import Link from 'next/link'

import styles from './styles.module.css'

function MonthChooser({
  type,
  prevLink,
  prevYear,
  year,
  month,
  nextLink,
  nextYear,
  prevMonth,
  nextMonth,
}) {
  const currentMonth = new Date().getMonth()

  return (
    <div className={styles.MonthChooser}>
      {currentMonth < month.jsNumber ? (
        <Link href={`/${type}/[date]`} as={prevLink}>
          <a>← предыдущий месяц</a>
        </Link>
      ) : null}
      <div className={styles.Date}>{month.rus}</div>
      {currentMonth === month.jsNumber ? (
        <Link href={`/${type}/[date]`} as={nextLink}>
          <a>следующий месяц →</a>
        </Link>
      ) : null}
    </div>
  )
}

export default MonthChooser
