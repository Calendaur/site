import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { routes, cookies } from 'shared/constants'
import { useMediaQuery } from 'shared/hooks'
import { useUser } from 'features/user/use-user'
import A from '../A'
import Button from '../Button'

const Float = dynamic(() => import('./Float'), { ssr: false })

const ncwn = cookies.NEED_CHECK_WHATS_NEW

function Nav() {
  const [isShowNav, setIsShowNav] = useState(false)
  const { push, asPath, events } = useRouter()
  const { user, isLoading } = useUser()
  const desktop = useMediaQuery('(min-width: 768px)')
  const mobile = desktop === false

  const isLoggedIn = Boolean(user)

  const currentMonth = new Date().getMonth().toString()

  if (Cookies.get(ncwn) === undefined || Cookies.get(ncwn) !== currentMonth) {
    Cookies.set(ncwn, 'true', {
      expires: 60,
    })
  }

  if (asPath === routes.WHATS_NEW) {
    Cookies.set(ncwn, currentMonth, {
      expires: 60,
    })
  }

  useEffect(() => {
    function hideNav() {
      setIsShowNav(false)
    }

    events.on('routeChangeComplete', hideNav)

    return () => {
      events.off('routeChangeComplete', hideNav)
    }
  }, []) // eslint-disable-line

  return (
    <>
      <nav className={isShowNav ? 'is-visible' : 'is-hidden'}>
        <A href={routes.HOME} className="home">
          На главную
        </A>
        <A href={routes.BLOG}>
          Блог{' '}
          <span role="img" aria-label="blog">
            📓
          </span>
        </A>
        <A
          href={routes.WHATS_NEW}
          className={Cookies.get(ncwn) === 'true' ? 'has-notification' : ''}
        >
          Новости проекта
        </A>
        <A href={routes.ARCHIVE}>Вышедшее</A>
        {isLoading ? <Button loading /> : null}
        {isLoggedIn ? (
          <Button
            primary
            onClick={() => {
              push(routes.ME)
            }}
          >
            {user.current_user.email.split('@')[0]}
          </Button>
        ) : (
          <>
            <Button
              onClick={() => {
                push(routes.SIGN_IN)
              }}
            >
              Вход
            </Button>
            <Button
              primary
              onClick={() => {
                push(routes.SIGN_UP)
              }}
            >
              Регистрация
            </Button>
          </>
        )}
      </nav>
      {mobile ? (
        <Float isShowNav={isShowNav} setIsShowNav={setIsShowNav} />
      ) : null}
    </>
  )
}

export default Nav
