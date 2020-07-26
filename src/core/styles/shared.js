import { css, keyframes } from '@emotion/react'

export const center = css`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const spaceBetween = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const glitchAnimations = {
  animation1: keyframes`
    0% {
      clip: rect(24px, 9999px, 72px, 0);
      transform: skew(0.03deg);
    }
    5% {
      clip: rect(69px, 9999px, 57px, 0);
      transform: skew(0.71deg);
    }
    10% {
      clip: rect(95px, 9999px, 46px, 0);
      transform: skew(0.06deg);
    }
    15% {
      clip: rect(69px, 9999px, 20px, 0);
      transform: skew(0.06deg);
    }
    20% {
      clip: rect(45px, 9999px, 70px, 0);
      transform: skew(0.11deg);
    }
    25% {
      clip: rect(51px, 9999px, 50px, 0);
      transform: skew(0.67deg);
    }
    30% {
      clip: rect(15px, 9999px, 27px, 0);
      transform: skew(0.09deg);
    }
    35% {
      clip: rect(48px, 9999px, 99px, 0);
      transform: skew(0.47deg);
    }
    40% {
      clip: rect(67px, 9999px, 95px, 0);
      transform: skew(0.53deg);
    }
    45% {
      clip: rect(46px, 9999px, 70px, 0);
      transform: skew(0.08deg);
    }
    50% {
      clip: rect(60px, 9999px, 3px, 0);
      transform: skew(0.32deg);
    }
    55% {
      clip: rect(56px, 9999px, 68px, 0);
      transform: skew(0.08deg);
    }
    60% {
      clip: rect(56px, 9999px, 87px, 0);
      transform: skew(0.7deg);
    }
    65% {
      clip: rect(7px, 9999px, 18px, 0);
      transform: skew(0.1deg);
    }
    70% {
      clip: rect(20px, 9999px, 64px, 0);
      transform: skew(0.71deg);
    }
    75% {
      clip: rect(21px, 9999px, 34px, 0);
      transform: skew(1deg);
    }
    80% {
      clip: rect(90px, 9999px, 55px, 0);
      transform: skew(0.06deg);
    }
    85% {
      clip: rect(56px, 9999px, 80px, 0);
      transform: skew(0.05deg);
    }
    90% {
      clip: rect(55px, 9999px, 8px, 0);
      transform: skew(0.72deg);
    }
    95% {
      clip: rect(89px, 9999px, 34px, 0);
      transform: skew(0.66deg);
    }
    100% {
      clip: rect(81px, 9999px, 13px, 0);
      transform: skew(0.42deg);
    }
  `,
  animation2: keyframes`
    0% {
      clip: rect(48px, 9999px, 9px, 0);
      transform: skew(0.83deg);
    }
    5% {
      clip: rect(41px, 9999px, 46px, 0);
      transform: skew(0.98deg);
    }
    10% {
      clip: rect(22px, 9999px, 96px, 0);
      transform: skew(0.96deg);
    }
    15% {
      clip: rect(37px, 9999px, 3px, 0);
      transform: skew(0.05deg);
    }
    20% {
      clip: rect(56px, 9999px, 8px, 0);
      transform: skew(0.22deg);
    }
    25% {
      clip: rect(16px, 9999px, 58px, 0);
      transform: skew(0.83deg);
    }
    30% {
      clip: rect(24px, 9999px, 94px, 0);
      transform: skew(0.51deg);
    }
    35% {
      clip: rect(46px, 9999px, 24px, 0);
      transform: skew(0.78deg);
    }
    40% {
      clip: rect(72px, 9999px, 29px, 0);
      transform: skew(0.65deg);
    }
    45% {
      clip: rect(20px, 9999px, 13px, 0);
      transform: skew(0.55deg);
    }
    50% {
      clip: rect(21px, 9999px, 99px, 0);
      transform: skew(0.32deg);
    }
    55% {
      clip: rect(54px, 9999px, 72px, 0);
      transform: skew(0.06deg);
    }
    60% {
      clip: rect(99px, 9999px, 41px, 0);
      transform: skew(0.06deg);
    }
    65% {
      clip: rect(87px, 9999px, 89px, 0);
      transform: skew(0.84deg);
    }
    70% {
      clip: rect(26px, 9999px, 98px, 0);
      transform: skew(0.81deg);
    }
    75% {
      clip: rect(81px, 9999px, 88px, 0);
      transform: skew(0.87deg);
    }
    80% {
      clip: rect(84px, 9999px, 33px, 0);
      transform: skew(0.07deg);
    }
    85% {
      clip: rect(20px, 9999px, 96px, 0);
      transform: skew(0.28deg);
    }
    90% {
      clip: rect(93px, 9999px, 59px, 0);
      transform: skew(0.64deg);
    }
    95% {
      clip: rect(8px, 9999px, 54px, 0);
      transform: skew(0.45deg);
    }
    100% {
      clip: rect(33px, 9999px, 100px, 0);
      transform: skew(0.21deg);
    }
  `,
  skew: keyframes`
    0% {
      transform: skew(-1deg);
    }
    10% {
      transform: skew(2deg);
    }
    20% {
      transform: skew(-1deg);
    }
    30% {
      transform: skew(-3deg);
    }
    40% {
      transform: skew(4deg);
    }
    50% {
      transform: skew(5deg);
    }
    60% {
      transform: skew(4deg);
    }
    70% {
      transform: skew(-3deg);
    }
    80% {
      transform: skew(-4deg);
    }
    90% {
      transform: skew(-3deg);
    }
    100% {
      transform: skew(4deg);
    }
  `,
}
