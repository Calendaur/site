import React from 'react'
import cx from 'classnames'

import styles from './styles.module.css'

function Button({
  as: Component = 'button',
  children,
  type,
  className = '',
  isPrimary = false,
  isLight = false,
  isFullWidth = false,
  size = 'normal',
  ...rest
}) {
  return (
    <Component
      type={type}
      className={cx(
        styles.button,
        {
          [styles.isPrimary]: isPrimary,
          [styles.isFullWidth]: isFullWidth,
          [styles.isLight]: isLight,
          [styles.isSmall]: size === 'small',
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
