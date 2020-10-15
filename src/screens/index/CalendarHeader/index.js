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

  const { month, year, type, currentYear } = data

  const actualTypeText = () => {
    if (type === 'films') return 'кино'
    if (type === 'games') return 'игр'
    if (type === 'series') return 'сериалов'
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
      </div>
      {type === 'films' && <Filters className="buttons" />}
    </Wrapper>
  )
}

export default CalendarHeader
