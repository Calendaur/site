import Link from 'next/link'
import Image from 'next/image'
import slugify from '@sindresorhus/slugify'
import format from 'date-fns/format'
import isToday from 'date-fns/isToday'
import isTomorrow from 'date-fns/isTomorrow'
import ru from 'date-fns/locale/ru'
import cx from 'classnames'
import { ReleaseType, ReleaseInList } from 'types/common'
import PlatformList from '../PlatformList'
import Text from '../Text'
import ExpectButton from '../ExpectButton'

import styles from './styles.module.css'

export enum Source {
  Calendar = 'calendar',
  Today = 'today',
  Profile = 'profile',
}

function renderDate(today: boolean, tomorrow: boolean, date: Date) {
  if (today) return 'сегодня'

  if (tomorrow) return 'завтра'

  return format(date, 'EEEEEE, d MMM', {
    locale: ru,
  })
}

interface Props {
  release: ReleaseInList
  source: Source
}

function ReleaseCard({ release, source }: Props) {
  const { title, released, release_id } = release

  const releasedDate = new Date(released)

  const slug = slugify(title)
  const today = isToday(releasedDate)
  const tomorrow = isTomorrow(releasedDate)

  return (
    <Link href="/release/[id]" as={`/release/${release_id}-${slug}`}>
      <a className={styles.ReleaseCard}>
        <div className={styles.Header}>
          <div
            className={cx(styles.Date, {
              [styles.isToday]: today,
            })}
          >
            {renderDate(today, tomorrow, releasedDate)}
          </div>
          <ExpectButton release={release} />
        </div>
        <div className={styles.Cover}>
          <Image src={release.cover} alt={release.title} unsized />
        </div>
        <div className={styles.Footer}>
          <Text className={styles.Title}>{release.title}</Text>
          {release.type === ReleaseType.Films && (
            <Text secondary i className={styles.Info}>
              {release.director}
            </Text>
          )}
          {release.type === ReleaseType.Series && (
            <Text secondary i className={styles.Info}>
              {release.season} сезон
            </Text>
          )}
          {release.type === ReleaseType.Games && (
            <PlatformList platforms={release.platforms} />
          )}
        </div>
      </a>
    </Link>
  )
}

export default ReleaseCard
