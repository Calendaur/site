import React from 'react'
import styled from '@emotion/styled'
import { routes } from 'shared/constants'
import Button from '../Button'
import A from '../A'
import Image from '../Image'

const Wrapper = styled.div`
  a {
    font-size: 0.875rem;

    img,
    amp-img {
      margin-right: 4px;
    }
  }

  .today {
    margin-right: 24px;
    margin-bottom: 12px;

    @media (min-width: 768px) {
      margin-bottom: 0;
    }
  }
`

function FilterBar({ className }) {
  return (
    <Wrapper className={className}>
      <Button as={A} white href={routes.WHAT_TO_SEE}>
        <Image width="20" height="20" src="/icons/tinder.svg" />
        Кинотиндер
      </Button>
    </Wrapper>
  )
}

export default FilterBar
