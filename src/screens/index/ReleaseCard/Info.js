import React from 'react'
import styled from '@emotion/styled'
import { PlatformList } from 'components'

const Wrapper = styled.div`
  position: absolute;
  bottom: 8px;
  z-index: 2;
  width: 100%;

  & > p {
    padding: 0 8px;
    margin: 0;
    margin-bottom: 4px;
    font-size: 1rem;
    font-weight: normal;
    line-height: 1.4;
    text-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);

    &:first-child {
      font-weight: 600;
    }

    &:last-child {
      font-size: 0.82rem;
    }
  }

  .extra {
    margin-bottom: 0;
    font-size: 0.75rem;
    font-weight: normal;
    text-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
  }

  .platforms {
    padding: 0 8px;
  }
`

function Info({ type, release, showType }) {
  return (
    <Wrapper>
      <p>{release.title}</p>
      {type.includes('film') && (
        <p className="extra">Реж. {release.director}</p>
      )}
      {type.includes('game') && (
        <PlatformList className="platforms" platforms={release.platforms} />
      )}
      {type === 'series' && <p className="extra">{release.season} сезон</p>}
    </Wrapper>
  )
}

export default Info
