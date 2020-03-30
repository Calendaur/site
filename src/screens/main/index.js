import React, { Fragment } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useDrag } from 'react-use-gesture'
import { PageTransition } from 'next-page-transitions'
import useSWR from 'swr'
import { Header, Footer } from '../../components'
import FilterBar from './FilterBar'
import Calendar from './Calendar'
import useAuthentication from '../../core/auth/useAuthentication'
import { getNextAndPrevDate } from '../../core/url'
import { fetchReleases, fetchBackgrounds } from '../../core/api'

const PWAPrompt = dynamic(() => import('react-ios-pwa-prompt'), {
  ssr: false,
})

function MainPage({
  parsedURL,
  date,
  releases: initialReleases,
  backgrounds: initialBackgrounds,
}) {
  const { data: releases } = useSWR('releases', fetchReleases, {
    initialData: initialReleases,
  })
  const { data: backgrounds } = useSWR(
    `backgrounds-${date}`,
    () => fetchBackgrounds(date),
    {
      initialData: initialBackgrounds,
    },
  )

  useAuthentication()
  const { year, month, type } = parsedURL

  const { prevMonth, prevYear, nextMonth, nextYear } = getNextAndPrevDate(
    month.jsNumber,
    year,
  )

  const prevLink = `/${type}/${prevMonth.eng}-${prevYear}`
  const nextLink = `/${type}/${nextMonth.eng}-${nextYear}`

  const hasReleasesInNextMonth =
    releases.filter(r => new Date(r.date).getMonth() === nextMonth.jsNumber)
      .length > 0
  const hasReleasesInPrevMonth =
    releases.filter(r => new Date(r.date).getMonth() === nextMonth.jsNumber - 1)
      .length > 0

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
          Calendaur | {type === 'games' ? 'игры' : 'фильмы'} за {month.rus}{' '}
          {year}
        </title>
      </Head>
      <Header />
      <PageTransition loadingClassNames="" classNames="" timeout={0}>
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
            backgrounds={backgrounds}
          />
          <PWAPrompt
            promptOnVisit={1}
            timesToShow={3}
            copyClosePrompt="Close"
            permanentlyHideOnDismiss={false}
          />
          <Footer />
        </Fragment>
      </PageTransition>
    </div>
  )
}

export default MainPage
