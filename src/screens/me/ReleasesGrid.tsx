import cx from 'classnames'
import ResponsiveGrid from 'components/ResponsiveGrid'
import ReleaseCard, { Source } from 'components/ReleaseCard'
import Title from 'components/Title'
import { ReleaseInList } from 'types/common'

import styles from './styles.module.css'

interface Props {
  releases: ReleaseInList[]
  title: string
  last?: boolean
}

function ReleasesGrid({ releases, title, last }: Props) {
  if (!releases.length) return null

  return (
    <div
      className={cx(styles.ReleasesGrid, {
        [styles.isLast]: last,
      })}
    >
      <Title h3>{title}</Title>
      <ResponsiveGrid>
        {releases.map(release => (
          <ReleaseCard
            key={release.release_id}
            release={release}
            source={Source.Profile}
          />
        ))}
      </ResponsiveGrid>
    </div>
  )
}

export default ReleasesGrid
