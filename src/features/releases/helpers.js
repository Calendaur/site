import { addMonths, eachMonthOfInterval, format, isEqual } from 'date-fns'
import { months } from 'shared/constants'

export function generateReleasesPages() {
  const startDate = new Date(2020, 0, 1)
  const endDate = addMonths(new Date(), 2)
  const dates = eachMonthOfInterval({ start: startDate, end: endDate })

  return dates.map(date => ({
    params: { date: format(date, 'LLLL-yyyy').toLowerCase() },
  }))
}

export function getPageData(parsedUrl) {
  function getNextAndPrevDate(currentMonthJSNumber, currentYear) {
    const nextMonthIndex =
      currentMonthJSNumber === 11 ? 0 : currentMonthJSNumber + 1
    const nextYear = nextMonthIndex === 0 ? currentYear + 1 : currentYear

    const prevMonthIndex =
      currentMonthJSNumber === 0 ? 11 : currentMonthJSNumber - 1
    const prevYear = prevMonthIndex === 11 ? currentYear - 1 : currentYear

    return {
      nextMonth: months[nextMonthIndex],
      nextYear,
      prevMonth: months[prevMonthIndex],
      prevYear,
    }
  }

  const { type, month, year } = parsedUrl

  const { prevMonth, prevYear, nextMonth, nextYear } = getNextAndPrevDate(
    month.jsNumber,
    year,
  )

  const prevLink = {
    href: `/${type}/[date]`,
    as: `/${type}/${prevMonth.eng}-${prevYear}`,
  }
  const nextLink = {
    href: `/${type}/[date]`,
    as: `/${type}/${nextMonth.eng}-${nextYear}`,
  }

  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()

  return {
    type,
    month,
    year,
    prevLink,
    nextLink,
    nextMonth,
    prevMonth,
    isCurrentMonth: isEqual(
      new Date(currentYear, currentMonth, 1),
      new Date(year, month.jsNumber, 1),
    ),
    isNextMonth: isEqual(
      addMonths(new Date(currentYear, currentMonth, 1), 1),
      new Date(year, month.jsNumber, 1),
    ),
  }
}

export function typeAdapter(type, toServer, isSingle) {
  switch (type) {
    case 'films':
      return 'movies'
    case 'series':
      return 'serials'
    case 'games':
      return 'games'
  }
}
