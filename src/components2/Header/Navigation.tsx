import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { styled } from 'stitches'
import { routes } from 'shared/constants'
import { useRedDot } from './useRedDot'

const StyledNavigation = styled('nav', {
  position: 'fixed',
  top: '64px',
  bottom: '0',
  left: '0',
  zIndex: '1',
  width: 'calc(100% - 32px)',
  flexDirection: 'column',
  paddingHorizontal: '$mobilePaddingHorizontal',
  backgroundColor: '$bg',
  overscrollBehavior: 'none',

  md: {
    position: 'initial',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 'initial',
    backgroundColor: 'initial',
    overscrollBehavior: 'initial',
    marginRight: '$md',
  },

  '& > a': {
    paddingVertical: '$xxs',
    fontSize: '$sm',
    color: '$text',
    textDecoration: 'none',
    fontWeight: '$medium',
    whiteSpace: 'nowrap',
    opacity: '0.75',
    transition: '0.25s',

    ':hover': {
      opacity: '1',
    },

    ':first-child': {
      marginLeft: '0',
    },

    md: {
      paddingVertical: '0',
      fontSize: '$xs',
      marginLeft: '$sm',
    },

    '&.hasRedDot > span': {
      position: 'relative',

      '::after': {
        position: 'absolute',
        right: '-8px',
        width: '12px',
        height: '12px',
        content: '""',
        backgroundColor: '#ff4b5c',
        borderRadius: '50%',
      },
    },
  },

  '& > .index, & > .today': {
    md: {
      display: 'none',
    },
  },
})

interface Props {
  isVisible: boolean
}

function Navigation({ isVisible }: Props) {
  const { asPath } = useRouter()
  const { whatsNew } = useRedDot()

  useEffect(() => {
    document.body.style.overflow = isVisible ? 'hidden' : 'inherit'
  }, [isVisible])

  const isIndex = asPath === routes.HOME

  return (
    <StyledNavigation
      css={{
        display: isVisible ? 'flex' : 'none',
      }}
    >
      {isIndex ? null : (
        <Link href={routes.HOME}>
          <a className="index">На главную</a>
        </Link>
      )}
      <Link href={routes.BLOG}>
        <a>Блог</a>
      </Link>
      <Link href={routes.WHATS_NEW}>
        <a className={whatsNew ? 'hasRedDot' : undefined}>
          <span>Что нового?</span>
        </a>
      </Link>
      <Link href={routes.TODAY}>
        <a className="today">Сегодня</a>
      </Link>
    </StyledNavigation>
  )
}

export default Navigation
