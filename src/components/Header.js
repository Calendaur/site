import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import cx from 'classnames'
import * as routes from 'core/routes'
import { center, spaceBetween } from 'core/styles/shared'
import { Logo, A } from 'components'
import MobileNavReleaseFilterBar from './MobileNavReleaseFilterBar'
import { DesktopAuthButtons, MobileAuthButtons } from './AuthButtons'

function Header({ className }) {
  const [visibleMobileNav, setVisibleMobileNav] = useState(false)
  const { events } = useRouter()

  function closeMobileNav() {
    setVisibleMobileNav(false)
  }

  useEffect(() => {
    if (visibleMobileNav) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'inherit'
    }
  }, [visibleMobileNav])

  useEffect(() => {
    events.on('routeChangeComplete', closeMobileNav)

    return () => {
      events.off('routeChangeComplete', closeMobileNav)
    }
  }, [events])

  return (
    <>
      <header aria-label="header" className={cx(className, 'desktop-header')}>
        <Logo />
        <nav>
          <A href={routes.WHATS_NEW}>Новости проекта</A>
          <A href={routes.ARCHIVE}>Вышедшее</A>
          <DesktopAuthButtons />
        </nav>
      </header>
      <header aria-label="header" className={cx(className, 'mobile-header')}>
        <div className="logo">
          <Logo />
        </div>
        <div className="float">
          <button
            onClick={() => {
              setVisibleMobileNav(!visibleMobileNav)
            }}
          >
            {visibleMobileNav ? (
              <img src="/icons/close.svg" alt="Close menu" />
            ) : (
              <img src="/icons/menu.svg" alt="Open menu" />
            )}
          </button>
        </div>
        {visibleMobileNav && (
          <nav>
            <Logo />
            <div className="nav-links">
              <A href={routes.HOME}>На главную</A>
              <A href={routes.ARCHIVE}>Вышедшие релизы</A>
              <A href={routes.WHATS_NEW}>Новости проекта</A>
            </div>
            <div className="auth-links">
              <MobileAuthButtons />
            </div>
            <MobileNavReleaseFilterBar />
          </nav>
        )}
      </header>
    </>
  )
}

const StyledHeader = styled(Header)`
  &.desktop-header {
    display: none;

    @media (min-width: 768px) {
      ${spaceBetween}
      height: 56px;
      padding: 0 var(--page-padding);

      & > nav {
        ${center}

        & > * {
          margin-left: 24px;
          font-size: 0.875rem;

          &:first-child {
            margin-left: 0;
          }
        }
      }
    }

    @media (min-width: 1024px) {
      height: 60px;
    }

    @media (min-width: 1440px) {
      height: 80px;
    }
  }

  &.mobile-header {
    --gradient: linear-gradient(90deg, var(--light-blue), var(--blue));

    display: block;

    & .logo {
      margin-top: 16px;
      margin-left: 16px;
    }

    & > .float {
      position: fixed;
      bottom: 30px;
      left: 16px;
      z-index: 3;

      & > button {
        --size: 45px;
        --icon-size: 24px;

        ${center}
        width: var(--size);
        height: var(--size);
        background: var(--gradient);
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(255, 255, 255, 0.15);

        img {
          width: var(--icon-size);
          height: var(--icon-size);
        }
      }
    }

    & > nav {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      width: 100vw;
      padding: var(--page-padding);
      background: var(--black);
      overscroll-behavior: none;

      & > .nav-links,
      & > .auth-links {
        display: flex;
        margin-top: var(--vertical-4);

        & > a {
          display: block;
          height: 33px;
          padding: 0 9px;
          line-height: 33px;
          border-radius: 4px;
        }
      }

      & > .nav-links {
        flex-direction: column;

        & > a {
          margin-bottom: var(--vertical-6);
          font-size: 14px;
          background-color: rgba(255, 255, 255, 0.07);
        }
      }

      & > .auth-links {
        & > a {
          flex: 1;
          font-weight: 500;
          text-align: center;

          &.gradient {
            color: var(--black);
            background: var(--gradient);
          }

          &:first-child {
            color: var(--blue);
          }
        }
      }
    }

    @media (min-width: 768px) {
      display: none;
    }
  }
`

export default StyledHeader
