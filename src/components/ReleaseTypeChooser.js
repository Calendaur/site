import React from 'react'
import styled from '@emotion/styled'
import cx from 'classnames'
import { A } from 'components'

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

function ReleaseTypeChooser({ type, month, year, className }) {
  return (
    <ul className={className}>
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
    </ul>
  )
}

const StyledReleaseTypeChooser = styled(ReleaseTypeChooser)`
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;

  & > li {
    margin-right: var(--horizontal-4);

    & > * {
      position: relative;
      font-size: 1.4rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      opacity: 0.4;

      @media (min-width: 768px) {
        font-size: 2.4rem;
      }

      &.active {
        opacity: 1;
      }

      &:hover {
        opacity: 1;
      }
    }
  }
`

export default StyledReleaseTypeChooser
