import React from 'react'
import cx from 'classnames'
import { releaseTypes } from 'shared/constants'

import styles from './styles.module.css'

function ReleaseTypeChooser({ selected, setSelect }) {
  return (
    <ul className={styles.ReleaseTypeChooser}>
      {releaseTypes.map(({ type: t, title }) => (
        <li key={t}>
          <button
            className={cx({
              [styles.active]: t === selected,
            })}
            onClick={() => {
              setSelect(t)
              window.location.hash = t
            }}
          >
            {title}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default ReleaseTypeChooser
