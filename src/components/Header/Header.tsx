import React from 'react'
import dynamic from 'next/dynamic'
import Logo from './Logo'
import CalendarNav from './CalendarNav'
import AuthButtons from './AuthButtons'

import styles from './styles.module.css'

const Nav = dynamic(() => import('./Nav'), { ssr: true })

function Header() {
  return (
    <header className={styles.header} aria-label="header">
      <div className={styles.logoAndNav}>
        <Logo />
        <CalendarNav />
      </div>
      <div style={{ display: 'flex' }}>
        <Nav />
        <AuthButtons />
      </div>
    </header>
  )
}

export default Header
