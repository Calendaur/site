import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import cx from 'classnames'
import { UrlDataContext } from '../../core/urlDataContext'
import { getNextAndPrevDate } from '../../core/url'

import styles from './Header.module.css'

const types = [
  {
    type: 'films',
    title: 'Кино',
  },
  {
    type: 'series',
    title: 'Сериалы',
  },
  {
    type: 'games',
    title: 'Игры',
  },
]

function Filter() {
  const urlData = useContext(UrlDataContext)

  if (!urlData) return null

  const currentMonth = new Date().getMonth()

  const { prevMonth, prevYear, nextMonth, nextYear } = getNextAndPrevDate(
    urlData.month.jsNumber,
    urlData.year,
  )

  const prevLink = `/${urlData.type}/${prevMonth.eng}-${prevYear}`
  const nextLink = `/${urlData.type}/${nextMonth.eng}-${nextYear}`

  return (
    <div className={styles.Filter}>
      <div>
        <ul className={styles.ReleaseTypeChooser}>
          {types.map(({ type: t, title }) => (
            <li key={t}>
              <Link
                href={`/${t}/[date]`}
                as={`/${t}/${urlData.month.eng}-${urlData.year}`}
              >
                <a
                  className={cx('underline', {
                    [styles.isActive]: urlData.type === t,
                  })}
                >
                  {title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className={styles.MonthChooser}>
          {currentMonth < urlData.month.jsNumber ? (
            <Link href={`/${urlData.type}/[date]`} as={prevLink}>
              <a className="underline">← текущий месяц</a>
            </Link>
          ) : null}
          <div className={styles.Date}>{urlData.month.rus}</div>
          {currentMonth === urlData.month.jsNumber ? (
            <Link href={`/${urlData.type}/[date]`} as={nextLink}>
              <a className="underline">следующий месяц →</a>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function MobileHeader({ user }) {
  const [visibleNav, toggleNav] = useState(false)
  const { events } = useRouter()

  function closeNav() {
    toggleNav(false)
  }

  useEffect(() => {
    if (visibleNav) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'inherit'
    }
  }, [visibleNav])

  useEffect(() => {
    events.on('routeChangeComplete', closeNav)

    return () => {
      events.off('routeChangeComplete', closeNav)
    }
  }, [events])

  return (
    <div className={styles.MobileHeader}>
      <div className={styles.Float}>
        <button
          className={styles.MenuButton}
          onClick={() => {
            toggleNav(!visibleNav)
          }}
        >
          {visibleNav ? (
            <img src="/icons/close.svg" alt="Close menu" />
          ) : (
            <img src="/icons/menu.svg" alt="Open menu" />
          )}
        </button>
      </div>
      {visibleNav && (
        <nav className={styles.Nav}>
          <div>
            <Link href="/">
              <a className={styles.Logotype} data-text="released">
                released
              </a>
            </Link>
          </div>
          <div className={styles.Links}>
            <Link href="/">
              <a>На главную</a>
            </Link>
            <Link href="/archive">
              <a>Вышедшие релизы</a>
            </Link>
            <Link href="/whats-new">
              <a>Обновления сайта</a>
            </Link>
          </div>
          {user ? (
            <div className={styles.AuthLinks}>
              <Link href="/auth">
                <a>Вход</a>
              </Link>
              <Link href="/auth">
                <a className={styles.Gradient}>Регистрация</a>
              </Link>
            </div>
          ) : (
            <div className={styles.AuthLinks}>
              <Link href="/me">
                <a className={styles.Gradient}>Личный кабинет</a>
              </Link>
            </div>
          )}
          <Filter />
        </nav>
      )}
    </div>
  )
}

export default MobileHeader
