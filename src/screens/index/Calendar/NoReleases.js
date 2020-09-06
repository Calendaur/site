import React from 'react'
import styled from '@emotion/styled'

const NotYetFilled = styled.div`
  min-height: 100vh;

  & > p {
    max-width: 760px;
    padding-top: 10vh;
    margin: 0 auto;
    font-size: 2.5rem;
    line-height: 1.56;
    text-align: center;
  }
`

function NoReleases() {
  return (
    <NotYetFilled>
      <p>Релизы для этого месяца еще заполняются</p>
    </NotYetFilled>
  )
}

export default NoReleases
