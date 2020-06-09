import React from 'react'
import cx from 'classnames'

import styles from './styles.module.css'

function Button({
  as: Component = 'button',
  children,
  type,
  className = '',
  ...rest
}) {
  return (
    <Component type={type} className={cx(styles.button, className)} {...rest}>
      {children}
    </Component>
  )
}

export default Button
