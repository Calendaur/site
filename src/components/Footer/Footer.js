import React from 'react'
import Link from 'next/link'
import cx from 'classnames'

import styles from './Footer.module.css'

function Footer({ className }) {
  return (
    <footer aria-label="header" className={cx(styles.Footer, className)}>
      <div className={styles.About}>
        <Link href="/">
          <a className={styles.MobileLogo} aria-label="released.at">
            <img
              className="lazyload"
              data-src="/images/logo.png"
              alt="released.at"
            />
          </a>
        </Link>{' '}
        released.at, {new Date().getFullYear()}
      </div>
      <div>
        <a href="mailto:support@released.at">Обратная связь</a>
      </div>
    </footer>
  )
}

export default Footer
