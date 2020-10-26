import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import cx from 'classnames'
import { months } from 'shared/constants'

import styles from './styles.module.css'

interface Props {
  className?: string
}

const currentMonth = new Date().getMonth()
const currentYear = new Date().getFullYear()

function FilmsSeriesGames({ className }: Props) {
  const { asPath } = useRouter()
  const isIndex = asPath === '/'

  const date = isIndex
    ? `${months[currentMonth].eng}-${currentYear}`
    : asPath.split('/')[2]

  return (
    <div className={cx(styles.FilmsSeriesGames, className)}>
      <Link href="/films/[date]" as={`/films/${date}`}>
        <a
          className={cx({
            [styles.isActive]: asPath.startsWith('/films') || isIndex,
          })}
        >
          Кино
        </a>
      </Link>
      <Link href="/series/[date]" as={`/series/${date}`}>
        <a
          className={cx({
            [styles.isActive]: asPath.startsWith('/series'),
          })}
        >
          Сериалы
        </a>
      </Link>
      <Link href="/games/[date]" as={`/games/${date}`}>
        <a
          className={cx({
            [styles.isActive]: asPath.startsWith('/games'),
          })}
        >
          Игры
        </a>
      </Link>
    </div>
  )
}

export default FilmsSeriesGames
