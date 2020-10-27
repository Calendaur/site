import { HTMLAttributes, PropsWithChildren } from 'react'
import Link from 'next/link'

export interface Props {
  next?: boolean
  href: string
  as?: string
  className?: string
  target?: string
}

function A({
  next = true,
  children,
  href,
  as,
  className,
  ...rest
}: PropsWithChildren<Props & HTMLAttributes<HTMLAnchorElement>>) {
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
