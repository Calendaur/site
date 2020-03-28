import React, { Fragment } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Router from 'next/router'
import { useSelector } from 'react-redux'
import { useDrag } from 'react-use-gesture'
import { PageTransition } from 'next-page-transitions'
import { Header, Footer } from '../../components'
import FilterBar from './FilterBar'
import { actions } from './redux'
import { api, withRedux } from '../../lib'
import { checkFixRedirect, parseUrl, getNextAndPrevDate } from '../../core/url'

const Calendar = dynamic(() => import('./Calendar'), {
  ssr: false,
})

function MainPage({ parsedURL }) {
  const { year, month, type } = parsedURL

  const { prevMonth, prevYear, nextMonth, nextYear } = getNextAndPrevDate(
    month.jsNumber,
    year,
  )

  const prevLink = `/${type}/${prevMonth.eng}-${prevYear}`
  const nextLink = `/${type}/${nextMonth.eng}-${nextYear}`

  const releases = useSelector(state => state.releases)

  const hasReleasesInNextMonth =
    releases.filter(r => new Date(r.date).getMonth() === nextMonth.jsNumber)
      .length > 0

  function toNext() {
    Router.push('/[type]/[date]', nextLink)
  }
  function toPrev() {
    Router.push('/[type]/[date]', prevLink)
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
            toPrev={toPrev}
            toNext={toNext}
          />
          <Calendar type={type} month={month.jsNumber} year={year} />
          <Footer />
        </Fragment>
      </PageTransition>
    </div>
  )
}

MainPage.getInitialProps = async ctx => {
  checkFixRedirect(ctx)

  const { getState, dispatch } = ctx.reduxStore
  const parsedURL = parseUrl(ctx.asPath)

  const hasLoadedReleases = getState().releases.length > 0
  const hasLoaderBgs = getState().backgrounds.length > 0

  if (!hasLoadedReleases) {
    dispatch(actions.setReleases(await api.getReleases()))
  }

  if (!hasLoaderBgs) {
    dispatch(actions.setBackgrounds(await api.getBackgrounds()))
  }

  return { parsedURL }
}

export default withRedux(MainPage)
