import React from 'react'
import styled from '@emotion/styled'
import { routes } from 'shared/constants'
import Button from '../Button'
import A from '../A'

const Wrapper = styled.div``

function FilterBar() {
  return (
    <Wrapper>
      <Button as={A} primary href={routes.TODAY}>
        Сегодня&nbsp;
        <span role="img" aria-label="calendar">
          📅
        </span>
      </Button>
    </Wrapper>
  )
}

export default FilterBar
