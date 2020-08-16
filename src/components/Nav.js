import React from 'react'
import { useWindowWidth } from 'shared/hooks'
import { routes } from 'shared/constants'
import A from './A'
import Logo from './Logo'
import AuthButtons from './AuthButtons'
import MobileNavReleaseFilterBar from './MobileNavReleaseFilterBar'

function Nav({ push, isVisible }) {
  const width = useWindowWidth()

  if (width >= 768) {
    return (
      <nav>
        <A href={routes.WHATS_NEW}>Новости проекта</A>
        <A href={routes.ARCHIVE}>Вышедшее</A>
        <AuthButtons push={push} />
      </nav>
    )
  }

  return isVisible ? (
    <nav>
      <Logo />
      <div className="nav-links">
        <A href={routes.HOME}>На главную</A>
        <A href={routes.ARCHIVE}>Вышедшие релизы</A>
        <A href={routes.WHATS_NEW}>Новости проекта</A>
      </div>
      <div className="auth-links">
        <AuthButtons push={push} />
      </div>
      <MobileNavReleaseFilterBar />
    </nav>
  ) : null
}

export default Nav
