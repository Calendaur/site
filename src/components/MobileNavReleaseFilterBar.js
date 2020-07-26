import React, { useContext } from 'react'
import styled from '@emotion/styled'
import cx from 'classnames'
import { StoreContext } from 'core/store'
import A from './A'

const types = [
  {
    type: 'films',
    title: 'Кино',
  },
  {
    type: 'series',
    title: 'Сериалы',
  },
  {
    type: 'games',
    title: 'Игры',
  },
]

const FilterBar = styled.div`
  position: absolute;
  bottom: 80px;
`

const TypeFilter = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;

  & > li {
    margin-right: var(--horizontal-4);

    & > a {
      position: relative;
      font-size: 1.4rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      opacity: 0.4;

      &.active {
        opacity: 1;
      }

      &:hover {
        opacity: 1;
      }
    }
  }
`

const MonthFilter = styled.div`
  display: flex;

  & > * {
    padding: 12px 16px 12px 0;
    margin-right: var(--horizontal-6);
  }

  & > a {
    opacity: 0.4;

    &:hover {
      opacity: 1;
    }
  }
`

function MobileNavReleaseFilterBar() {
  const {
    store: { releasesPageData },
  } = useContext(StoreContext)

  if (!releasesPageData) return null

  const {
    type,
    month,
    year,
    isCurrentMonth,
    isNextMonth,
    prevLink,
    nextLink,
    prevMonth,
    nextMonth,
  } = releasesPageData

  return (
    <FilterBar>
      <TypeFilter>
        {types.map(({ type: t, title }) => (
          <li key={t}>
            <A
              href={`/${t}/[date]`}
              as={`/${t}/${month.eng}-${year}`}
              className={cx({
                active: type === t,
              })}
            >
              {title}
            </A>
          </li>
        ))}
      </TypeFilter>
      <MonthFilter>
        {isNextMonth && <A {...prevLink}>← {prevMonth.rus}</A>}
        <div>{month.rus}</div>
        {isCurrentMonth && <A {...nextLink}>{nextMonth.rus} →</A>}
      </MonthFilter>
    </FilterBar>
  )
}

export default MobileNavReleaseFilterBar
