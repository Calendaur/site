import React from 'react'
import dynamic from 'next/dynamic'
import Logo from './Logo'
import StyledHeader from './styles'

const Nav = dynamic(() => import('./Nav'), { ssr: false })

function Header() {
  return (
    <StyledHeader aria-label="header">
      <Logo />
      <Nav />
    </StyledHeader>
  )
}

export default Header
