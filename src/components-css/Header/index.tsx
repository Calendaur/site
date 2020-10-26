import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import cx from 'classnames'
import { useUser } from 'features/user/use-user2'
import Logo from './Logo'
import CalendarNavigation, {
  CalendarNavigationPosition,
} from './CalendarNavigation'
import Navigation from './Navigation'
import AuthButtons from './AuthButtons'
import Avatar from './Avatar'
import FloatNavigationButton from './FloatNavigationButton'
import Spinner from '../Spinner'
import { useMonthChanger } from './useMonthChanger'

import styles from './styles.module.css'

function Header() {
  const [isVisibleNavigation, toggleNavigation] = useState(false)
  const { events } = useRouter()
  const { isLoading, user } = useUser()
  const monthChangerData = useMonthChanger()

  useEffect(() => {
    if (window.innerWidth > 768) return

    function hideNav() {
      toggleNavigation(false)
    }

    events.on('routeChangeStart', hideNav)

    return () => {
      events.off('routeChangeStart', hideNav)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const hasMonthChangerData = monthChangerData !== null

  return (
    <header
      className={cx(styles.Header, {
        [styles.withoutMarginBottom]: !hasMonthChangerData,
      })}
    >
      <div className={styles.LeftPart}>
        <Logo />
        {hasMonthChangerData ? (
          <CalendarNavigation
            position={CalendarNavigationPosition.InHeader}
            data={monthChangerData}
          />
        ) : null}
      </div>
      <div className={styles.RightPart}>
        <Navigation isVisible={isVisibleNavigation} />
        {isLoading ? <Spinner /> : null}
        {user ? <Avatar user={user} /> : isLoading ? null : <AuthButtons />}
      </div>
      <div className={styles.FloatPart}>
        <FloatNavigationButton
          isVisibleNavigation={isVisibleNavigation}
          toggleNavigation={toggleNavigation}
        />
        {hasMonthChangerData ? (
          <CalendarNavigation
            position={CalendarNavigationPosition.Fixed}
            data={monthChangerData}
          />
        ) : null}
      </div>
    </header>
  )
}

export default Header
