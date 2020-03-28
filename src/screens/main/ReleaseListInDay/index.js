import React, { createRef } from 'react'
import cx from 'classnames'
import ReleaseCard from '../ReleaseCard'
import useReleaseAnimation from '../useReleaseAnimation'

import styles from './styles.module.css'

function ReleaseListInDay({ releases, openModal }) {
  const transitionRef = createRef()
  const transitions = useReleaseAnimation(transitionRef, releases)

  return (
    <div
      className={cx(styles.Releases, {
        [styles.hasSomeReleases]: releases.length > 0,
      })}
    >
      {transitions.map(({ item: release, key, props }) => {
        return (
          <ReleaseCard
            key={key}
            release={release}
            transitionProps={props}
            openModal={openModal}
          />
        )
      })}
    </div>
  )
}

export default ReleaseListInDay
