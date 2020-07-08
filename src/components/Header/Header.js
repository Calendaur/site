import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from '../Button'

import styles from './Header.module.css'

function Header({ hasBack }) {
  const { back, push } = useRouter()

  return (
    <header className={styles.Header} aria-label="header">
      <div className={styles.Logo}>
        {hasBack && (
          <button
            className={styles.Back}
            onClick={() => {
              back()
            }}
          >
            <img src="/icons/back.svg" alt="" />
          </button>
        )}
        <Link href="/">
          <a className={styles.DesktopLogo} data-text="released">
            released
          </a>
        </Link>
        <Link href="/">
          <a className={styles.MobileLogo}>
            <img src="/images/logo.png" alt="" />
          </a>
        </Link>
      </div>
      <div className={styles.Right}>
        <Link href="/whats-new">
          <a>Что нового?</a>
        </Link>
        <Button
          className={styles.Subscribe}
          isPrimary
          onClick={() => {
            push('/subscribe')
          }}
        >
          Подписаться
        </Button>
      </div>
    </header>
  )
}

export default Header
