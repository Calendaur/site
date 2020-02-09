import React, { useEffect, useRef, useState, useMemo } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import cx from 'classnames'
import { months } from '../../constants/months'
import { useMediaQuery, useDidUpdate } from '../../hooks'

import styles from './Header.module.css'

export function generateHref(type, month, year) {
  return `/${type}/${month.eng}-${year}`
}

export const findMonth = conditionFunc => months.find(conditionFunc)

function Header({ type, month, year }) {
  const currentMonth = month.rus

  const ref = useRef(null)
  const isMobileVersion = useMediaQuery('(max-width: 768px)')
  const [height, setHeight] = useState(0)
  const [visible, setVisible] = useState(true)
  const animationStyle = useMemo(
    () => ({
      top: visible ? 0 : -height,
      background: visible ? 'rgba(15, 32, 39, 0.89)' : 'rgba(15, 32, 39, 0.4)',
    }),
    [height, visible],
  )

  useDidUpdate(() => {
    setHeight(ref.current.clientHeight)
    setVisible(true)
  }, [ref.current?.clientHeight, setHeight, setVisible])

  useEffect(() => {
    let prevScrollPos = window.pageYOffset

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset

      if (prevScrollPos && isMobileVersion) {
        setVisible(prevScrollPos > currentScrollPos)
      }
      prevScrollPos = currentScrollPos
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [setVisible, isMobileVersion])

  const nextMonth =
    month.jsNumber === 11
      ? 'январь'
      : findMonth(m => m.jsNumber === month.jsNumber + 1).rus
  const nextYear = nextMonth === 'январь' ? year + 1 : year

  const prevMonth =
    month.jsNumber === 0
      ? 'декабрь'
      : findMonth(m => m.jsNumber === month.jsNumber - 1).rus
  const prevYear = prevMonth === 'декабрь' ? year - 1 : year

  const releases = useSelector(state => state.releases)

  const hasReleasesInNextMonth =
    releases.filter(
      r =>
        new Date(r.date).getMonth() ===
        findMonth(m => m.rus === nextMonth).jsNumber,
    ).length > 0

  return (
    <header ref={ref} className={styles.Header} style={animationStyle}>
      <div className={styles.Logo}>
        <img src="/images/logo.png" alt="" />
      </div>
      <div className={styles.Date}>
        <Link
          href="/[type]/[date]"
          as={generateHref(
            type,
            findMonth(m => m.rus === prevMonth),
            prevYear,
          )}
        >
          <a
            className={cx(styles.Link, styles.isDate, {
              [styles.isDisable]: prevYear < 2020,
            })}
          >
            ← <span>{prevMonth}</span>
          </a>
        </Link>
        <h1>
          {currentMonth} <span className={styles.Year}>{year}</span>
        </h1>
        <Link
          href="/[type]/[date]"
          as={generateHref(
            type,
            findMonth(m => m.rus === nextMonth),
            nextYear,
          )}
        >
          <a
            className={cx(styles.Link, styles.isDate, {
              [styles.isDisable]: prevYear > 2030 || !hasReleasesInNextMonth,
            })}
          >
            <span>{nextMonth}</span> →
          </a>
        </Link>
      </div>
      <div>
        <Link
          href="/[type]/[date]"
          as={generateHref(
            'films',
            findMonth(m => m.jsNumber === month.jsNumber),
            year,
          )}
        >
          <a
            className={cx(styles.Link, styles.isType, {
              [styles.isActive]: type === 'films',
            })}
          >
            Фильмы
          </a>
        </Link>
        <span className={styles.TypeSeparator}></span>
        <Link
          href="/[type]/[date]"
          as={generateHref(
            'games',
            findMonth(m => m.jsNumber === month.jsNumber),
            year,
          )}
        >
          <a
            className={cx(styles.Link, styles.isType, {
              [styles.isActive]: type === 'games',
            })}
          >
            Игры
          </a>
        </Link>
      </div>
    </header>
  )
}

export default Header
