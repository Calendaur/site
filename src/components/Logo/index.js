import React from 'react'
import cx from 'classnames'
import { HOME } from 'core/routes'
import A from '../A'

import styles from './styles.module.css'

function Logo({ className }) {
  return (
    <A
      href={HOME}
      aria-label="released.at"
      data-text="released"
      className={cx(styles.Logo, className)}
    >
      released
    </A>
  )
}

export default Logo
