import React from 'react'
import Link from 'next/link'

function A({ children, href, as, className, ...rest }) {
  return (
    <Link href={href} as={as}>
      <a className={className} {...rest}>
        {children}
      </a>
    </Link>
  )
}

export default A
