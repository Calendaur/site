import React from 'react'
import Head from 'next/head'
import ReleaseTypeChooser from './ReleaseTypeChooser'
import CalendarHeader from './CalendarHeader'
import Calendar from './Calendar'

import styles from './styles.module.css'

function MainPage({ parsedURL, releases, meta }) {
  const { year, month, type } = parsedURL

  return (
    <div className={styles.Wrapper}>
      <Head>
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
