import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import cx from 'classnames'
import { UrlDataContext } from '../../core/urlDataContext'

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

  const {
    type,
    month,
    year,
    isCurrentMonth,
    isNextMonth,
    prevLink,
    nextLink,
    prevMonth,
    nextMonth,
  } = urlData

  return (
    <div className={styles.Filter}>
      <div>
        <ul className={styles.ReleaseTypeChooser}>
          {types.map(({ type: t, title }) => (
            <li key={t}>
              <Link href={`/${t}/[date]`} as={`/${t}/${month.eng}-${year}`}>
                <a
                  className={cx({
                    [styles.isActive]: type === t,
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
          {isNextMonth && (
            <Link {...prevLink}>
              <a>← {prevMonth.rus}</a>
            </Link>
          )}
          <div className={styles.Date}>{urlData.month.rus}</div>
          {isCurrentMonth && (
            <Link {...nextLink}>
              <a>{nextMonth.rus} →</a>
            </Link>
          )}
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
          {!user ? (
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
