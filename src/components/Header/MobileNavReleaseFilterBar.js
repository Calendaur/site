import React from 'react'
import cx from 'classnames'
import { usePageData } from 'features/releases/page-data'
import { releaseTypes } from 'shared/constants'
import A from '../A'

import styles from './styles.module.css'

function MobileNavReleaseFilterBar() {
  const data = usePageData()

  if (!data) return null

  const {
    type,
    month,
    year,
    isCurrentMonth,
    isNextMonth,
    prevLink,
    nextLink,
    prevMonth,
    nextMonth,
  } = data

  return (
    <div className={styles.FilterBar}>
      <ul className={styles.TypeFilter}>
        {releaseTypes.map(({ type: t, title }) => (
          <li key={t}>
            <A
              href={`/${t}/[date]`}
              as={`/${t}/${month.eng}-${year}`}
              className={cx({
                [styles.active]: type === t,
              })}
            >
              {title}
            </A>
          </li>
        ))}
      </ul>
      <div className={styles.MonthFilter}>
        {isNextMonth && <A {...prevLink}>← {prevMonth.rus}</A>}
        <div>{month.rus}</div>
        {isCurrentMonth && <A {...nextLink}>{nextMonth.rus} →</A>}
      </div>
    </div>
  )
}

export default MobileNavReleaseFilterBar
