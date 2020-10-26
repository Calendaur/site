export type Month = {
  eng: string
  rus: string
  jsNumber: number
  calendarNumber: number
}

export enum ReleaseType {
  Films = 'films',
  Games = 'games',
  Series = 'series',
}

export enum BackendReleaseType {
  Films = 'movies',
  Games = 'games',
  Series = 'serials',
}

export enum GamePlatform {
  PC = 'pc',
  PS4 = 'ps_4',
  PS5 = 'ps_5',
  XboxOne = 'xbox_one',
  XboxSeries = 'xbox_series',
  NintendoSwitch = 'nintendo_switch',
}

export type FilmInList = {
  release_id: number
  released: string
  cover: string
  title: string
  type: ReleaseType.Films
  director: string
  imdb_rating: number
  kinopoisk_rating: number
}

export type SeriesInList = {
  release_id: number
  released: string
  cover: string
  title: string
  type: ReleaseType.Series
  season: string
  imdb_rating: number
  kinopoisk_rating: number
}

export type GameInList = {
  release_id: number
  released: string
  cover: string
  title: string
  type: ReleaseType.Games
  platforms: GamePlatform[]
}

export type ReleaseInList = FilmInList | SeriesInList | GameInList

export interface UserProfile {
  email: string
  expected: {
    films: ReleaseInList[]
    series: ReleaseInList[]
    games: ReleaseInList[]
  }
}

export interface UserResponse {
  current_user: {
    email: string
  }
  expected: {
    movies: ReleaseInList[]
    serials: ReleaseInList[]
    games: ReleaseInList[]
  }
}
