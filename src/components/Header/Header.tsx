import React from 'react'
import dynamic from 'next/dynamic'
import Logo from './Logo'
import styles from './styles.module.scss'

const Nav = dynamic(() => import('./Nav'), { ssr: false })

function Header() {
  return (
    <header className={styles.header} aria-label="header">
      <Logo />
      <Nav />
    </header>
  )
}

export default Header
