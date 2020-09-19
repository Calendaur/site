import React from 'react'
import Cookies from 'js-cookie'
import { useMediaQuery } from 'shared/hooks'
import { routes, cookies } from 'shared/constants'
import A from './A'
import Logo from './Logo'
import AuthButtons from './AuthButtons'
import MobileNavReleaseFilterBar from './MobileNavReleaseFilterBar'

const ncwn = cookies.NEED_CHECK_WHATS_NEW

function Nav({ push, isVisible, currentPage }) {
  const currentMonth = new Date().getMonth().toString()

  if (Cookies.get(ncwn) === undefined || Cookies.get(ncwn) !== currentMonth) {
    Cookies.set(ncwn, 'true', {
      expires: 60,
    })
  }

  if (currentPage === routes.WHATS_NEW) {
    Cookies.set(ncwn, currentMonth, {
      expires: 60,
    })
  }

  const desktop = useMediaQuery('(min-width: 768px)')

  if (desktop) {
    return (
      <nav>
        <A href={routes.BLOG}>Блог</A>
        <A
          href={routes.WHATS_NEW}
          className={Cookies.get(ncwn) === 'true' ? 'has-notification' : ''}
          onClick={() => {
            Cookies.remove()
          }}
        >
          Новости проекта
        </A>
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
        <A href={routes.BLOG}>Блог</A>
        <A href={routes.ARCHIVE}>Вышедшие релизы</A>
        <A
          href={routes.WHATS_NEW}
          onClick={() => {
            Cookies.remove()
          }}
        >
          Новости проекта
        </A>
      </div>
      <div className="auth-links">
        <AuthButtons push={push} />
      </div>
      <MobileNavReleaseFilterBar />
    </nav>
  ) : null
}

export default Nav
