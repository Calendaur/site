import React from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { compareAsc } from 'date-fns'
import { expect } from 'core/api'
import { useUser } from 'features/user/use-user'
import { routes } from 'shared/constants'
import Button from './Button'

function ExpectButton({ className, release }) {
  const { user, mutateUser } = useUser()
  const { push } = useRouter()
  const expectation =
    user &&
    new Set(
      Object.values(user.extensions)
        .flat()
        .map(r => r.id),
    )
  const isExpected = user ? expectation.has(release.id) : false

  const onClick = async e => {
    e.preventDefault()
    e.stopPropagation()

    if (isExpected) {
      await expect(release.release_id)
      mutateUser()
    } else {
      if (!user) {
        push(routes.SIGN_UP)
        return
      }
      await expect(release.release_id)
      mutateUser()
    }
  }
  const isActual = compareAsc(new Date(), new Date(release.released)) <= 0

  if (isActual) {
    return (
      <Button className={className} primary={!isExpected} onClick={onClick}>
        {isExpected ? (
          <>
            Не жду&nbsp;
            <span role="img" aria-label="dissapointed">
              😞
            </span>
          </>
        ) : (
          <>
            Жду&nbsp;
            <span role="img" aria-label="star">
              🌟
            </span>
          </>
        )}
      </Button>
    )
  }

  return (
    <Button className={className} primary={!isExpected} onClick={onClick}>
      {isExpected ? (
        <>
          Удалить&nbsp;
          <span role="img" aria-label="cross">
            ❌
          </span>
        </>
      ) : (
        <>
          В закладки&nbsp;
          <span role="img" aria-label="bookmark">
            🔖
          </span>
        </>
      )}
    </Button>
  )
}

const StyledExpectButton = styled(ExpectButton)`
  height: 30px;
  font-size: 14px;
  line-height: 30px;
  border-radius: 24px;
`

export default StyledExpectButton
