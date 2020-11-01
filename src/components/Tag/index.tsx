import { PropsWithChildren } from 'react'
import cx from 'classnames'
import styles from './styles.module.css'

interface Props {
  className?: string
  color: string
  bgColor: string
}

function Tag({
  children,
  className,
  bgColor,
  color,
}: PropsWithChildren<Props>) {
  return (
    <div
      style={{ color, backgroundColor: bgColor }}
      className={cx(styles.Tag, className)}
    >
      {children}
    </div>
  )
}

export default Tag
