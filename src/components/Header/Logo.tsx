import React from 'react'
import { routes } from 'shared/constants'
import A from '../A'

function Logo() {
  return (
    <A
      href={routes.HOME}
      aria-label="released.at"
      data-text="released"
      className="logo"
    >
      released
    </A>
  )
}

export default Logo
