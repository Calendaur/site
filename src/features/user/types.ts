import { Platforms } from 'features/releases/types'

interface ExpectedFilms {
  cover: string
  description: string
  director: string
  id: number
  imdb_url: string
  kinopoisk_url: string
  original_title: string
  release_id: number
  released: string
  title: string
  trailer_url: string
  type: 'movie'
}

interface ExpectedGames {
  cover: string
  description: string
  id: number
  platforms: Platforms[]
  rawg_io_fields: {}
  release_id: number
  released: string
  stores: []
  title: string
  trailer_url: string
  type: 'game'
}

interface ExpectedSeries {
  cover: string
  description: string
  director: string
  id: number
  imdb_url: string
  kinopoisk_url: string
  original_title: string
  release_id: number
  released: string
  season: number
  title: string
  trailer_url: string
  type: 'serial'
}

export interface User {
  current_user: {
    email: string
  }
  expected: {
    movies: ExpectedFilms[]
    games: ExpectedGames[]
    serials: ExpectedSeries[]
  }
}
