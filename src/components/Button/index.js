import React from 'react'
import cx from 'classnames'

import styles from './styles.module.css'

function Button({
  children,
  className,
  type = 'button',
  primary,
  ghost,
  fullWidth,
  ...rest
}) {
  return (
    <button
      type={type}
      className={cx(
        styles.Base,
        {
          [styles.primary]: primary,
          [styles.ghost]: ghost,
          [styles.fullWidth]: fullWidth,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
