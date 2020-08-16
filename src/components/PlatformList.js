import React from 'react'
import styled from '@emotion/styled'

function icon(platform) {
  switch (platform) {
    case 'pc':
      return <img src="/icons/windows.svg" alt="PC" />
    case 'ps_4':
      return (
        <img
          width="18"
          height="18"
          src="/icons/playstation.svg"
          alt="PlayStation 4"
        />
      )
    case 'xbox_one':
      return <img src="/icons/xbox.svg" alt="Xbox One" />
    case 'nintendo_switch':
      return <img src="/icons/nintendo-switch.svg" alt="Nintendo Switch" />
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

    img {
      width: 100%;
      height: 100%;
    }
  }
`

function PlatformList({ platforms, className }) {
  return (
    <StyledPlatformList className={className}>
      {platforms.map(platform => (
        <li key={platform}>{icon(platform)}</li>
      ))}
    </StyledPlatformList>
  )
}

export default PlatformList
