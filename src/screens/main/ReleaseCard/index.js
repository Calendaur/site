import React from 'react'
import styled from '@emotion/styled'
import { format } from 'date-fns'
import ru from 'date-fns/locale/ru'
import { A, ExpectButton } from 'components'
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

  & > .aspectRatio {
    position: relative;
    width: 100%;
    height: 100%;

    &::after {
      content: '';
      display: block;
      height: 0;
      width: 100%;
      padding-bottom: 42.86%;
    }

    & > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      object-position: center;
    }
  }

  @media (min-width: 768px) {
    &:hover {
      transform: translate(0, -4px);

      & > button,
      .released-date {
        transform: translate(0, 4px);
        opacity: 1;
      }
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

const Expect = styled(ExpectButton)`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 999;
  opacity: 1;

  @media (min-width: 1200px) {
    opacity: 0;
  }
`

const Released = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  display: inline-flex;
  padding: 0 10px;
  font-size: 14px;
  font-weight: 600;
  line-height: 30px;
  border-radius: 24px;
  background-color: var(--white-color);
  color: var(--black-color);
  z-index: 1;
  white-space: nowrap;
  transition: var(--animation-time);
`

function ReleaseCard({ release, type, showDate = false }) {
  return (
    <Card href="/release/[id]" as={`/release/${release.release_id}`}>
      {showDate && (
        <Released className="released-date">
          {format(new Date(release.released), 'd MMM', { locale: ru })}
        </Released>
      )}
      <Expect release={release} />
      <div className="aspectRatio">
        <img
          data-src={release.cover}
          alt={release.title}
          className="lazyload"
          crossOrigin="anonymous"
          src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
        />
      </div>
      <Info release={release} type={type} />
    </Card>
  )
}

export default ReleaseCard
