import React from 'react'
import Link from 'next/link'
import slugify from '@sindresorhus/slugify'
import format from 'date-fns/format'
import isToday from 'date-fns/isToday'
import isTomorrow from 'date-fns/isTomorrow'
import ru from 'date-fns/locale/ru'
import cx from 'classnames'
import { ReleaseType, ReleaseInList } from 'types/common'
import PlatformList from '../PlatformList'

import styles from './styles.module.css'

export enum Source {
  Calendar = 'calendar',
  Today = 'today',
  Profile = 'profile',
}

function renderDate(today: boolean, tomorrow: boolean, date: Date) {
  if (today) return 'сегодня'

  if (tomorrow) return 'завтра'

  return format(date, 'EEEEEE, d MMMM', {
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
              [styles.fromCalendar]: source === Source.Calendar,
              [styles.isToday]: today,
            })}
          >
            {renderDate(today, tomorrow, releasedDate)}
          </div>
        </div>
        <picture>
          <source srcSet={`${release.cover}.webp`} type="image/webp" />
          <source srcSet={release.cover} type="image/jpeg " />
          <img src={release.cover} alt={release.title} loading="lazy" />
        </picture>
        <div className={styles.Footer}>
          <p className={styles.Title}>{release.title}</p>
          {release.type === ReleaseType.Films && (
            <p className={styles.Info}>{release.director}</p>
          )}
          {release.type === ReleaseType.Series && (
            <p className={styles.Info}>{release.season} сезон</p>
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
