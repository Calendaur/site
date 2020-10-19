import React from 'react'
import { styled } from 'stitches'

const Button = styled('button', {
  center: true,
  width: '45px',
  height: '45px',
  backgroundColor: '$primary',
  borderRadius: '4px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.65)',
})

interface Props {
  isVisibleNavigation: boolean
  toggleNavigation: (arg: boolean) => void
}

function FloatNavigationButton({
  isVisibleNavigation,
  toggleNavigation,
}: Props) {
  return (
    <Button
      onClick={() => {
        toggleNavigation(!isVisibleNavigation)
      }}
    >
      <img
        width="24"
        height="24"
        src={isVisibleNavigation ? '/icons/close.svg' : '/icons/menu.svg'}
        alt={isVisibleNavigation ? 'Close menu' : 'Open menu'}
      />
    </Button>
  )
}

export default FloatNavigationButton
