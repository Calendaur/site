import React, { useMemo, memo } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { compareAsc } from 'date-fns'
import { expect } from 'shared/api'
import { useUser } from 'features/user/use-user'
import { routes } from 'shared/constants'
import Button from './Button'

const Btn = styled(Button)`
  height: 30px;
  font-size: 14px;
  border-radius: 24px;

  img {
    width: 16px;
    height: 16px;
  }
`

function ExpectButton({ className, release }) {
  const { user, mutateUser } = useUser()
  const { push } = useRouter()
  const expectation = useMemo(
    () =>
      user &&
      new Set(
        Object.values(user.extensions)
          .flat()
          .map((r: any) => r.id),
      ),
    [user],
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
      <Btn className={className} primary onClick={onClick}>
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
              🔥
            </span>
          </>
        )}
      </Btn>
    )
  }

  return (
    <Btn className={className} primary onClick={onClick}>
      {isExpected ? (
        <img width="16" height="16" src="/icons/bookmark-filled.svg" alt="" />
      ) : (
        <img width="16" height="16" src="/icons/bookmark-outline.svg" alt="" />
      )}
    </Btn>
  )
}

export default memo(ExpectButton)
