import React from 'react'
import styled from '@emotion/styled'
import format from 'date-fns/format'
import { A, Filters } from 'components'
import { usePageData } from 'features/releases/page-data'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: var(--vertical-5);

  .title {
    display: inline-flex;
    margin-bottom: var(--vertical-5);

    h1 {
      margin-bottom: 0;
      font-size: 1.4rem;

      @media (min-width: 768px) {
        font-size: 2rem;
      }
    }

    a {
      font-size: 1.4rem;
      font-weight: 800;
      line-height: 1.125;
      opacity: 0.4;
      transition: var(--transition);

      &:hover {
        opacity: 1;
      }

      @media (min-width: 768px) {
        font-size: 2rem;
      }
    }
  }
`

function CalendarHeader() {
  const data = usePageData()

  if (!data) return null

  const {
    month,
    year,
    type,
    isCurrentMonth,
    isNextMonth,
    nextMonth,
    prevMonth,
    prevLink,
    nextLink,
    currentMonth,
    currentYear,
  } = data
  const isNotActual = !isCurrentMonth && !isNextMonth

  const actualTypeText = () => {
    if (type === 'films') return 'кино'
    if (type === 'games') return 'игр'
    if (type === 'series') return 'сериалов'
  }

  const nonActualTypeText = () => {
    if (type === 'films') return 'Кино'
    if (type === 'games') return 'Игры'
    if (type === 'series') return 'Сериалы'
  }

  if (isNotActual) {
    return (
      <Wrapper>
        <div className="title">
          <h1>
            <span>
              {nonActualTypeText()} {month.rus} {year}
            </span>
          </h1>
          &ensp;
          <A
            href={`/${type}/[date]`}
            as={`/${type}/${format(new Date(), 'LLLL').toLowerCase()}-${format(
              new Date(),
              'yyyy',
            )}`}
          >
            {currentMonth.rus} {currentYear}&nbsp;→
          </A>
        </div>
        <Filters className="buttons" />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div className="title">
        <h1>
          <span>
            Новинки {actualTypeText()} за {month.rus}{' '}
            {year === currentYear ? '' : year}
          </span>
        </h1>
        &ensp;
        {isCurrentMonth ? (
          <A {...nextLink}>{nextMonth.rus}&nbsp;→</A>
        ) : (
          <A {...prevLink}>←&nbsp;{prevMonth.rus}</A>
        )}
      </div>
      <Filters className="buttons" />
    </Wrapper>
  )
}

export default CalendarHeader
