import { DetailedHTMLProps, HTMLAttributes } from 'react'
import cx from 'classnames'

import styles from './styles.module.css'

interface Props {
  className?: string
}

function Spinner({
  className,
  ...rest
}: Props & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div className={cx(styles.Spinner, className)} {...rest}>
      <span>
        <i></i>
        <i></i>
        <i></i>
      </span>
    </div>
  )
}

export default Spinner
