import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useAmp } from 'next/amp'
import styled from '@emotion/styled'
import { center, spaceBetween } from 'shared/css-utils'
import { useMediaQuery } from 'shared/hooks'

const Nav = dynamic(() => import('./Nav'), { ssr: false })
const Logo = dynamic(() => import('./Logo'))

const StyledHeader = styled.header`
  .desktop {
    display: none;

    @media (min-width: 768px) {
      ${spaceBetween}
      z-index: 1;
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

    .has-notification {
      position: relative;

      &::after {
        position: absolute;
        right: -8px;
        width: 12px;
        height: 12px;
        content: '';
        background-color: #ff4b5c;
        border-radius: 50%;
      }
    }
  }

  .mobile {
    z-index: 1;
    display: block;

    @media (min-width: 768px) {
      display: none;
    }

    .logo {
      margin: 16px 0 0 16px;
    }

    .float {
      position: fixed;
      bottom: 30px;
      left: 16px;
      z-index: 3;

      button {
        --size: 45px;
        --icon-size: 24px;

        ${center}
        width: var(--size);
        height: var(--size);
        background-color: var(--blue);
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(255, 255, 255, 0.15);

        img {
          width: var(--icon-size);
          height: var(--icon-size);
        }
      }
    }

    nav {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      width: 100vw;
      padding: var(--page-padding);
      background: var(--black);
      overscroll-behavior: none;

      .nav-links,
      .auth-links {
        display: flex;
        margin-top: var(--vertical-4);
      }

      .nav-links {
        flex-direction: column;

        a {
          display: flex;
          align-items: center;
          height: 40px;
          padding: 0 9px;
          margin-bottom: var(--vertical-6);
          font-size: 14px;
          line-height: 1;
          background-color: rgba(255, 255, 255, 0.07);
          border-radius: 4px;
        }
      }

      .auth-links button {
        flex: 1;
      }
    }
  }
`

function Header() {
  const isAmp = useAmp()
  const [visibleMobileNav, setVisibleMobileNav] = useState(false)
  const [isMount, setIsMount] = useState(false)
  const { events, push, asPath } = useRouter()

  const desktop = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    setIsMount(true)
  }, [])

  useEffect(() => {
    if (desktop) return

    document.body.style.overflow = visibleMobileNav ? 'hidden' : 'inherit'
  }, [visibleMobileNav]) // eslint-disable-line

  useEffect(() => {
    if (desktop) return

    function closeMobileNav() {
      setVisibleMobileNav(false)
    }

    events.on('routeChangeComplete', closeMobileNav)

    return () => {
      events.off('routeChangeComplete', closeMobileNav)
    }
  }, []) // eslint-disable-line

  if (isAmp) {
    return (
      <StyledHeader aria-label="header">
        <div className="mobile">
          <Logo className="logo" />
        </div>
      </StyledHeader>
    )
  }

  if (!isMount) {
    return (
      <StyledHeader aria-label="header">
        <div className="desktop">
          <Logo />
          <Nav push={push} currentPage={asPath} desktop={desktop} />
        </div>
        <div className="mobile">
          <Logo className="logo" />
          <div className="float">
            <button
              onClick={() => {
                setVisibleMobileNav(!visibleMobileNav)
              }}
            >
              {visibleMobileNav ? (
                <img
                  width="24"
                  height="24"
                  src="/icons/close.svg"
                  alt="Close menu"
                />
              ) : (
                <img
                  width="24"
                  height="24"
                  src="/icons/menu.svg"
                  alt="Open menu"
                />
              )}
            </button>
          </div>
          <Nav push={push} isVisible={visibleMobileNav} desktop={desktop} />
        </div>
      </StyledHeader>
    )
  }

  return (
    <StyledHeader aria-label="header">
      {desktop ? (
        <div className="desktop">
          <Logo />
          <Nav push={push} currentPage={asPath} desktop={desktop} />
        </div>
      ) : (
        <div className="mobile">
          <Logo className="logo" />
          <div className="float">
            <button
              onClick={() => {
                setVisibleMobileNav(!visibleMobileNav)
              }}
            >
              {visibleMobileNav ? (
                <img
                  width="24"
                  height="24"
                  src="/icons/close.svg"
                  alt="Close menu"
                />
              ) : (
                <img
                  width="24"
                  height="24"
                  src="/icons/menu.svg"
                  alt="Open menu"
                />
              )}
            </button>
          </div>
          <Nav push={push} isVisible={visibleMobileNav} desktop={desktop} />
        </div>
      )}
    </StyledHeader>
  )
}

export default Header
