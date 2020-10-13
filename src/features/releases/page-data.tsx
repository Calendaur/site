import React, { createContext, useContext } from 'react'
import { Month } from 'types/common'
import { getPageData } from './helpers'
import { ReleaseType } from './types'

type Link = {
  href: string
  as: string
}

const PageDataContext = createContext<{
  type: ReleaseType
  month: Month
  year: number
  currentMonth: Month
  currentYear: number
  isCurrentMonth: boolean
  isNextMonth: boolean
  prevLink: Link
  nextLink: Link
  prevMonth: Month
  nextMonth: Month
}>(null)

export function PageDataProvider({ children, parsedUrl }) {
  return (
    <PageDataContext.Provider value={getPageData(parsedUrl)}>
      {children}
    </PageDataContext.Provider>
  )
}

export function usePageData() {
  const data = useContext(PageDataContext)

  return data
}
