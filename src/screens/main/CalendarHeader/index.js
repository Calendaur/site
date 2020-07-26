import React from 'react'
import styled from '@emotion/styled'
import { A } from 'components'
import { useStore } from 'core/store'

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
  const { releasesPageData } = useStore()

  if (!releasesPageData) return null

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
  } = releasesPageData
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

  if (isNotActual)
    return (
      <Title>
        {nonActualTypeText()} {month.rus} {year}
      </Title>
    )

  return (
    <Title>
      Новинки {actualTypeText()} за {month.rus}{' '}
      {year === currentYear ? '' : year}{' '}
      {isCurrentMonth ? (
        <A {...nextLink}>{nextMonth.rus}&nbsp;→</A>
      ) : (
        <A {...prevLink}>←&nbsp;{prevMonth.rus}</A>
      )}
    </Title>
  )
}

export default CalendarHeader
