import Router from 'next/router'
import { isEqual, addMonths } from 'date-fns'

export const months = [
  { eng: 'january', rus: 'январь', jsNumber: 0, calendarNumber: 1 },
  { eng: 'february', rus: 'февраль', jsNumber: 1, calendarNumber: 2 },
  { eng: 'march', rus: 'март', jsNumber: 2, calendarNumber: 3 },
  { eng: 'april', rus: 'апрель', jsNumber: 3, calendarNumber: 4 },
  { eng: 'may', rus: 'май', jsNumber: 4, calendarNumber: 5 },
  { eng: 'june', rus: 'июнь', jsNumber: 5, calendarNumber: 6 },
  { eng: 'july', rus: 'июль', jsNumber: 6, calendarNumber: 7 },
  { eng: 'august', rus: 'август', jsNumber: 7, calendarNumber: 8 },
  { eng: 'september', rus: 'сентябрь', jsNumber: 8, calendarNumber: 9 },
  { eng: 'october', rus: 'октябрь', jsNumber: 9, calendarNumber: 10 },
  { eng: 'november', rus: 'ноябрь', jsNumber: 10, calendarNumber: 11 },
  { eng: 'december', rus: 'декабрь', jsNumber: 11, calendarNumber: 12 },
]

const types = ['films', 'games', 'series']

export function checkUrl(url) {
  if (!url) {
    return {
      isCorrectType: false,
      isCorrectMonth: false,
      isCorrectYear: false,
      isCorrect: false,
    }
  }

  let isCorrectType = false
  let isCorrectMonth = false
  let isCorrectYear = false

  const [, type, monthAndYear] = url.split('/')

  isCorrectType = Boolean(typeof type === 'string' && types.includes(type))

  if (typeof monthAndYear !== 'string') {
    isCorrectMonth = false
    isCorrectYear = false
  } else {
    const [month, year] = monthAndYear.split('-')
    const yearNumber = +year

    isCorrectMonth = Boolean(month && months.find(m => m.eng === month))
    isCorrectYear = Boolean(
      year && year.length === 4 && year.startsWith('20') && yearNumber >= 2020,
    )
  }

  return {
    isCorrectType,
    isCorrectMonth,
    isCorrectYear,
    isCorrect: isCorrectType && isCorrectMonth && isCorrectYear,
  }
}

export function fixUrl(
  incorrectUrl,
  { isCorrectType, isCorrectMonth, isCorrectYear },
) {
  const date = new Date()
  const fallbackType = 'films'
  const fallbackMonth = months.find(m => m.jsNumber === date.getMonth()).eng
  const fallbackYear = date.getFullYear()

  if (!incorrectUrl) return `/${fallbackType}/${fallbackMonth}-${fallbackYear}`

  const [, typeFromUrl, monthAndYearFromUrl] = incorrectUrl.split('/')

  const type = isCorrectType ? typeFromUrl : fallbackType
  const month = isCorrectMonth
    ? monthAndYearFromUrl.split('-')[0]
    : fallbackMonth
  const year = isCorrectYear ? monthAndYearFromUrl.split('-')[1] : fallbackYear

  return `/${type}/${month}-${year}`
}

export function parseUrl(correctUrl) {
  const [, type, monthAndYear] = correctUrl.split('/')
  const [month, year] = monthAndYear.split('-')

  return { type, month: months.find(m => month === m.eng), year: +year }
}

export function redirect(ctx, to) {
  if (ctx.res) {
    ctx.res.writeHead(303, { Location: to })
    ctx.res.end()
  } else {
    Router.replace(to)
  }
}

export function checkFixRedirect(ctx) {
  const url = ctx.asPath || ctx.req.url

  if (url.includes('service-worker')) return

  const { isCorrect, ...rest } = checkUrl(url)

  if (isCorrect) return

  redirect(ctx, fixUrl(url, rest))
}

export function getNextAndPrevDate(currentMonthJSNumber, currentYear) {
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

export function getReleasesPageData(url) {
  const parsedUrl =
    url === '/'
      ? {
          type: 'films',
          month: months[new Date().getMonth()],
          year: new Date().getFullYear(),
        }
      : parseUrl(url)

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
