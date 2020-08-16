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
    font-size: 0.9rem;
    font-weight: normal;
    line-height: 1.2;
    text-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);

    &:first-child {
      font-weight: 600;
    }

    &:last-child {
      font-size: 0.75rem;
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

function Info({ type, release }) {
  function renderChildren() {
    switch (type) {
      case 'films':
        return <p className="extra">Реж. {release.director}</p>
      case 'games':
        return (
          <PlatformList className="platforms" platforms={release.platforms} />
        )
      case 'series':
        return <p className="extra">{release.season} сезон</p>
      default:
        return null
    }
  }

  return (
    <Wrapper>
      <p>{release.title}</p>
      {renderChildren()}
    </Wrapper>
  )
}

export default Info
