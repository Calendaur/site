import React from 'react'
import { useAmp } from 'next/amp'
import styled from '@emotion/styled'

function icon(platform, isAmp) {
  switch (platform) {
    case 'pc':
      return isAmp ? (
        <amp-img width="18" height="18" src="/icons/windows.svg" />
      ) : (
        <img width="18" height="18" src="/icons/windows.svg" alt="PC" />
      )
    case 'ps_4':
      return isAmp ? (
        <amp-img width="18" height="18" src="/icons/playstation.svg" />
      ) : (
        <img
          width="18"
          height="18"
          src="/icons/playstation.svg"
          alt="PlayStation 4"
        />
      )
    case 'xbox_one':
      return isAmp ? (
        <amp-img width="18" height="18" src="/icons/xbox.svg" />
      ) : (
        <img width="18" height="18" src="/icons/xbox.svg" alt="Xbox One" />
      )
    case 'nintendo_switch':
      return isAmp ? (
        <amp-img width="18" height="18" src="/icons/nintendo-switch.svg" />
      ) : (
        <img
          width="18"
          height="18"
          src="/icons/nintendo-switch.svg"
          alt="Nintendo Switch"
        />
      )
  }
}

const StyledPlatformList = styled.ul`
  --gap: 8px;

  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: calc(var(--gap) / 2 * (-1));
  list-style-type: none;

  li {
    --size: 18px;

    display: flex;
    width: var(--size);
    min-width: var(--size);
    height: var(--size);
    min-height: var(--size);
    margin: calc(var(--gap) / 2);
  }
`

function PlatformList({ platforms, className }) {
  const isAmp = useAmp()

  return (
    <StyledPlatformList className={className}>
      {platforms.map(platform => (
        <li key={platform}>{icon(platform, isAmp)}</li>
      ))}
    </StyledPlatformList>
  )
}

export default PlatformList
