import React from 'react'
import cx from 'classnames'

import styles from './styles.module.css'

function Subtitle({
  as: Component = 'h1',
  children,
  size = 3,
  className = '',
  ...rest
}) {
  return (
    <Component
      className={cx(styles.subtitle, styles[`is-${size}`], className)}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default Subtitle
