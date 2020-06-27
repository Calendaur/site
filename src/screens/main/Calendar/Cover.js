import React from 'react'
import { monthString, getTypeWithoutS } from '../../../core/helpers'

import styles from './styles.module.css'

function Cover({ month, type, year }) {
  return (
    <div className={styles.Cover}>
      <div className={styles.Gradient}>
        <img
          loading="lazy"
          src={`https://api.calendaur.com/uploads/bg/${year}-${monthString(
            month + 1,
          )}-${getTypeWithoutS(type)}.jpg`}
          alt=""
        />
      </div>
    </div>
  )
}

export default Cover
