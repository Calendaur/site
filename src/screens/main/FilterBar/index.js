import React from 'react'
import Router from 'next/router'
import { Dropdown } from '../../../components'

import styles from './styles.module.css'

function FilterBar({
  type,
  month,
  year,
  hasReleasesInNextMonth,
  prevYear,
  nextYear,
  toPrev,
  toNext,
}) {
  return (
    <div className={styles.Wrapper}>
      <Dropdown
        items={[
          {
            label: 'Кино',
            value: 'films',
          },
          {
            label: 'Игры',
            value: 'games',
          },
        ]}
        defaultSelectedItem={{
          label: type === 'films' ? 'Кино' : 'Игры',
          value: type,
        }}
        onSelect={({ selectedItem }) => {
          Router.push(
            '/[type]/[date]',
            `/${selectedItem.value}/${month.eng}-${year}`,
          )
        }}
      />
      <div className={styles.DateBar}>
        <button type="button" onClick={toPrev} disabled={prevYear < 2020}>
          <img src="/icons/arrow.svg" alt="" />
        </button>
        <div className={styles.Date}>
          <span>{month.rus}</span> {year}
        </div>
        <button
          type="button"
          onClick={toNext}
          disabled={!hasReleasesInNextMonth || nextYear > 2030}
        >
          <img src="/icons/arrow.svg" alt="" />
        </button>
      </div>
    </div>
  )
}

export default FilterBar
