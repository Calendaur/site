import addMonths from 'date-fns/addMonths'
import eachMonthOfInterval from 'date-fns/eachMonthOfInterval'
import format from 'date-fns/format'
import isEqual from 'date-fns/isEqual'
import startOfMonth from 'date-fns/startOfMonth'
import getDaysInMonth from 'date-fns/getDaysInMonth'
import locale from 'date-fns/locale/ru'
import { months } from 'shared/constants'

export function generateReleasesPages(): { params: { date: string } }[] {
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
    currentMonth: months[currentMonth],
    currentYear,
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

function chunkify(array, chunkSize) {
  const chunks = Array.from(
    { length: Math.ceil(array.length / chunkSize) },
    (_, i) => {
      const start = chunkSize * i

      const chunk = array.slice(start, start + chunkSize)

      if (chunk.length < chunkSize)
        return [...chunk, ...Array.from({ length: chunkSize - chunk.length })]

      return array.slice(start, start + chunkSize)
    },
  )

  return chunks
}

function range(min = 0, max: number) {
  let arr = []

  for (let i = min; i <= max; i++) {
    arr.push(i)
  }

  return arr
}

export function getWeeks(year: number, jsMonthNumber: number) {
  const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

  const date = new Date(Date.UTC(year, jsMonthNumber, 1))
  const daysArray = range(1, getDaysInMonth(date))
  const firstDay = format(startOfMonth(date), 'EEEEEE', { locale })
  const firstDayIndex = daysOfWeek.findIndex(i => i === firstDay)

  return chunkify(
    firstDayIndex === 0
      ? daysArray
      : [...Array.from({ length: firstDayIndex }), ...daysArray],
    7,
  )
}
