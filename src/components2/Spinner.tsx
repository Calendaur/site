import React from 'react'
import { styled, css } from 'stitches'

const blink = css.keyframes({
  '0%': {
    opacity: '0.2',
  },
  '20%': {
    opacity: '1',
  },
  '100%': {
    opacity: '0.2',
  },
})

const StyledSpinner = styled('div', {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  padding: '10px',

  '& > span': {
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    center: true,
    width: '100%',
    height: '100%',
    userSelect: 'none',
    backgroundColor: 'transparent',

    '& > i': {
      display: 'inline-block',
      width: '4px',
      height: '4px',
      margin: '0 1px',
      backgroundColor: 'rgb(200, 200, 200)',
      borderRadius: '50%',
      animation: `1.4s ease 0s infinite normal both running ${blink}`,

      '&:nth-child(2)': {
        animationDelay: '0.2s',
      },

      '&:nth-child(3)': {
        animationDelay: '0.4s',
      },
    },
  },
})

function Spinner() {
  return (
    <StyledSpinner>
      <span>
        <i></i>
        <i></i>
        <i></i>
      </span>
    </StyledSpinner>
  )
}

export default Spinner
