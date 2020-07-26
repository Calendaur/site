import React from 'react'
import styled from '@emotion/styled'
import { A } from 'components'
import Info from './Info'

export function getPlatformIcon(platform) {
  switch (platform) {
    case 'pc':
      return <img src="/icons/windows.svg" alt="" />
    case 'ps_4':
      return <img src="/icons/playstation.svg" alt="" />
    case 'xbox_one':
      return <img src="/icons/xbox.svg" alt="" />
    case 'nintendo_switch':
      return <img src="/icons/nintendo-switch.svg" alt="" />
    default:
      break
  }
}

const Card = styled(A)`
  position: relative;
  display: flex;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  border-radius: 14px;
  will-change: transform, opacity;
  transition: transform 0.3s;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  @media (min-width: 768px) {
    &:hover {
      transform: translate(0, -4px);
    }

    &:active {
      transform: translate(0, 0);
    }
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.9) 100%
    );
  }
`

function ReleaseCard({ release, type }) {
  return (
    <Card href="/release/[id]" as={`/release/${release.release_id}`}>
      <img
        data-sizes="auto"
        data-src={release.cover}
        alt={release.title}
        className="lazyload"
        src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
      />
      <Info release={release} type={type} />
    </Card>
  )
}

export default ReleaseCard
