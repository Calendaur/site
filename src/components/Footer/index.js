import React from 'react'
import Link from 'next/link'
import cx from 'classnames'

import styles from './styles.module.css'

const year = new Date().getFullYear()

function Footer({ className }) {
  return (
    <footer className={cx(styles.Footer, className)} aria-label="footer">
      <div className={styles.copyright}>
        <Link href="/">
          <a aria-label="released.at">
            <img
              className="lazyload"
              data-src="/images/logo.png"
              src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
              alt="released.at"
            />
          </a>
        </Link>{' '}
        released.at, {year}
      </div>
      <div>
        <a href="mailto:support@released.at">Обратная связь</a>
      </div>
    </footer>
  )
}

export default Footer
