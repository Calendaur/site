import { useRouter } from 'next/router'
import { months, routes } from 'shared/constants'
import { useParsedUrl } from 'features/releases/use-parsed-url'

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

export function useMonthChanger() {
  const { push } = useRouter()

  const routeData = useParsedUrl()

  if (routeData === null) return null

  const { type, month, year } = routeData

  const date = new Date(year, month.jsNumber, 1)

  const { nextLink, prevLink, nextMonth, prevMonth } = dateCarousel(
    type,
    month.jsNumber,
    year,
  )

  function getDisableNext() {
    if (currentMonth === 10) {
      return nextMonth === 'january'
    }

    if (currentMonth === 11) {
      return nextMonth === 'february'
    }

    return nextMonth === months[currentMonth + 2].eng
  }

  return {
    push,
    date,
    nextLink,
    prevLink,
    nextMonth,
    prevMonth,
    goToday: () => push(routes.TODAY),
    disabledNext: getDisableNext(),
    disabledPrev: month.eng === 'january' && year === 2020,
    year,
  }
}
