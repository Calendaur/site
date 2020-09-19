import React from 'react'
import dynamic from 'next/dynamic'
import styled from '@emotion/styled'
import { ReleaseTypeChooser } from 'components'
import CalendarHeader from './CalendarHeader'
import Meta from './Meta'

const Calendar = dynamic(() => import('./Calendar'), { ssr: true })

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

function MainPage({ parsedURL, releases, grouped, meta, weeks }) {
  const { year, month, type } = parsedURL

  return (
    <div>
      <Meta meta={meta} />
      <FilterBar>
        <ReleaseTypeChooser type={type} month={month} year={year} />
      </FilterBar>
      <CalendarHeader />
      <Calendar
        weeks={weeks}
        type={type}
        month={month.jsNumber}
        year={year}
        releases={releases}
        grouped={grouped}
      />
    </div>
  )
}

export default MainPage
