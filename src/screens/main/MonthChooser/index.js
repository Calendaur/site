import React from 'react'
import Link from 'next/link'

import styles from './styles.module.css'

function MonthChooser({ type, prevLink, month, nextLink, fromArchive }) {
  const currentMonth = new Date().getMonth()

  if (fromArchive) return null

  return (
    <div className={styles.MonthChooser}>
      {currentMonth < month.jsNumber ? (
        <Link href={`/${type}/[date]`} as={prevLink}>
          <a className="underline">← текущий месяц</a>
        </Link>
      ) : null}
      <div className={styles.Date}>{month.rus}</div>
      {currentMonth === month.jsNumber ? (
        <Link href={`/${type}/[date]`} as={nextLink}>
          <a className="underline">следующий месяц →</a>
        </Link>
      ) : null}
    </div>
  )
}

export default MonthChooser
