import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { months } from 'shared/constants'

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()

function dateCarousel(type: string, month: number, year: number) {
  const nextMonth = month === 11 ? 'january' : months[month + 1].eng
  const nextYear = nextMonth === 'january' ? year + 1 : year

  const prevMonth = month === 0 ? 'december' : months[month - 1].eng
  const prevYear = prevMonth === 'december' ? year - 1 : year

  return {
    nextMonth,
    prevMonth,
    nextLink: {
      href: `/${type}/[date]`,
      as: `/${type}/${nextMonth}-${nextYear}`,
    },
    prevLink: {
      href: `/${type}/[date]`,
      as: `/${type}/${prevMonth}-${prevYear}`,
    },
  }
}

const pagesWithCalendar = new Set([
  '/',
  '/games/[date]',
  '/films/[date]',
  '/series/[date]',
])

const monthsDict = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
}

export function useDateCarousel() {
  const { route, asPath, push } = useRouter()

  const routeData = useMemo(() => {
    if (!pagesWithCalendar.has(route) || !asPath) return null

    console.log(asPath)

    let [type, date] = asPath.split('/').slice(1)

    if (type === '') {
      type = 'films'
      date = `${months[currentMonth].eng}-${currentYear}`
    }

    console.log(type, date)

    const [engMonth, year] = date.split('-')

    return {
      type,
      month: months[monthsDict[engMonth]],
      year: +year,
    }
  }, [asPath, route])

  if (routeData === null) return

  const { type, month, year } = routeData

  const date = new Date(year, month.jsNumber, 1)

  const { nextLink, prevLink, nextMonth, prevMonth } = dateCarousel(
    type,
    month.jsNumber,
    year,
  )

  return {
    date,
    nextLink,
    prevLink,
    nextMonth,
    prevMonth,
    push,
    disabledNext: nextMonth === months[currentMonth + 2].eng,
    disabledPrev: month.eng === 'january' && year === 2020,
    year,
  }
}
