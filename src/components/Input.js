import React from 'react'
import styled from '@emotion/styled'

function Input({ label, id, className, error, ...rest }) {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...rest} />
      {error && <span className="error">{error}</span>}
    </div>
  )
}

const StyledInput = styled(Input)`
  position: relative;
  display: flex;
  flex-direction: column;

  & > input {
    -webkit-appearance: none;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    height: 2.5em;
    padding: calc(0.5em - 1px) calc(0.75em - 1px);
    font-size: 1rem;
    vertical-align: top;
    background-color: rgba(255, 255, 255, 0.13);
    border: 1px solid transparent;
    border-radius: 4px;
    transition: var(--transition);
    caret-color: var(--white);

    &:hover {
      background-color: rgba(255, 255, 255, 0.15);
    }

    &:focus {
      background-color: rgba(255, 255, 255, 0.15);
      box-shadow: 0 0 0 0.2em rgba(50, 115, 220, 0.25);
    }
  }

  & > label {
    padding: 4px 0;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  & > .error {
    position: absolute;
    top: 100%;
    left: 0;
    margin: 2px 0;
    font-size: 12px;
    line-height: 14px;
    color: #f56b3d;
  }
`

export default StyledInput
