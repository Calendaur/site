import { routes } from 'shared/constants'
import A from '../A'
import styles from './styles.module.css'

function Logo() {
  return (
    <A
      href={routes.HOME}
      aria-label="released.at"
      data-text="released"
      className={styles.logo}
    >
      released
    </A>
  )
}

export default Logo
