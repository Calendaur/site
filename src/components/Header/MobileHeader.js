import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './Header.module.css'

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

function MobileHeader({ user }) {
  const ref = useRef()
  const [visible, setVisible] = useState(false)
  const { push } = useRouter()

  useOnClickOutside(ref, () => {
    setVisible(false)
  })

  return (
    <header className={styles.MobileHeader}>
      <div>
        <button
          ref={ref}
          className={styles.Menu}
          type="button"
          onClick={() => {
            setVisible(!visible)
          }}
        >
          <img src="/icons/menu.svg" alt="" />
          {visible && (
            <div className={styles.MenuContent}>
              <div className={styles.Nav}>
                <Link href="/whats-new">
                  <a>Что нового?</a>
                </Link>
                <Link href="/archive">
                  <a>Вышедшее</a>
                </Link>
              </div>
            </div>
          )}
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
        {user ? (
          <button
            className={styles.Acc}
            type="button"
            onClick={() => {
              push('/me')
            }}
          >
            <div className={styles.Avatar}>
              <span>{user.email.slice(0, 1)}</span>
            </div>
          </button>
        ) : (
          <button
            className={styles.ToAuth}
            type="button"
            onClick={() => {
              push('/auth')
            }}
          >
            <img src="/icons/user.svg" alt="" />
          </button>
        )}
      </div>
    </header>
  )
}

export default MobileHeader
