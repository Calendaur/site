import React from 'react'
import Link from 'next/link'

function A({ next = true, children, href, as, className, ...rest }) {
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
