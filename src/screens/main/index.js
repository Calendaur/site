import React from 'react'
import styled from '@emotion/styled'
import { ReleaseTypeChooser } from 'components'
import CalendarHeader from './CalendarHeader'
import Calendar from './Calendar'
import Meta from './Meta'

const FilterBar = styled.div`
  margin-bottom: var(--vertical-5);

  @media (min-width: 768px) {
    position: relative;
    top: initial;
    left: initial;
    z-index: 0;
    margin-top: 0;
    margin-bottom: var(--vertical-6);
    background-color: initial;
  }

  > div {
    display: flex;
    align-items: center;
  }
`

function MainPage({ parsedURL, releases, meta }) {
  const { year, month, type } = parsedURL

  return (
    <div>
      <Meta meta={meta} />
      <FilterBar>
        <ReleaseTypeChooser type={type} month={month} year={year} />
      </FilterBar>
      <CalendarHeader />
      <Calendar
        type={type}
        month={month.jsNumber}
        year={year}
        releases={releases}
      />
    </div>
  )
}

export default MainPage
