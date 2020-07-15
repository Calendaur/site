import React from 'react'
import cx from 'classnames'

import styles from './Archive.module.css'

const types = [
  {
    type: 'films',
    title: 'Кино',
  },
  {
    type: 'series',
    title: 'Сериалы',
  },
  {
    type: 'games',
    title: 'Игры',
  },
]

function ReleaseTypeChooser({ selected, setSelect }) {
  return (
    <ul className={styles.ReleaseTypeChooser}>
      {types.map(({ type: t, title }) => (
        <li key={t}>
          <button
            className={cx('underline', {
              [styles.isActive]: t === selected,
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
