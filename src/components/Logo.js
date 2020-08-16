import React from 'react'
import styled from '@emotion/styled'
import { routes } from 'shared/constants'
import { glitchAnimations } from 'shared/css-utils'
import A from './A'

const StyledLogo = styled(A)`
  --glitch-color-1: #ff00c1;
  --glitch-color-2: #00fff9;

  position: relative;
  display: flex;
  font-family: var(--logo-font);
  font-size: 32px;
  font-weight: 200;
  line-height: 1;
  letter-spacing: 0.15em;
  animation: ${glitchAnimations.skew} 5s infinite linear alternate-reverse;
  animation-delay: 2s;
  will-change: transform;

  &::before,
  &::after {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    content: attr(data-text);
    will-change: clip, transform;
  }

  &::before {
    left: 2px;
    clip: rect(44px, 450px, 56px, 0);
    text-shadow: -2px 0 var(--glitch-color-1);
    animation: ${glitchAnimations.animation1} 10s infinite linear
      alternate-reverse;
    animation-delay: 2s;
  }

  &::after {
    left: -2px;
    text-shadow: -2px 0 var(--glitch-color-2), 2px 2px var(--glitch-color-1);
    animation: ${glitchAnimations.animation2} 5s infinite linear
      alternate-reverse;
    animation-delay: 2s;
  }
`

function Logo({ className }) {
  return (
    <StyledLogo
      href={routes.HOME}
      aria-label="released.at"
      data-text="released"
      className={className}
    >
      released
    </StyledLogo>
  )
}

export default Logo
