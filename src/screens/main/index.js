import React, { Fragment } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useDrag } from 'react-use-gesture'
import { Header, Footer } from '../../components'
import FilterBar from './FilterBar'
import Calendar from './Calendar'
import { getNextAndPrevDate } from '../../core/url'
import { rusType } from '../../core/helpers'

function MainPage({ parsedURL, releases, apiUrl }) {
  const { year, month, type } = parsedURL

  const { prevMonth, prevYear, nextMonth, nextYear } = getNextAndPrevDate(
    month.jsNumber,
    year,
  )

  const prevLink = `/${type}/${prevMonth.eng}-${prevYear}`
  const nextLink = `/${type}/${nextMonth.eng}-${nextYear}`

  const hasReleasesInNextMonth =
    releases.filter(r => new Date(r.released).getMonth() === nextMonth.jsNumber)
      .length > 0
  const hasReleasesInPrevMonth =
    releases.filter(
      r => new Date(r.released).getMonth() === nextMonth.jsNumber - 1,
    ).length > 0

  const { push } = useRouter()

  function toNext() {
    push('/[type]/[date]', nextLink)
  }
  function toPrev() {
    push('/[type]/[date]', prevLink)
  }

  const bind = useDrag(
    ({
      down,
      movement: [mx],
      delta,
      direction: [xDir, yDir],
      distance,
      cancel,
    }) => {
      if (down && distance > window.innerWidth / 4) {
        if (xDir <= 0 && !hasReleasesInNextMonth) return

        if (xDir >= 0 && prevYear < 2020) return

        const swipeRoute = xDir > 0 ? toPrev() : toNext()

        cancel(swipeRoute)
      }
    },
    { axis: 'x' },
  )

  return (
    <div {...bind()}>
      <Head>
        <title>
          Calendaur | {rusType(type)} за {month.rus} {year}
        </title>
      </Head>
      <Header />
      <Fragment key={`${type}-${month.eng}-${year}`}>
        <FilterBar
          type={type}
          month={month}
          year={year}
          prevYear={prevYear}
          nextYear={nextYear}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
          prevLink={prevLink}
          nextLink={nextLink}
          hasReleasesInNextMonth={hasReleasesInNextMonth}
          hasReleasesInPrevMonth={hasReleasesInPrevMonth}
          toPrev={toPrev}
          toNext={toNext}
        />
        <Calendar
          type={type}
          month={month.jsNumber}
          year={year}
          releases={releases}
        />
        <Footer />
      </Fragment>
    </div>
  )
}

export default MainPage
