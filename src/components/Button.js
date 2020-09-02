import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import isPropValid from '@emotion/is-prop-valid'
import Spinner from './Spinner'

function Button({
  children,
  className,
  type = 'button',
  primary,
  ghost,
  fullWidth,
  disabled,
  loading,
  ...rest
}) {
  return (
    <button disabled={disabled} type={type} className={className} {...rest}>
      {loading ? <Spinner /> : children}
    </button>
  )
}

const base = css`
  -webkit-appearance: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.5em;
  padding-top: calc(0.5em - 1px);
  padding-right: 1em;
  padding-bottom: calc(0.5em - 1px);
  padding-left: 1em;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1;
  color: rgba(0, 0, 0, 0.7);
  text-align: center;
  white-space: nowrap;
  vertical-align: top;
  cursor: pointer;
  user-select: none;
  background-color: #dbdbdb;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: none;
  transition: var(--animation-time);

  &:hover {
    background-color: #eee;
  }

  &:active {
    background-color: #e8e8e8;
  }

  &:focus:not(:active) {
    box-shadow: 0 0 0 0.125em rgba(245, 245, 245, 0.25);
  }

  &:disabled {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.5;
  }
`

const primary = css`
  color: var(--primary-text);
  background-color: var(--blue);

  &:hover {
    background-color: var(--blue-hover);
  }

  &:active {
    background-color: var(--blue-active);
  }

  &:focus:not(:active) {
    box-shadow: 0 0 0 0.125em rgba(66, 135, 245, 0.25);
  }
`

const ghost = css`
  color: var(--primary-text);
  background-color: transparent;
`

const fullWidth = css`
  width: 100%;
`

const Styled = styled(Button, {
  shouldForwardProp: isPropValid,
})`
  ${base}
  ${props => props.primary && primary}
  ${props => props.ghost && ghost}
  ${props => props.fullWidth && fullWidth}
`

export default Styled
