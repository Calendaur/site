import React, { useContext, useMemo } from 'react'
import styled from '@emotion/styled'
import { A } from 'components'
import { UrlDataContext } from 'core/urlDataContext'

const Title = styled.h1`
  margin-bottom: var(--vertical-5);

  & > a {
    opacity: 0.4;
    transition: var(--transition);

    &:hover {
      opacity: 1;
    }
  }
`

const currentYear = new Date().getFullYear()

function CalendarHeader() {
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
  } = useContext(UrlDataContext)
  const isNotActual = !isCurrentMonth && !isNextMonth

  const actualTypeText = useMemo(() => {
    if (type === 'films') return 'кино'
    if (type === 'games') return 'игр'
    if (type === 'series') return 'сериалов'
  }, [type])
  const nonActualTypeText = useMemo(() => {
    if (type === 'films') return 'Кино'
    if (type === 'games') return 'Игры'
    if (type === 'series') return 'Сериалы'
  }, [type])

  if (isNotActual)
    return (
      <Title>
        {nonActualTypeText} {month.rus} {year}
      </Title>
    )

  return (
    <Title>
      Новинки {actualTypeText} за {month.rus} {year === currentYear ? '' : year}{' '}
      {isCurrentMonth ? (
        <A {...nextLink}>{nextMonth.rus}&nbsp;→</A>
      ) : (
        <A {...prevLink}>←&nbsp;{prevMonth.rus}</A>
      )}
    </Title>
  )
}

export default CalendarHeader
