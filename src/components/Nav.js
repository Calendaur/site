import React from 'react'
import Cookies from 'js-cookie'
import format from 'date-fns/format'
import compareAsc from 'date-fns/compareAsc'
import { useWindowWidth } from 'shared/hooks'
import { routes, cookies } from 'shared/constants'
import A from './A'
import Logo from './Logo'
import AuthButtons from './AuthButtons'
import MobileNavReleaseFilterBar from './MobileNavReleaseFilterBar'

const ncwn = cookies.NEED_CHECK_WHATS_NEW

function getMonth() {
  return new Date().getMonth().toString()
}

function Nav({ push, isVisible, currentPage }) {
  if (Cookies.get(ncwn) === undefined || Cookies.get(ncwn) !== getMonth()) {
    Cookies.set(ncwn, 'true')
  }

  if (currentPage === routes.WHATS_NEW) {
    Cookies.set(ncwn, getMonth())
  }

  const width = useWindowWidth()

  if (width >= 768) {
    return (
      <nav>
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
