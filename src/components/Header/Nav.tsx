import  { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { routes, cookies } from 'shared/constants'
import { useMediaQuery } from 'shared/hooks'
import A from '../A'

import styles from './styles.module.css'

const Float = dynamic(() => import('./Float'), { ssr: false })

const ncwn = cookies.NEED_CHECK_WHATS_NEW

function Nav() {
  const [isShowNav, setIsShowNav] = useState(false)
  const { asPath, events } = useRouter()
  const desktop = useMediaQuery('(min-width: 768px)')
  const mobile = desktop === false

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
    if (desktop) return

    function hideNav() {
      setIsShowNav(false)
    }

    events.on('routeChangeComplete', hideNav)

    return () => {
      events.off('routeChangeComplete', hideNav)
    }
  }, []) // eslint-disable-line

  if (mobile) {
    return (
      <>
        {isShowNav ? (
          <nav className={styles['is-visible']}>
            {asPath !== routes.HOME ? (
              <A href={routes.HOME} className={styles.home}>
                На главную
              </A>
            ) : null}
            <A href={routes.BLOG}>Блог</A>
            <A
              href={routes.WHATS_NEW}
              className={Cookies.get(ncwn) === 'true' ? 'has-notification' : ''}
            >
              Новости проекта
            </A>
            <A href={routes.TODAY} className={styles.todayInNav}>
              Сегодня
            </A>
          </nav>
        ) : null}
        <Float isShowNav={isShowNav} setIsShowNav={setIsShowNav} />
      </>
    )
  }

  return (
    <>
      <nav className={isShowNav ? styles['is-visible'] : styles['is-hidden']}>
        {asPath !== routes.HOME ? (
          <A href={routes.HOME} className={styles.home}>
            На главную
          </A>
        ) : null}
        <A href={routes.BLOG}>Блог</A>
        <A
          href={routes.WHATS_NEW}
          className={Cookies.get(ncwn) === 'true' ? 'has-notification' : ''}
        >
          Новости проекта
        </A>
        <A href={routes.TODAY} className={styles.todayInNav}>
          Сегодня
        </A>
      </nav>
      {mobile ? (
        <Float isShowNav={isShowNav} setIsShowNav={setIsShowNav} />
      ) : null}
    </>
  )
}

export default Nav
