import React from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { A, Button } from 'components'
import { expect } from 'core/api'
import { useUser } from 'features/user/use-user'
import { routes } from 'shared/constants'
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

      & > button {
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

const Expect = styled(Button)`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 999;
  height: 30px;
  font-size: 14px;
  border-radius: 24px;
  opacity: 1;

  @media (min-width: 1200px) {
    opacity: 0;
  }
`

function ReleaseCard({ release, type }) {
  const { push } = useRouter()
  const { user, mutateUser } = useUser()
  const expectation =
    user &&
    new Set(
      Object.values(user.extensions)
        .flat()
        .map(r => r.id),
    )
  const isExpected = user ? expectation.has(release.id) : false

  return (
    <Card href="/release/[id]" as={`/release/${release.release_id}`}>
      {isExpected ? (
        <Expect
          onClick={async e => {
            e.preventDefault()
            e.stopPropagation()

            await expect(release.release_id)
            mutateUser()
          }}
        >
          Не жду&nbsp;
          <span role="img" aria-label="thumbs-down">
            👎
          </span>
        </Expect>
      ) : (
        <Expect
          primary
          onClick={async e => {
            e.preventDefault()
            e.stopPropagation()

            if (!user) {
              push(routes.SIGN_UP)
              return
            }

            await expect(release.release_id)
            mutateUser()
          }}
        >
          Жду&nbsp;
          <span role="img" aria-label="star">
            🌟
          </span>
        </Expect>
      )}
      <div className="aspectRatio">
        <img
          data-src={release.cover}
          alt={release.title}
          className="lazyload"
          src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
        />
      </div>
      <Info release={release} type={type} />
    </Card>
  )
}

export default ReleaseCard
