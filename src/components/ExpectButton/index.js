import React from 'react'
import { useRouter } from 'next/router'
import { compareAsc } from 'date-fns'
import cx from 'classnames'
import { expect } from 'core/api'
import { useUser } from 'features/user/use-user'
import { routes } from 'shared/constants'
import Button from '../Button'

import styles from './styles.module.css'

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
      <Button
        primary
        className={cx(className, styles.Expect)}
        onClick={onClick}
      >
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
      </Button>
    )
  }

  return (
    <Button primary className={cx(styles.Expect, className)} onClick={onClick}>
      {isExpected ? (
        <img width="16" height="16" src="/icons/bookmark-filled.svg" alt="" />
      ) : (
        <img width="16" height="16" src="/icons/bookmark-outline.svg" alt="" />
      )}
    </Button>
  )
}

export default ExpectButton
