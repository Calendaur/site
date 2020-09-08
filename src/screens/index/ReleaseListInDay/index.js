import React from 'react'
import styled from '@emotion/styled'
import cx from 'classnames'
import ReleaseCard from '../ReleaseCard'

const Releases = styled.div`
  display: flex;
  height: 100%;

  &.hasSomeReleases {
    position: relative;
    display: grid;
    grid-auto-rows: 140px;
    grid-gap: 8px;
    background: #0a0a0a;
    border-radius: 24px;
    box-shadow: 6px 6px 12px #070707, -6px -6px 12px #0e0e0e;

    @media (min-width: 2200px) {
      grid-auto-rows: 220px;
    }

    & > * {
      --br: 20px;

      overflow: hidden;
      border-radius: 0;
      mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);

      &:first-of-type {
        border-top-left-radius: var(--br);
        border-top-right-radius: var(--br);
      }

      &:last-of-type {
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
