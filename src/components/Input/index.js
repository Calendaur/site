import React from 'react'
import cx from 'classnames'

import styles from './styles.module.css'

function Input({
  label,
  id,
  className = '',
  labelClassName = '',
  inputClassName = '',
  errorClassName = '',
  error,
  ...rest
}) {
  return (
    <div className={cx(styles.Wrapper, className)}>
      <label className={cx(styles.Label, labelClassName)} htmlFor={id}>
        {label}
      </label>
      <input id={id} className={cx(styles.Input, inputClassName)} {...rest} />
      {error && (
        <span className={cx(styles.Error, errorClassName)}>{error}</span>
      )}
    </div>
  )
}

export default Input
