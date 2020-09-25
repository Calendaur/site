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

export interface Film {
  id: number
  release_id: number
  cover: string
  description: string
  director: string
  imdb_url: string
  kinopoisk_url: string
  is_digital: boolean
  is_expected: boolean
  is_premier: boolean
  released: string
  site: string | null
  title: string
}
