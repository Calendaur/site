import React from 'react'
import Link from 'next/link'
import cx from 'classnames'

import styles from './styles.module.css'

function Footer({ className }) {
  return (
    <footer className={cx(styles.Footer, className)}>
      <div className={styles.Projects}>
        <a
          href="https://vk.com/deaddinos"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/dinos.png" alt="" />
        </a>
        <span>✕</span>
        <Link href="/">
          <a>
            <img src="/images/logo.png" alt="" />
          </a>
        </Link>
      </div>
      <ul className={styles.Socials}>
        <li>
          <a
            href="mailto:deaddinocalendar@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/icons/mail.svg" alt="" />
          </a>
        </li>
        <li>
          <a
            href="https://teleg.run/deaddinos"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/icons/telegram.svg" alt="" />
          </a>
        </li>
        <li>
          <a
            href="https://vk.com/deaddinos"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/icons/vk.svg" alt="" />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/calensaur/site/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/icons/github.svg" alt="" />
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
