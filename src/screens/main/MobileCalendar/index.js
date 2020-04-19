import React, { createRef } from 'react'
import compareAsc from 'date-fns/compareAsc'
import ReleaseCard from '../ReleaseCard'
import useReleaseAnimation from '../useReleaseAnimation'

import styles from './styles.module.css'

function MobileCalendar({ releases, openModal, type }) {
  const data = releases.sort((a, b) =>
    compareAsc(new Date(a.released), new Date(b.released)),
  )

  const transitionRef = createRef()
  const transitions = useReleaseAnimation(transitionRef, data)

  return (
    <ul className={styles.MobileCalendar}>
      {transitions.map(({ item: release, key, props }) => (
        <ReleaseCard
          type={type}
          key={key}
          release={release}
          transitionProps={props}
          openModal={openModal}
        />
      ))}
    </ul>
  )
}

export default MobileCalendar
