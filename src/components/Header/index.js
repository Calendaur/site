import React, { useRef, useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDidUpdate, useHideOnScroll } from '../../hooks'
import Button from '../Button'

import styles from './styles.module.css'

function Header({ hasBack }) {
  const { asPath, back, push } = useRouter()

  const [visible, setVisible] = useHideOnScroll()

  const ref = useRef(null)
  const [height, setHeight] = useState(0)

  const animationStyle = useMemo(
    () => ({
      transform: visible ? `translateY(0px)` : `translateY(${-height}px)`,
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
              back()
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
        <Link href="/whats-new">
          <a>Что нового?</a>
        </Link>
        <Link href="/faq">
          <a>FAQ</a>
        </Link>
        {!asPath.includes('subscribe') && (
          <Button
            className={styles.Subscribe}
            isPrimary
            onClick={() => {
              push('/subscribe')
            }}
          >
            Подписаться
          </Button>
        )}
      </div>
    </header>
  )
}

export default Header
