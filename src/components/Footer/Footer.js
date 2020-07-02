import React from 'react'
import cx from 'classnames'

import styles from './Footer.module.css'

function Footer({ className }) {
  return (
    <footer aria-label="header" className={cx(styles.Footer, className)}>
      Released, {new Date().getFullYear()}
    </footer>
  )
}

export default Footer
