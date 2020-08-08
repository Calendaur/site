import React from 'react'
import styled from '@emotion/styled'
import { PlatformList } from 'components'

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--vertical-6);
`

const Label = styled.p`
  margin-right: var(--horizontal-4);
  color: var(--primary-text);
`

const Platforms = styled(PlatformList)`
  margin: 0;
`

function ExtraInfo({ type, director, platforms, season }) {
  return (
    <MetaInfo>
      {type === 'films' && <Label>Режиссер: {director}</Label>}
      {type === 'games' && (
        <>
          <Label>Платформы:</Label>
          <Platforms platforms={platforms} />
        </>
      )}
      {type === 'series' && <Label>Сезон: {season}</Label>}
    </MetaInfo>
  )
}

export default ExtraInfo
