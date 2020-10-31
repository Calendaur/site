import { PropsWithChildren } from 'react'
import cx from 'classnames'

import styles from './styles.module.css'

interface Props {
  className?: string
}

function TitleWithDescription({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <div className={cx(styles.TitleWithDescription, className)}>{children}</div>
  )
}

export default TitleWithDescription
