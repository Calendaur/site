import React from 'react'
import cx from 'classnames'

import styles from './styles.module.css'

function MainPageContent({ children, className = '', ...rest }) {
  return (
    <main role="main" className={cx(styles.Content, className)} {...rest}>
      {children}
    </main>
  )
}

export default MainPageContent
