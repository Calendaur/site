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
      border-radius: 0;

      &:first-child {
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
      }

      &:last-child {
        border-bottom-right-radius: 20px;
        border-bottom-left-radius: 20px;
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
