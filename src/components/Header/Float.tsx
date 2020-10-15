import React, { useEffect } from 'react'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import { useDateCarousel } from './useDateCarousel'
import Image from '../Image'

import styles from './styles.module.css'

interface Props {
  isShowNav: boolean
  setIsShowNav: (arg: boolean) => void
}

function Float({ isShowNav, setIsShowNav }: Props) {
  useEffect(() => {
    document.body.style.overflow = isShowNav ? 'hidden' : 'inherit'
  }, [isShowNav])

  const dateCarousel = useDateCarousel()

  return (
    <div className={styles.float}>
      <button
        onClick={() => {
          setIsShowNav(!isShowNav)
        }}
      >
        <img
          width="24"
          height="24"
          src={isShowNav ? '/icons/close.svg' : '/icons/menu.svg'}
          alt={isShowNav ? 'Close menu' : 'Open menu'}
        />
      </button>
      {dateCarousel && !isShowNav ? (
        <div className={styles.dateCarouselFloat}>
          <button
            className={styles.prev}
            type="button"
            onClick={() => {
              const { push, prevLink } = dateCarousel
              push(prevLink.href, prevLink.as)
            }}
            disabled={dateCarousel.disabledPrev}
          >
            <Image width="16" height="16" src="/icons/left.svg" />
          </button>
          <span>
            <span className={styles.dateCarouselMonth}>
              {format(dateCarousel.date, 'LLLL', { locale: ru })}
            </span>{' '}
            <span className={styles.dateCarouselYear}>{dateCarousel.year}</span>
          </span>
          <button
            className={styles.next}
            type="button"
            onClick={() => {
              const { push, nextLink } = dateCarousel
              push(nextLink.href, nextLink.as)
            }}
            disabled={dateCarousel.disabledNext}
          >
            <Image width="16" height="16" src="/icons/right.svg" />
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default Float
