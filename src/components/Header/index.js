import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import cx from 'classnames'
import * as routes from 'core/routes'
import MobileNavReleaseFilterBar from './MobileNavReleaseFilterBar'
import { DesktopAuthButtons, MobileAuthButtons } from './AuthButtons'
import Logo from '../Logo'
import A from '../A'

import styles from './styles.module.css'

function Header({ className }) {
  const [visibleMobileNav, setVisibleMobileNav] = useState(false)
  const { events } = useRouter()

  function closeMobileNav() {
    setVisibleMobileNav(false)
  }

  useEffect(() => {
    if (visibleMobileNav) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'inherit'
    }
  }, [visibleMobileNav])

  useEffect(() => {
    events.on('routeChangeComplete', closeMobileNav)

    return () => {
      events.off('routeChangeComplete', closeMobileNav)
    }
  }, [events])

  return (
    <>
      <header aria-label="header" className={cx(styles.Desktop, className)}>
        <Logo />
        <nav>
          <A href={routes.WHATS_NEW}>Новости проекта</A>
          <A href={routes.ARCHIVE}>Вышедшее</A>
          <DesktopAuthButtons />
        </nav>
      </header>
      <header aria-label="header" className={cx(styles.Mobile, className)}>
        <div className={styles.LogoWrapper}>
          <Logo />
        </div>
        <div className={styles.FloatButton}>
          <button
            onClick={() => {
              setVisibleMobileNav(!visibleMobileNav)
            }}
          >
            <img
              width="24"
              height="24"
              src={visibleMobileNav ? '/icons/close.svg' : '/icons/menu.svg'}
              alt=""
            />
          </button>
        </div>
        {visibleMobileNav && (
          <nav>
            <Logo />
            <div className={styles.NavLinks}>
              <A href={routes.HOME}>На главную</A>
              <A href={routes.ARCHIVE}>Вышедшие релизы</A>
              <A href={routes.WHATS_NEW}>Новости проекта</A>
            </div>
            <div className={styles.AuthLinks}>
              <MobileAuthButtons />
            </div>
            <MobileNavReleaseFilterBar />
          </nav>
        )}
      </header>
    </>
  )
}

export default Header
