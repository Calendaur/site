import Head from 'next/head'
import Link from 'next/link'
import format from 'date-fns/format'
import addMonths from 'date-fns/addMonths'
import eachYearOfInterval from 'date-fns/eachYearOfInterval'
import eachMonthOfInterval from 'date-fns/eachMonthOfInterval'
import ru from 'date-fns/locale/ru'
import { Title } from 'components'
import { months } from 'shared/constants'

import styles from './styles.module.css'

const interval = {
  start: new Date(2020, 0, 1),
  end: addMonths(new Date(), -1),
}

const yearsInterval = eachYearOfInterval(interval)

let archive: {
  [year: string]: { title: string; num: string }[]
} = {}

yearsInterval.forEach(date => {
  archive[format(date, 'yyyy')] = eachMonthOfInterval(interval)
    .map(date => ({
      title: format(date, 'LLLL', { locale: ru }),
      num: format(date, 'M', { locale: ru }),
    }))
    .reverse()
})

function ArchiveScreen() {
  return (
    <>
      <Head>
        <title>Релизы, которые уже вышли в прошлые месяцы на released.at</title>
      </Head>
      <div>
        <Title>Архив релизов</Title>
        <section className={styles.Section}>
          <Title h2>Кино</Title>
          {Object.keys(archive).map(year => (
            <div key={year}>
              <Title h3>{year}</Title>
              <ul>
                {archive[year].map(month => (
                  <li key={month.title}>
                    <Link href={`/films/${months[+month.num - 1].eng}-${year}`}>
                      <a>{month.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
        <section className={styles.Section}>
          <Title h2>Сериалы</Title>
          {Object.keys(archive).map(year => (
            <div key={year}>
              <Title h3>{year}</Title>
              <ul>
                {archive[year].map(month => (
                  <li key={month.title}>
                    <Link
                      href={`/series/${months[+month.num - 1].eng}-${year}`}
                    >
                      <a>{month.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
        <section className={styles.Section}>
          <Title h2>Игры</Title>
          {Object.keys(archive).map(year => (
            <div key={year}>
              <Title h3>{year}</Title>
              <ul>
                {archive[year].map(month => (
                  <li key={month.title}>
                    <Link href={`/games/${months[+month.num - 1].eng}-${year}`}>
                      <a>{month.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>
    </>
  )
}

export default ArchiveScreen
