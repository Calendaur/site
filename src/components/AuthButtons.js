import React from 'react'
import { useUser } from 'features/user/use-user'
import { routes } from 'shared/constants'
import Button from './Button'
import A from './A'

function AuthButtons({ push, desktop }) {
  const { user, isLoading } = useUser()
  const isLoggedIn = !!user

  if (isLoading) return null

  if (desktop) {
    return isLoggedIn ? (
      <Button
        primary
        onClick={() => {
          push(routes.ME)
        }}
        className="auth-button"
      >
        {user.current_user.email.split('@')[0]}
      </Button>
    ) : (
      <>
        <A href={routes.SIGN_IN} className="auth-button">
          Вход
        </A>
        <Button
          primary
          className="auth-button"
          onClick={() => {
            push(routes.SIGN_UP)
          }}
        >
          Регистрация
        </Button>
      </>
    )
  }

  return isLoggedIn ? (
    <Button
      primary
      fullWidth
      onClick={() => {
        push(routes.ME)
      }}
      className="auth-button"
    >
      {user.current_user.email.split('@')[0]}
    </Button>
  ) : (
    <>
      <Button
        ghost
        className="auth-button"
        onClick={() => {
          push(routes.SIGN_IN)
        }}
      >
        Вход
      </Button>
      <Button
        primary
        className="auth-button"
        onClick={() => {
          push(routes.SIGN_UP)
        }}
      >
        Регистрация
      </Button>
    </>
  )
}

export default AuthButtons
