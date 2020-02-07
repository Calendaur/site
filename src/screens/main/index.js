import React from 'react'
import Head from 'next/head'
import { PageTransition } from 'next-page-transitions'
import Header from './Header'
import Calendar from './Calendar'
import Footer from './Footer'
import { parseCorrectURL } from './helpers'
import { actions } from './redux'
import { checkAndCorrectURL, redirect, api, withRedux } from '../../lib'

function MainPage({ parsedURL }) {
  const { year, month, type } = parsedURL

  return (
    <>
      <Head>
        <title>
          Calendaur | {type === 'games' ? 'игры' : 'фильмы'} за {month.rus}{' '}
          {year}
        </title>
      </Head>
      <Header type={type} month={month} year={year} />
      <PageTransition
        timeout={350}
        classNames="page-transition"
        loadingClassNames="loading-indicator"
        loadingComponent={<div className="loader" />}
        loadingDelay={500}
        loadingTimeout={{
          enter: 350,
          exit: 0,
        }}
      >
        <Calendar type={type} month={month.jsNumber} year={year} />
      </PageTransition>
      <Footer />
    </>
  )
}

MainPage.getInitialProps = async ctx => {
  const { url, isCorrect } = checkAndCorrectURL(ctx.asPath)

  if (!isCorrect) {
    redirect(ctx, url)

    return {}
  }

  const { getState, dispatch } = ctx.reduxStore

  const hasLoadedReleases = getState().releases.length > 0
  const hasLoaderBgs = getState().backgrounds.length > 0

  if (!hasLoadedReleases) {
    dispatch(actions.setReleases(await api.getReleases()))
  }

  if (!hasLoaderBgs) {
    dispatch(actions.setBackgrounds(await api.getBackgrounds()))
  }

  return { parsedURL: parseCorrectURL(url) }
}

export default withRedux(MainPage)
