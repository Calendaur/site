import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { addMonths, eachMonthOfInterval, format } from 'date-fns'
import ru from 'date-fns/locale/ru'
import ReleaseTypeChooser from './ReleaseTypeChooser'

import styles from './Archive.module.css'

const startDate = new Date(2020, 0, 1)
const endDate = addMonths(new Date(), 1)

const dates = eachMonthOfInterval({ start: startDate, end: endDate })

function ArchiveScreen() {
  const [selected, setSelect] = useState('films')

  useEffect(() => {
    if (window.location.hash) {
      setSelect(window.location.hash.replace('#', ''))
    }
  }, [])

  return (
    <>
      <Head>
        <title>Релизы, которые уже вышли в прошлые месяцы на released.at</title>
      </Head>
      <section>
        <ReleaseTypeChooser selected={selected} setSelect={setSelect} />
        <h1 className={styles.Title}>2020</h1>
        <div className={styles.MonthGrid}>
          {dates.map(date => (
            <Link
              key={date}
              href={`/${selected}/[date]`}
              as={`/${selected}/${format(date, 'LLLL').toLowerCase()}-2020`}
            >
              <a className={styles.Month}>
                {format(date, 'LLLL', { locale: ru })}
              </a>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export default ArchiveScreen
