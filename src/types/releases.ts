export enum FRONTEND_RELEASE_TYPES {
  Films = 'films',
  Series = 'series',
  Games = 'games',
}

export enum BACKEND_RELEASE_TYPES {
  Films = 'movies',
  Series = 'serials',
  Games = 'games',
}

export type Month = {
  eng: string
  rus: string
  jsNumber: number
  calendarNumber: number
}

export type ParsedURL = {
  type: FRONTEND_RELEASE_TYPES
  month: Month
  year: number
}

export type ReleaseFromList = {}
