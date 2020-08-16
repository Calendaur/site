import React from 'react'
import { useRouter } from 'next/router'
import { useUser } from 'features/user/use-user'
import { routes } from 'shared/constants'
import Button from './Button'

function MobileAuthButtons() {
  const { push } = useRouter()
  const { user, isLoading, isError } = useUser()

  if (isLoading) return null

  if (isError || !user) {
    return (
      <>
        <Button
          ghost
          onClick={() => {
            push(routes.SIGN_IN)
          }}
        >
          Вход
        </Button>
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
      fullWidth
      onClick={() => {
        push(routes.ME)
      }}
    >
      {user.current_user.email.split('@')[0]}
    </Button>
  )
}

export default MobileAuthButtons
