import React from 'react'
import Link from 'next/link'
import { routes } from 'shared/constants'

import styles from './styles.module.css'

function Avatar({ user }) {
  return (
    <Link href={routes.ME}>
      <a className={styles.Avatar}>
        {user.current_user.email.split('@')[0].charAt(0)}
      </a>
    </Link>
  )
}

export default Avatar
