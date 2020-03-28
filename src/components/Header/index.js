import React, { useEffect, useRef, useState, useMemo } from 'react'
import Link from 'next/link'
import { useDidUpdate, useWindowSize } from '../../hooks'

import styles from './styles.module.css'

function Header() {
  const { width } = useWindowSize()

  const ref = useRef(null)
  const isMobileVersion = width <= 768
  const [height, setHeight] = useState(0)
  const [visible, setVisible] = useState(true)

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

  useEffect(() => {
    let prevScrollPos = window.pageYOffset

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      if (isMobileVersion) {
        setVisible(Math.abs(prevScrollPos) > currentScrollPos)
      }

      prevScrollPos = currentScrollPos
    }

    window.addEventListener('scroll', handleScroll, {
      capture: true,
      passive: true,
    })

    return () =>
      window.removeEventListener('scroll', handleScroll, {
        capture: true,
        passive: true,
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <header ref={ref} className={styles.Header} style={animationStyle}>
      <div className={styles.Logo}>
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
        <Link href="/about">
          <a>О нас</a>
        </Link>
        <button className={styles.AuthButton} type="button">
          Войти <img src="/icons/google.svg" alt="" />
        </button>
      </div>
    </header>
  )
}

export default Header
