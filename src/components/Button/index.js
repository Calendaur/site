import React from 'react'
import cx from 'classnames'

import styles from './styles.module.css'

function Button({
  as: Component = 'button',
  children,
  type,
  className = '',
  isPrimary = false,
  ...rest
}) {
  return (
    <Component
      type={type}
      className={cx(
        styles.button,
        {
          [styles.isPrimary]: isPrimary,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default Button
