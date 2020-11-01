import { useRouter } from 'next/router'
import Link from 'next/link'
import { routes } from 'shared/constants'

import styles from './styles.module.css'

function Logo() {
  const { asPath } = useRouter()
  const isIndex = asPath === '/'

  if (isIndex) {
    return (
      <p
        style={{ cursor: 'default', margin: 0 }}
        className={styles.Logo}
        data-text="released"
      >
        released
      </p>
    )
  }

  return (
    <Link href={routes.HOME}>
      <a className={styles.Logo} data-text="released">
        released
      </a>
    </Link>
  )
}

export default Logo
