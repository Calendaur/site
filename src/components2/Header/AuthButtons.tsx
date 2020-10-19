import React from 'react'
import { useRouter } from 'next/router'
import { styled } from 'stitches'
import { routes } from 'shared/constants'
import Button from '../Button'

const StyledAuthButtons = styled('div', {
  display: 'flex',
})

function AuthButtons() {
  const { push } = useRouter()

  return (
    <StyledAuthButtons>
      <Button
        onClick={() => {
          push(routes.SIGN_IN)
        }}
        size="small"
        appearance="secondary"
      >
        Вход
      </Button>
      <Button
        css={{
          display: 'none',

          sm: {
            display: 'inline-flex',
            marginLeft: '$sm',
          },
        }}
        onClick={() => {
          push(routes.SIGN_UP)
        }}
        size="small"
        appearance="primary"
      >
        Регистрация
      </Button>
    </StyledAuthButtons>
  )
}

export default AuthButtons
