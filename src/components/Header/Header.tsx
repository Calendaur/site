import React from 'react'
import Logo from './Logo'
import Nav from './Nav'
import StyledHeader from './styles'

function Header() {
  return (
    <StyledHeader aria-label="header">
      <Logo />
      <Nav />
    </StyledHeader>
  )
}

export default Header
