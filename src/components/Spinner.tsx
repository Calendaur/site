import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

interface Props {
  className?: string
}

function Spinner({ className }: Props) {
  return (
    <div className={className}>
      <span>
        <i></i>
        <i></i>
        <i></i>
      </span>
    </div>
  )
}

const blink = keyframes`
  0% {
    opacity: 0.2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
`

const Styled = styled(Spinner)`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px;

  & > span {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    user-select: none;
    background-color: transparent;

    & > i {
      display: inline-block;
      width: 4px;
      height: 4px;
      margin: 0 1px;
      background-color: rgb(200, 200, 200);
      border-radius: 50%;
      animation: 1.4s ease 0s infinite normal both running ${blink};

      &:nth-child(2) {
        animation-delay: 0.2s;
      }

      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }
`

export default Styled
