import Link from 'next/link'
import cx from 'classnames'
import { routes } from 'shared/constants'
import Text from '../Text'

import styles from './styles.module.css'

const currentYear = new Date().getFullYear()

function Footer() {
  return (
    <footer className={styles.Footer}>
      <div className={styles.Links}>
        <Link href={routes.PRIVACY_POLICY}>
          <a className={styles.Link}>О персональных данных</a>
        </Link>
        <Link href={routes.ARCHIVE}>
          <a className={styles.Link}>Архив релизов</a>
        </Link>
        <Link href={routes.BLOG}>
          <a className={styles.Link}>Блог</a>
        </Link>
        <a className={styles.Link} href="mailto:support@released.at">
          support@released.at
        </a>
      </div>
      <div className={styles.Socials}>
        <Text>Мы в соцсетях:</Text>
        <div>
          <a
            className={cx(styles.Link, styles.LinkButton, styles.Tg)}
            href="https://t.me/released_at"
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={() => {
              ;(window as any).plausible('Click on social network link')
            }}
          >
            Телеграм
          </a>
          <a
            className={cx(styles.Link, styles.LinkButton, styles.Zen)}
            href="https://zen.yandex.ru/id/5f702b5d243429689bde2890"
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={() => {
              ;(window as any).plausible('Click on social network link')
            }}
          >
            Дзен
          </a>
        </div>
      </div>
      <div className={styles.Copyright}>
        <Text>Released, {currentYear}</Text>
      </div>
    </footer>
  )
}

export default Footer
