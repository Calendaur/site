import React, {
  PropsWithChildren,
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react'
import cx from 'classnames'

import styles from './styles.module.css'

interface Props {
  span?: boolean
  small?: boolean
  b?: boolean
  i?: boolean
  em?: boolean
  strong?: boolean
  secondary?: boolean
}

function Text({
  span,
  small,
  b,
  i,
  em,
  strong,
  children,
  secondary,
  className,
  ...rest
}: PropsWithChildren<
  Props &
    DetailedHTMLProps<
      HTMLAttributes<HTMLParagraphElement>,
      HTMLParagraphElement
    >
>) {
  const classNames = cx(
    styles.Text,
    {
      [styles.Small]: small,
      [styles.Bold]: b || strong,
      [styles.Italic]: i || em,
      [styles.Secondary]: secondary,
    },
    className,
  )

  if (span)
    return (
      <span className={classNames} {...rest}>
        {children}
      </span>
    )

  if (small)
    return (
      <small className={classNames} {...rest}>
        {children}
      </small>
    )

  if (b)
    return (
      <b className={classNames} {...rest}>
        {children}
      </b>
    )

  if (strong) return <strong className={classNames}>{children}</strong>

  if (i)
    return (
      <i className={classNames} {...rest}>
        {children}
      </i>
    )

  if (em)
    return (
      <em className={classNames} {...rest}>
        {children}
      </em>
    )

  return (
    <p className={classNames} {...rest}>
      {children}
    </p>
  )
}

export default Text
