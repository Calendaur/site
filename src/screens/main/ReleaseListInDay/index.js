import React from 'react'
import styled from '@emotion/styled'
import cx from 'classnames'
import ReleaseCard from '../ReleaseCard'

const Releases = styled.div`
  display: flex;
  height: 100%;

  &.hasSomeReleases {
    display: grid;
    grid-auto-rows: minmax(140px, 1fr);
    grid-gap: 8px;

    @media (min-width: 2200px) {
      grid-auto-rows: minmax(220px, 1fr);
    }

    & > * {
      --br: 20px;

      border-radius: 0;
      overflow: hidden;
      mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);

      &:first-child {
        border-top-left-radius: var(--br);
        border-top-right-radius: var(--br);
      }

      &:last-child {
        border-bottom-right-radius: var(--br);
        border-bottom-left-radius: var(--br);
      }
    }
  }
`

function ReleaseListInDay({ releases, type }) {
  return (
    <Releases
      className={cx({
        hasSomeReleases: releases.length > 0,
      })}
    >
      {releases.map(release => {
        return <ReleaseCard key={release.id} type={type} release={release} />
      })}
    </Releases>
  )
}

export default ReleaseListInDay
