import  { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import cx from 'classnames'
import { routes } from 'shared/constants'
import { useRedDot } from './useRedDot'

import styles from './styles.module.css'

interface Props {
  isVisible: boolean
}

function Navigation({ isVisible }: Props) {
  const { asPath } = useRouter()
  const { whatsNew } = useRedDot()

  useEffect(() => {
    document.body.style.overflow = isVisible ? 'hidden' : 'inherit'
  }, [isVisible])

  const isIndex = asPath === routes.HOME

  return (
    <nav
      className={cx(styles.Navigation, {
        [styles.isVisible]: isVisible,
      })}
    >
      {isIndex ? null : (
        <Link href={routes.HOME}>
          <a className={styles.Index}>На главную</a>
        </Link>
      )}
      <Link href={routes.BLOG}>
        <a>Блог</a>
      </Link>
      <Link href={routes.WHATS_NEW}>
        <a className={whatsNew ? styles.hasRedDot : ''}>
          <span>Что нового?</span>
        </a>
      </Link>
      <Link href={routes.TODAY}>
        <a className={styles.Today}>Сегодня</a>
      </Link>
    </nav>
  )
}

export default Navigation
