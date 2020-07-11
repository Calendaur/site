import React from 'react'
import Link from 'next/link'
import cx from 'classnames'

import styles from './Footer.module.css'

function Footer({ className }) {
  return (
    <footer aria-label="header" className={cx(styles.Footer, className)}>
      <div className={styles.About}>
        <Link href="/">
          <a className={styles.MobileLogo}>
            <img src="/images/logo.png" alt="" />
          </a>
        </Link>{' '}
        Released, {new Date().getFullYear()}
      </div>
      <div>
        <a className="underline" href="mailto:support@released.at">
          Обратная связь
        </a>
      </div>
    </footer>
  )
}

export default Footer
