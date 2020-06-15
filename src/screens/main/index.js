import React, { Fragment } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useDrag } from 'react-use-gesture'
import { Header, Footer } from '../../components'
import ReleaseTypeChooser from './ReleaseTypeChooser'
import MonthChooser from './MonthChooser'
import Calendar from './Calendar'
import { getNextAndPrevDate } from '../../core/url'
import { rusType } from '../../core/helpers'

import styles from './styles.module.css'

function MainPage({ parsedURL, releases }) {
  const { year, month, type } = parsedURL

  const { prevMonth, prevYear, nextMonth, nextYear } = getNextAndPrevDate(
    month.jsNumber,
    year,
  )

  const prevLink = `/${type}/${prevMonth.eng}-${prevYear}`
  const nextLink = `/${type}/${nextMonth.eng}-${nextYear}`

  const { push } = useRouter()

  function toNext() {
    push(`/${type}/[date]`, nextLink)
  }
  function toPrev() {
    push(`/${type}/[date]`, prevLink)
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
      if (window.innerWidth > 1120) return

      if (down && distance > window.innerWidth / 4) {
        if (xDir <= 0 && nextYear > 2030) return

        if (xDir >= 0 && prevYear < 2020) return

        const swipeRoute = xDir > 0 ? toPrev() : toNext()

        cancel(swipeRoute)
      }
    },
    { axis: 'x' },
  )

  return (
    <div {...bind()} className={styles.Wrapper}>
      <Head>
        <title>
          Calendaur | {rusType(type)} за {month.rus} {year}
        </title>
      </Head>
      <Header />
      <Fragment key={`${type}-${month.eng}-${year}`}>
        <div className={styles.FilterBar}>
          <ReleaseTypeChooser type={type} month={month} year={year} />
          <div>
            <MonthChooser
              type={type}
              month={month}
              year={year}
              prevYear={prevYear}
              nextYear={nextYear}
              prevMonth={prevMonth}
              nextMonth={nextMonth}
              prevLink={prevLink}
              nextLink={nextLink}
              toPrev={toPrev}
              toNext={toNext}
            />
            {/* {(type === 'films' || type === 'digital') && (
              <button
                onClick={() => {
                  if (type === 'digital') {
                    push('/films/[date]', `/films/${month.eng}-${year}`)
                    return
                  }

                  push('/digital/[date]', `/digital/${month.eng}-${year}`)
                }}
                className={styles.ToDigital}
              >
                {type === 'digital' ? 'премьеры' : 'в цифре'}
              </button>
            )} */}
          </div>
        </div>
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
