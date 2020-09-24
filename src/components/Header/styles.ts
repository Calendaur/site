import styled from '@emotion/styled'
import { glitchAnimations, center, spaceBetween } from 'shared/css-utils'

const StyledHeader = styled.header`
  @media (min-width: 768px) {
    ${spaceBetween}
    z-index: 1;
    height: 92px;
    padding: 0 var(--page-padding);
  }

  .logo {
    --glitch-color-1: #ff00c1;
    --glitch-color-2: #00fff9;

    position: relative;
    display: flex;
    margin: 16px 0 0 16px;
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

    @media (min-width: 768px) {
      margin: 0;
    }
  }

  nav {
    @media (max-width: 767px) {
      position: fixed;
      top: 48px;
      bottom: 0;
      left: 0;
      z-index: 1;
      flex-direction: column;
      width: 100vw;
      padding: var(--page-padding);
      background: var(--background-color);
      overscroll-behavior: none;

      &.is-visible {
        display: flex;
      }

      &.is-hidden {
        display: none;
      }

      a {
        padding: 8px 0;

        &.has-notification {
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

      button {
        margin: 8px 0;
      }
    }

    @media (min-width: 768px) {
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
`

export default StyledHeader
