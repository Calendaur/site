import React, {
  PropsWithChildren,
  DetailedHTMLProps,
  ButtonHTMLAttributes,
} from 'react'
import cx from 'classnames'

import styles from './styles.module.css'

interface Props {
  className?: string
  primary?: boolean
  secondary?: boolean
  fullWidth?: boolean
  size?: 'small' | 'large'
}

function Button({
  children,
  className,
  primary,
  secondary,
  fullWidth,
  size,
  ...rest
}: PropsWithChildren<
  Props &
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
>) {
  console.log(styles)
  return (
    <button
      className={cx(
        styles.base,
        {
          [styles.primary]: primary,
          [styles.secondary]: secondary,
          [styles.fullWidth]: fullWidth,
          [styles.small]: size === 'small',
          [styles.large]: size === 'large',
        },
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
