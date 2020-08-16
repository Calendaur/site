import React, { PropsWithChildren, HTMLAttributes } from 'react'
import Link, { LinkProps } from 'next/link'

type Props = {
  next?: boolean
  className?: string
  href: string
}

function A({
  next = true,
  children,
  href,
  as,
  className,
  ...rest
}: PropsWithChildren<Props & LinkProps & HTMLAttributes<HTMLAnchorElement>>) {
  if (next) {
    return (
      <Link href={href} as={as}>
        <a className={className} {...rest}>
          {children}
        </a>
      </Link>
    )
  }

  return (
    <a className={className} href={href} {...rest}>
      {children}
    </a>
  )
}

export default A
