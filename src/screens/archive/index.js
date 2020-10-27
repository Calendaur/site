import { useEffect, useState } from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import { addMonths, eachMonthOfInterval, format } from 'date-fns'
import ru from 'date-fns/locale/ru'
import { A } from 'components'
import { center } from 'shared/css-utils'
import ReleaseTypeChooser from './ReleaseTypeChooser'

const startDate = new Date(2020, 0, 1)
const endDate = addMonths(new Date(), -1)

const dates = eachMonthOfInterval({ start: startDate, end: endDate })

const Title = styled.h1`
  margin-bottom: var(--vertical-2);
`

const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
  grid-auto-rows: minmax(200px, auto);
  grid-gap: 16px;

  & > a.month {
    ${center}
    font-size: 2rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    transition: var(--transition);

    @media (min-width: 768px) {
      &:hover {
        transform: translate(0, -4px);
      }

      &:active {
        transform: translate(0, 0);
      }
    }
  }
`

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
        <Title>2020</Title>
        <MonthGrid>
          {dates.map(date => (
            <A
              key={date}
              href={`/${selected}/[date]`}
              as={`/${selected}/${format(date, 'LLLL').toLowerCase()}-2020`}
              className="month"
            >
              {format(date, 'LLLL', { locale: ru })}
            </A>
          ))}
        </MonthGrid>
      </section>
    </>
  )
}

export default ArchiveScreen
