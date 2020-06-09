import React from 'react'
import cx from 'classnames'

import styles from './styles.module.css'

function Title({
  as: Component = 'h1',
  children,
  size = 3,
  className = '',
  ...rest
}) {
  return (
    <Component
      className={cx(styles.title, styles[`is-${size}`], className)}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default Title
