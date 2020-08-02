import React from 'react'
import { useRouter } from 'next/router'
import { useUser } from 'features/user/use-user'
import { routes } from 'shared/constants'
import A from './A'
import Button from './Button'

export function DesktopAuthButtons() {
  const { push } = useRouter()
  const { user, isLoading, isError } = useUser()

  if (isLoading) {
    return null
  }

  if (isError || !user) {
    return (
      <>
        <A href={routes.SIGN_IN}>Вход</A>
        <Button
          primary
          onClick={() => {
            push(routes.SIGN_UP)
          }}
        >
          Регистрация
        </Button>
      </>
    )
  }

  return (
    <Button
      primary
      onClick={() => {
        push(routes.ME)
      }}
    >
      {user.email.split('@')[0]}
    </Button>
  )
}

export function MobileAuthButtons() {
  const { user, isLoading, isError } = useUser()

  if (isLoading) return null

  if (isError || !user) {
    return (
      <>
        <A href={routes.SIGN_IN}>Вход</A>
        <A href={routes.SIGN_UP} className="gradient">
          Регистрация
        </A>
      </>
    )
  }

  return (
    <A href={routes.ME} className="gradient">
      {user.email.split('@')[0]}
    </A>
  )
}
