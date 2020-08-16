import React from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

function A({ children, href, as, className, ...rest }) {
  return (
    <Link href={href} as={as}>
      <a className={className} {...rest}>
        {children}
      </a>
    </Link>
  )
}

const StyledA = styled(A)``

export default StyledA
