import React from 'react'
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
  return (
    <div className={styles.MonthChooser}>
      <Link href={`/${type}/[date]`} as={prevLink}>
        <a disabled={prevYear < 2020}>{prevMonth.rus}</a>
      </Link>
      <div className={styles.Date}>{month.rus}</div>
      <Link href={`/${type}/[date]`} as={nextLink}>
        <a disabled={nextYear > 2030}>{nextMonth.rus}</a>
      </Link>
    </div>
  )
}

export default MonthChooser
