import { PropsWithChildren, DetailedHTMLProps, HTMLAttributes } from 'react'
import cx from 'classnames'

import styles from './styles.module.css'

interface Props {
  h2?: boolean
  h3?: boolean
  h4?: boolean
  h5?: boolean
  h6?: boolean
}

function Title({
  h2,
  h3,
  h4,
  h5,
  h6,
  children,
  className,
  ...rest
}: PropsWithChildren<
  Props &
    DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
>) {
  if (h2)
    return (
      <h2 className={cx(styles.Base, styles.H2, className)} {...rest}>
        {children}
      </h2>
    )

  if (h3)
    return (
      <h3 className={cx(styles.Base, styles.H3, className)} {...rest}>
        {children}
      </h3>
    )

  if (h4)
    return (
      <h4 className={cx(styles.Base, styles.H4, className)} {...rest}>
        {children}
      </h4>
    )

  if (h5)
    return (
      <h5 className={cx(styles.Base, styles.H5, className)} {...rest}>
        {children}
      </h5>
    )

  if (h6)
    return (
      <h6 className={cx(styles.Base, styles.H6, className)} {...rest}>
        {children}
      </h6>
    )

  return (
    <h1 className={cx(styles.Base, styles.H1, className)} {...rest}>
      {children}
    </h1>
  )
}

export default Title
