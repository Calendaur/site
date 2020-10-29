import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import cx from 'classnames'

import styles from './styles.module.css'

interface Props {
  label?: string
  id?: string
  className?: string
  error?: string
}

function Input({
  label,
  id,
  className,
  error,
  ...rest
}: Props &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <div className={cx(styles.Input, className)}>
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} {...rest} />
      {error && <span>{error}</span>}
    </div>
  )
}

export default Input
