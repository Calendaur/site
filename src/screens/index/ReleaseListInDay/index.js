import React, { useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import cx from 'classnames'
import { Button } from 'components'
import { range } from 'shared/utils'
import ReleaseCard from '../ReleaseCard'

function calcRows({ moreThan3, showAll, qty }, size, btnSize) {
  if (moreThan3) {
    return showAll
      ? `${range(0, qty - 1)
          .map(() => size)
          .join(' ')} ${btnSize}`
      : `${size} ${size} ${size} ${btnSize}`
  }

  return `minmax(${size}, 1fr)`
}

const Releases = styled.div`
  display: flex;
  height: 100%;

  &.hasSomeReleases {
    display: grid;
    grid-auto-rows: ${props => calcRows(props, '140px', '40px')};
    grid-gap: 8px;

    @media (min-width: 2200px) {
      grid-auto-rows: ${props => calcRows(props, '220px', '50px')};
    }

    & > *:not(.btn) {
      --br: 20px;

      overflow: hidden;
      border-radius: 0;
      mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);

      &:first-of-type {
        border-top-left-radius: var(--br);
        border-top-right-radius: var(--br);
      }

      ${props =>
        !props.moreThan3 &&
        css`
          &:last-of-type {
            border-bottom-right-radius: var(--br);
            border-bottom-left-radius: var(--br);
          }
        `}
    }

    .btn {
      border-radius: 20px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }
`

function ReleaseListInDay({ releases, type }) {
  const [showAll, setShowAll] = useState(false)

  const moreThan3 = releases.length > 3

  return (
    <Releases
      className={cx({
        hasSomeReleases: releases.length > 0,
      })}
      moreThan3={moreThan3}
      showAll={showAll}
      qty={releases.length}
    >
      {moreThan3 ? (
        <>
          {releases.slice(0, showAll ? releases.length : 3).map(release => {
            return (
              <ReleaseCard key={release.id} type={type} release={release} />
            )
          })}
          <Button
            onClick={() => {
              setShowAll(!showAll)
            }}
            className="btn"
          >
            {showAll ? 'Свернуть' : `+ ${releases.length - 3}`}
          </Button>
        </>
      ) : (
        releases.map(release => {
          return <ReleaseCard key={release.id} type={type} release={release} />
        })
      )}
    </Releases>
  )
}

export default ReleaseListInDay
