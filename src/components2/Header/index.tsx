import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { styled } from 'stitches'
import { useUser } from 'features/user/use-user2'
import Logo from './Logo'
import CalendarNavigation, {
  CalendarNavigationPosition,
} from './CalendarNavigation'
import Navigation from './Navigation'
import AuthButtons from './AuthButtons'
import UserAvatar from './UserAvatar'
import FloatNavigationButton from './FloatNavigationButton'
import Spinner from '../Spinner'

const StyledHeader = styled('header', {
  spaceBetween: true,
  paddingVertical: '$sm',

  sm: {
    paddingVertical: '$md',
  },

  calendarNavigationBottom: {
    marginBottom: '38px',
  },
})

const LeftPart = styled('div', {
  display: 'flex',
  alignItems: 'center',
})

const RightPart = styled('div', {
  display: 'flex',
  alignItems: 'center',
})

const FloatPart = styled('div', {
  position: 'fixed',
  bottom: '30px',
  left: '16px',
  zIndex: '1',
  display: 'flex',

  md: {
    display: 'none',
  },
})

function Header() {
  const [isVisibleNavigation, toggleNavigation] = useState(false)
  const { events } = useRouter()
  const { isLoading, user } = useUser()

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

  return (
    <StyledHeader>
      <LeftPart>
        <Logo />
        <CalendarNavigation position={CalendarNavigationPosition.InHeader} />
      </LeftPart>
      <RightPart>
        <Navigation isVisible={isVisibleNavigation} />
        {isLoading ? <Spinner /> : null}
        {user ? <UserAvatar user={user} /> : isLoading ? null : <AuthButtons />}
      </RightPart>
      <FloatPart>
        <FloatNavigationButton
          isVisibleNavigation={isVisibleNavigation}
          toggleNavigation={toggleNavigation}
        />
        <CalendarNavigation position={CalendarNavigationPosition.Fixed} />
      </FloatPart>
    </StyledHeader>
  )
}

export default Header
