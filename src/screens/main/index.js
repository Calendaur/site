import React from 'react'
import { ReleaseTypeChooser } from 'components'
import CalendarHeader from './CalendarHeader'
import Calendar from './Calendar'
import Meta from './Meta'

import styles from './styles.module.css'

function MainPage({ parsedURL, releases, meta }) {
  const { year, month, type } = parsedURL

  return (
    <div>
      <Meta meta={meta} />
      <div className={styles.FilterBar}>
        <ReleaseTypeChooser type={type} month={month} year={year} />
      </div>
      <CalendarHeader />
      <Calendar
        type={type}
        month={month.jsNumber}
        year={year}
        releases={releases}
      />
    </div>
  )
}

export default MainPage
