import React, { useMemo, memo, useState } from 'react'
import { useRouter } from 'next/router'
import { useAmp } from 'next/amp'
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
`

function ExpectButton({ className, release }) {
  const isAmp = useAmp()
  const [loading, setLoading] = useState(false)
  const { user, mutateUser } = useUser()
  const { push } = useRouter()
  const expectation = useMemo(
    () =>
      user &&
      new Set(
        Object.values(user.expected)
          .flat()
          .map(r => r.id),
      ),
    [user],
  )
  const isExpected = user ? expectation.has(release.id) : false

  const onClick = async e => {
    try {
      setLoading(true)

      e.preventDefault()
      e.stopPropagation()

      if (isExpected) {
        await expect(release.release_id)
        await mutateUser()
        setLoading(false)
      } else {
        if (!user) {
          push(routes.SIGN_UP)
          return
        }
        await expect(release.release_id)
        await mutateUser()
        setLoading(false)
      }
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }
  const isActual = compareAsc(new Date(), new Date(release.released)) <= 0

  const style = loading || isExpected ? { opacity: 1 } : {}

  if (isAmp) return null

  if (isActual) {
    return (
      <Btn
        className={className}
        primary
        onClick={onClick}
        loading={loading}
        style={style}
      >
        {isExpected ? (
          <img width="18" height="18" src="/icons/fire-filled.svg" alt="" />
        ) : (
          <>
            Жду&nbsp;
            <img width="18" height="18" src="/icons/fire-outline.svg" alt="" />
          </>
        )}
      </Btn>
    )
  }

  return (
    <Btn
      className={className}
      primary
      onClick={onClick}
      loading={loading}
      style={style}
    >
      {isExpected ? (
        <img width="16" height="16" src="/icons/bookmark-filled.svg" alt="" />
      ) : (
        <img width="16" height="16" src="/icons/bookmark-outline.svg" alt="" />
      )}
    </Btn>
  )
}

export default memo(ExpectButton)
