import { useRouter } from 'next/router'
import { routes } from 'shared/constants'
import Button from '../Button'

import styles from './styles.module.css'

function AuthButtons() {
  const { push } = useRouter()

  return (
    <div className={styles.AuthButtons}>
      <Button
        onClick={() => {
          push(routes.SIGN_IN)
        }}
        size="small"
        secondary
      >
        Вход
      </Button>
      <Button
        className={styles.SignIn}
        onClick={() => {
          push(routes.SIGN_UP)
        }}
        size="small"
        primary
      >
        Регистрация
      </Button>
    </div>
  )
}

export default AuthButtons
