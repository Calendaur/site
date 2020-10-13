import React from 'react'
import dynamic from 'next/dynamic'
import Logo from './Logo'
import styles from './styles.module.css'

const Nav = dynamic(() => import('./Nav'), { ssr: true })

function Header() {
  return (
    <header className={styles.header} aria-label="header">
      <Logo />
      <Nav />
    </header>
  )
}

export default Header
