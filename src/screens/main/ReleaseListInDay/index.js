import React from 'react'
import cx from 'classnames'
import ReleaseCard from '../ReleaseCard'

import styles from './styles.module.css'

function ReleaseListInDay({ releases, type }) {
  return (
    <div
      className={cx(styles.Releases, {
        [styles.hasSomeReleases]: releases.length > 0,
      })}
    >
      {releases.map(release => {
        return <ReleaseCard key={release.id} type={type} release={release} />
      })}
    </div>
  )
}

export default ReleaseListInDay
