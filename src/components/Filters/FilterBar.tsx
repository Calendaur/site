import React from 'react'
import styled from '@emotion/styled'
import { routes } from 'shared/constants'
import Button from '../Button'
import A from '../A'

const Wrapper = styled.div`
  .today {
    margin-right: 24px;
    margin-bottom: 12px;

    @media (min-width: 768px) {
      margin-bottom: 0;
    }
  }
`

function FilterBar() {
  return (
    <Wrapper>
      <Button as={A} primary href={routes.TODAY} className="today">
        Сегодня&nbsp;
        <span role="img" aria-label="calendar">
          📅
        </span>
      </Button>
      <Button as={A} primary href={routes.WHAT_TO_SEE}>
        Что посмотреть?&nbsp;
        <span role="img" aria-label="calendar">
          🤔
        </span>
      </Button>
    </Wrapper>
  )
}

export default FilterBar
