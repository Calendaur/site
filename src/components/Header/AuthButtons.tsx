
import { useRouter } from 'next/router'
import { useUser } from 'features/user/use-user'
import { routes } from 'shared/constants'
import Button from '../Button'

import styles from './styles.module.css'

function AuthButtons() {
  const { push } = useRouter()
  const { user, isLoading } = useUser()

  if (isLoading) {
    return <Button primary loading />
  }

  if (user) {
    return (
      <button
        className={styles.userAvatar}
        onClick={() => {
          push(routes.ME)
        }}
      >
        {user.current_user.email.split('@')[0].charAt(0)}
      </button>
    )
  }

  return (
    <>
      <Button
        outline
        className={styles.signIn}
        onClick={() => {
          push(routes.SIGN_IN)
        }}
      >
        Вход
      </Button>
      <Button
        primary
        className={styles.signUp}
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
