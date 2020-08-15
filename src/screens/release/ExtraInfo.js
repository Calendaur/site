import React from 'react'
import styled from '@emotion/styled'
import { PlatformList } from 'components'

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--vertical-6);
`

const Label = styled.p`
  margin: 0;
  color: var(--primary-text);

  span {
    color: var(--secondary-text);
  }
`

const Platforms = styled(PlatformList)`
  margin: 0;
`

function ExtraInfo({ type, director, platforms, season }) {
  return (
    <MetaInfo>
      {type === 'films' && (
        <Label>
          <span>Режиссер:</span> {director}
        </Label>
      )}
      {type === 'games' && (
        <>
          <Label>
            <span>Платформы:</span>
          </Label>
          <Platforms platforms={platforms} />
        </>
      )}
      {type === 'series' && (
        <Label>
          <span>Сезон:</span> {season}
        </Label>
      )}
    </MetaInfo>
  )
}

export default ExtraInfo
