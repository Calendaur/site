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
    font-weight: 500;
    line-height: 1.2;
    text-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
  }
`

const Extra = styled.p`
  margin-bottom: 0;
  font-size: 0.75rem;
  font-style: italic;
  font-weight: normal;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
`

const Platforms = styled(PlatformList)`
  padding: 0 8px;
`

function Info({ type, release }) {
  function renderChildren() {
    switch (type) {
      case 'films':
        return <Extra>Реж. {release.director}</Extra>
      case 'games':
        return <Platforms platforms={release.platforms} />
      case 'series':
        return <Extra>{release.season} сезон</Extra>
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
