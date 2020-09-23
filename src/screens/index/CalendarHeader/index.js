import React from 'react'
import styled from '@emotion/styled'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import { A, Filters } from 'components'
import { usePageData } from 'features/releases/page-data'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: var(--vertical-5);

  > div {
    margin-top: var(--vertical-6);
  }

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;

    > div {
      margin-top: 0;
    }
  }

  h1 {
    margin-bottom: 0;

    & > a {
      opacity: 0.4;
      transition: var(--transition);

      &:hover {
        opacity: 1;
      }
    }
  }
`

const currentYear = new Date().getFullYear()

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
        <h1>
          {nonActualTypeText()} {month.rus} {year}{' '}
          <A
            href={`/${type}/[date]`}
            as={`/${type}/${format(new Date(), 'LLLL').toLowerCase()}-${format(
              new Date(),
              'yyyy',
            )}`}
          >
            к текущему месяцу&nbsp;→
          </A>
        </h1>
        <Filters />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h1>
        Новинки {actualTypeText()} за {month.rus}{' '}
        {year === currentYear ? '' : year}{' '}
        {isCurrentMonth ? (
          <A {...nextLink}>{nextMonth.rus}&nbsp;→</A>
        ) : (
          <A {...prevLink}>←&nbsp;{prevMonth.rus}</A>
        )}
      </h1>
      <Filters />
    </Wrapper>
  )
}

export default CalendarHeader
