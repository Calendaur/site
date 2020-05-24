import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Dropdown } from '../../../components'

import styles from './styles.module.css'

function getLabel(type) {
  switch (type) {
    case 'films':
      return 'Кино'
    case 'games':
      return 'Игры'
    case 'series':
      return 'Сериалы'
    default:
      break
  }
}

const types = [
  {
    label: 'Кино',
    value: 'films',
  },
  {
    label: 'Сериалы',
    value: 'series',
  },
  {
    label: 'Игры',
    value: 'games',
  },
]

function FilterBar({
  type,
  month,
  year,
  prevYear,
  nextYear,
  nextLink,
  prevLink,
  toPrev,
  toNext,
}) {
  const wrapperRef = useRef()

  useEffect(() => {
    const changeTypePickerPosition = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        wrapperRef.current.classList.add(styles.isBottom)
      } else {
        wrapperRef.current.classList.remove(styles.isBottom)
      }
    }

    window.addEventListener('scroll', changeTypePickerPosition, {
      capture: true,
      passive: true,
    })

    return function cleanup() {
      window.removeEventListener('scroll', changeTypePickerPosition, {
        capture: true,
        passive: true,
      })
    }
  }, [])

  return (
    <div className={styles.Wrapper} ref={wrapperRef}>
      <Dropdown
        items={types}
        defaultSelectedItem={{
          label: getLabel(type),
          value: type,
        }}
        onSelect={({ selectedItem }) => {
          Router.push(
            `/${selectedItem.value}/[date]`,
            `/${selectedItem.value}/${month.eng}-${year}`,
          )
        }}
      />
      <div className={styles.DateBar}>
        <Link href={`/${type}/[date]`} as={prevLink}>
          <a disabled={prevYear < 2020}>
            <img src="/icons/arrow.svg" alt="" />
          </a>
        </Link>
        <div className={styles.Date}>
          <span>{month.rus}</span> {year}
        </div>
        <Link href={`/${type}/[date]`} as={nextLink}>
          <a disabled={nextYear > 2030}>
            <img src="/icons/arrow.svg" alt="" />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default FilterBar
