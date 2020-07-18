import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from '../Button'

import styles from './Header.module.css'

function MobileHeader() {
  const { push } = useRouter()

  return (
    <header className={styles.MobileHeader}>
      <div>
        <button className={styles.Menu} type="button">
          <img src="/icons/menu.svg" alt="" />
        </button>
      </div>
      <div>
        <Link href="/">
          <a className={styles.Logotype} data-text="released">
            released
          </a>
        </Link>
      </div>
      <div>
        <button
          className={styles.ToAuth}
          type="button"
          onClick={() => {
            push('/auth')
          }}
        >
          <img src="/icons/user.svg" alt="" />
        </button>
      </div>
    </header>
  )
}

export default MobileHeader
