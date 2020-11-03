import { useRouter } from 'next/router'
import { routes, months, monthsDict } from 'shared/constants'
import { Month, ReleaseType } from 'types/common'

const pagesWithCalendar = new Set([
  '/',
  '/games/[date]',
  '/films/[date]',
  '/series/[date]',
])

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()

export function useParsedUrl(): null | {
  type: ReleaseType
  month: Month
  year: number
  isIndex: boolean
} {
  const { route, query } = useRouter()
  const isIndex = route === routes.HOME

  if (!pagesWithCalendar.has(route)) return null

  const type = (isIndex
    ? ReleaseType.Films
    : route.split('/')[1]) as ReleaseType
  const date = (isIndex
    ? `${months[currentMonth].eng}-${currentYear}`
    : query.date) as string

  const [m, y] = date.split('-')

  return {
    type,
    month: months[monthsDict[m] - 1],
    year: +y,
    isIndex,
  }
}
