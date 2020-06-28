import React from 'react'
import Link from 'next/link'
import cx from 'classnames'

import styles from './styles.module.css'

function Footer({ className }) {
  return <footer className={cx(styles.Footer, className)}></footer>
}

export default Footer
