import React from 'react'
import dynamic from 'next/dynamic'
import { useAmp } from 'next/amp'
import slugify from '@sindresorhus/slugify'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import { A, Image } from 'components'
import Info from './Info'

import styles from './styles.module.css'

const ExpectButton = dynamic(() => import('components/ExpectButton'))

function typeLabel(type) {
  if (type.includes('film')) {
    return {
      text: 'кино',
      backgroundColor: '#d2e603',
      color: '#000',
    }
  }

  if (type.includes('game')) {
    return {
      text: 'игра',
      backgroundColor: '#9d65c9',
      color: '#fff',
    }
  }

  if (type.includes('series')) {
    return {
      text: 'сериал',
      backgroundColor: '#ea5455',
      color: '#fff',
    }
  }
}

function ReleaseCard({
  release,
  type,
  showDate = false,
  showType = false,
  className = '',
}) {
  const isAmp = useAmp()
  const slug = slugify(release.title)

  function renderType() {
    const { text, backgroundColor, color } = typeLabel(type)

    return (
      <div className="type" style={{ backgroundColor, color }}>
        {text}
      </div>
    )
  }

  return (
    <A
      className={`${styles.card} ${className}`}
      href="/release/[id]"
      as={`/release/${release.release_id}-${slug}`}
    >
      {showType && renderType()}
      {showDate && (
        <div className={styles['released-date']}>
          {format(new Date(release.released), 'd MMM', { locale: ru })}
        </div>
      )}
      <ExpectButton className={styles['expect-button']} release={release} />
      <div
        className={
          isAmp ? `${styles.aspectRatio} ${styles.isAmp}` : styles.aspectRatio
        }
      >
        <Image src={release.cover} alt={release.title} />
      </div>
      <Info release={release} type={type} showType={showType} />
    </A>
  )
}

export default ReleaseCard
