import { PlatformList } from 'components'
import { ReleaseType, ReleaseWithDetails } from 'types/common'

import styles from './styles.module.css'

interface Props {
  release: ReleaseWithDetails
}

function ExtraInfo({ release }: Props) {
  return (
    <div className={styles.ExtraInfo}>
      {release.type === ReleaseType.Films && (
        <p className={styles.Label}>
          <span>Режиссер:</span> {release.director}
        </p>
      )}
      {release.type === ReleaseType.Games && (
        <>
          <p className={styles.Label}>
            <span>Платформы:</span>
          </p>
          <PlatformList
            className={styles.Platforms}
            platforms={release.platforms}
          />
        </>
      )}
      {release.type === ReleaseType.Series && (
        <p className={styles.Label}>
          <span>Сезон:</span> {release.season}
        </p>
      )}
    </div>
  )
}

export default ExtraInfo
