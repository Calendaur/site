import React from 'react'
import dynamic from 'next/dynamic'
import { Calendar, FilmsSeriesGames } from 'components-css'
import Meta from './Meta'

const Notifications = dynamic(() => import('../../components/Notifications'), {
  ssr: false,
})

function MainPage({ parsedURL, grouped, meta, weeks }) {
  const { year, month } = parsedURL

  return (
    <div>
      <Notifications />
      <Meta meta={meta} />
      <FilmsSeriesGames />
      <Calendar
        weeks={weeks}
        month={month.jsNumber}
        year={year}
        releases={grouped}
      />
    </div>
  )
}

export default MainPage
