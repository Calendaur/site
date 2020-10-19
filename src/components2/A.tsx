import React, { PropsWithChildren } from 'react'
import Link, { LinkProps } from 'next/link'

function A({
  children,
  className = '',
  ...rest
}: PropsWithChildren<LinkProps & { className?: string }>) {
  return (
    <Link {...rest}>
      <a className={className}>{children}</a>
    </Link>
  )
}

export default A
