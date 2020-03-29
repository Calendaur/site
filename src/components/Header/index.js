import React, { useRef, useState, useMemo } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { useDidUpdate, useHideOnScroll } from '../../hooks'
import useGoogleAuth from '../../core/auth/useGoogleAuth'
import useAuthorization from '../../core/auth/useAuthorization'

import styles from './styles.module.css'

function Header({ hasBack }) {
  const [login, logout] = useGoogleAuth()
  const authUser = useAuthorization()
  const [visible, setVisible] = useHideOnScroll()

  const ref = useRef(null)
  const [height, setHeight] = useState(0)

  const animationStyle = useMemo(
    () => ({
      transform: visible ? `translateY(0px)` : `translateY(${-height}px)`,
      background: visible ? 'rgba(15, 32, 39, 0.89)' : 'rgba(15, 32, 39, 0.4)',
    }),
    [height, visible],
  )

  useDidUpdate(() => {
    setHeight(ref.current.clientHeight)
    setVisible(true)
  }, [ref.current?.clientHeight, setHeight, setVisible])

  return (
    <header ref={ref} className={styles.Header} style={animationStyle}>
      <div className={styles.Logo}>
        {hasBack && (
          <button
            className={styles.Back}
            onClick={() => {
              Router.back()
            }}
          >
            <img src="/icons/back.svg" alt="" />
          </button>
        )}
        <Link href="/">
          <a>
            <img src="/images/logo.png" alt="calendaur.com" />
          </a>
        </Link>
      </div>
      <div className={styles.Right}>
        <Link href="/faq">
          <a>FAQ</a>
        </Link>
        <button
          className={styles.AuthButton}
          type="button"
          onClick={authUser ? logout : login}
        >
          {authUser ? (
            'Выйти'
          ) : (
            <>
              Войти <img src="/icons/google.svg" alt="" />
            </>
          )}
        </button>
      </div>
    </header>
  )
}

export default Header
