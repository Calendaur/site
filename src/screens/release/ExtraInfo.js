import React from 'react'
import styled from '@emotion/styled'
import { PlatformList } from 'components'

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--vertical-6);

  .platforms {
    margin: 0;

    li {
      font-size: 12px;
    }
  }

  .label {
    margin: 0;
    color: var(--primary-text);

    span {
      color: var(--secondary-text);
    }
  }
`

function ExtraInfo({ type, director, platforms, season }) {
  return (
    <MetaInfo>
      {type === 'films' && (
        <p className="label">
          <span>Режиссер:</span> {director}
        </p>
      )}
      {type === 'games' && (
        <>
          <p className="label">
            <span>Платформы:</span>
          </p>
          <PlatformList className="platforms" platforms={platforms} />
        </>
      )}
      {type === 'series' && (
        <p className="label">
          <span>Сезон:</span> {season}
        </p>
      )}
    </MetaInfo>
  )
}

export default ExtraInfo
