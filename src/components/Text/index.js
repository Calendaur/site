import React from 'react'
import cx from 'classnames'

import styles from './styles.module.css'

function Text({
  as: Component = 'p',
  children,
  size = 3,
  className = '',
  ...rest
}) {
  return (
    <Component className={cx(styles.text, className)} {...rest}>
      {children}
    </Component>
  )
}

export default Text
