import React from 'react'
import Link from 'next/link'
import { styled } from 'stitches'
import { routes } from 'shared/constants'

const StyledUserAvatar = styled('a', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  width: '36px',
  minWidth: '36px',
  height: '36px',
  backgroundImage: 'linear-gradient(90deg, #8e2de2, #4a00e0)',
  borderRadius: '50%',
  fontWeight: '$bold',
  cursor: 'pointer',
  userSelect: 'none',

  md: {
    width: '42px',
    minWidth: '42px',
    height: '42px',
    fontSize: '$md',
    opacity: '0.75',
    transition: '0.25s',

    ':hover': {
      opacity: '1',
    },
  },
})

function UserAvatar({ user }) {
  return (
    <Link href={routes.ME}>
      <StyledUserAvatar>
        {user.current_user.email.split('@')[0].charAt(0)}
      </StyledUserAvatar>
    </Link>
  )
}

export default UserAvatar
