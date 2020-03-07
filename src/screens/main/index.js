import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { useSelector } from 'react-redux'
import { useDrag } from 'react-use-gesture'
import { PageTransition } from 'next-page-transitions'
import Header, { generateHref, findMonth } from './Header'
import Calendar from './Calendar'
import Footer from './Footer'
import { actions } from './redux'
import { api, withRedux } from '../../lib'
import { checkFixRedirect, parseUrl } from '../../core/url'

function MainPage({ parsedURL }) {
  const { year, month, type } = parsedURL

  const nextMonth =
    month.jsNumber === 11
      ? 'январь'
      : findMonth(m => m.jsNumber === month.jsNumber + 1).rus
  const nextYear = nextMonth === 'январь' ? year + 1 : year

  const prevMonth =
    month.jsNumber === 0
      ? 'декабрь'
      : findMonth(m => m.jsNumber === month.jsNumber - 1).rus
  const prevYear = prevMonth === 'декабрь' ? year - 1 : year

  const releases = useSelector(state => state.releases)

  const hasReleasesInNextMonth =
    releases.filter(
      r =>
        new Date(r.date).getMonth() ===
        findMonth(m => m.rus === nextMonth).jsNumber,
    ).length > 0

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

        const swipeRoute =
          xDir > 0
            ? Router.push(
                '/[type]/[date]',
                generateHref(
                  type,
                  findMonth(m => m.rus === prevMonth),
                  prevYear,
                ),
              )
            : Router.push(
                '/[type]/[date]',
                generateHref(
                  type,
                  findMonth(m => m.rus === nextMonth),
                  nextYear,
                ),
              )

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
      <Header type={type} month={month} year={year} />
      <PageTransition
        timeout={250}
        loadingClassNames="loading-indicator"
        classNames=""
        loadingDelay={350}
        loadingTimeout={{
          enter: 250,
          exit: 0,
        }}
      >
        <>
          <Calendar type={type} month={month.jsNumber} year={year} />
          <Footer />
        </>
      </PageTransition>
    </div>
  )
}

MainPage.getInitialProps = async ctx => {
  checkFixRedirect(ctx)

  const { getState, dispatch } = ctx.reduxStore

  const hasLoadedReleases = getState().releases.length > 0
  const hasLoaderBgs = getState().backgrounds.length > 0

  if (!hasLoadedReleases) {
    dispatch(actions.setReleases(await api.getReleases()))
  }

  if (!hasLoaderBgs) {
    dispatch(actions.setBackgrounds(await api.getBackgrounds()))
  }

  return { parsedURL: parseUrl(ctx.asPath) }
}

export default withRedux(MainPage)
