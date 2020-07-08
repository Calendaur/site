import React, { Fragment } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useDrag } from 'react-use-gesture'
import ReleaseTypeChooser from './ReleaseTypeChooser'
import MonthChooser from './MonthChooser'
import Calendar from './Calendar'
import { getNextAndPrevDate } from '../../core/url'

import styles from './styles.module.css'

function MainPage({ parsedURL, releases, meta }) {
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
        <meta name="keywords" content />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://released.at" />
        <meta property="twitter:url" content="https://released.at" />
        <meta name="title" content={meta.title} />
        <meta name="description" content={meta.description} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta
          property="og:image"
          content="https://released.at/images/banner.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:text:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta
          name="twitter:image:src"
          content="https://released.at/images/banner.jpg"
        />
        <link rel="image_src" href="https://released.at/images/banner.jpg" />
        <title>{meta.title}</title>
      </Head>
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
          </div>
        </div>
        {/* <div className={styles.Survay}>
          <Button
            isPrimary
            onClick={() => {
              window.open('https://forms.gle/WVkrED3NpJx7naht9', '_blank')
            }}
          >
            Пройти опрос
          </Button>
          <p>
            Просим вас потратить 1 минуту, это очень поможет поможет нам
            улучшить проект
          </p>
        </div> */}
        <Calendar
          type={type}
          month={month.jsNumber}
          year={year}
          releases={releases}
        />
      </Fragment>
    </div>
  )
}

export default MainPage
