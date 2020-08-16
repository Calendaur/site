import React from 'react'
import cx from 'classnames'

import styles from './styles.module.css'

function Input({ label, id, className, error, ...rest }) {
  return (
    <div className={cx(styles.Wrapper, className)}>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...rest} />
      {error && <span>{error}</span>}
    </div>
  )
}

export default Input
