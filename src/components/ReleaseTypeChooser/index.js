import React from 'react'
import cx from 'classnames'
import { releaseTypes } from 'shared/constants'
import A from '../A'

import styles from './styles.module.css'

function ReleaseTypeChooser({ type, month, year, className }) {
  return (
    <ul className={cx(styles.ReleaseTypeChooser, className)}>
      {releaseTypes.map(({ type: t, title }) => (
        <li key={t}>
          <A
            href={`/${t}/[date]`}
            as={`/${t}/${month.eng}-${year}`}
            className={cx({
              [styles.active]: type === t,
            })}
          >
            {title}
          </A>
        </li>
      ))}
    </ul>
  )
}

export default ReleaseTypeChooser
