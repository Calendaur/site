import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import Cookies from 'js-cookie'
import { analyticEvents } from './constants'

async function parse(response) {
  if (response.status === 204 || response.statusText === 'No Content') {
    return
  }

  const text = await response.text()
  let data
  try {
    data = JSON.parse(text)
  } catch (e) {
    console.error(e)
    throw { response, error: e } // eslint-disable-line
  }
  if (response.ok) {
    return data
  }
  throw { response, error: data } // eslint-disable-line
}

export async function fetchJSON(input, init = {}) {
  const response = await fetch(input, {
    ...init,
    headers: {
      ...(init.headers || {}),
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  })
  return parse(response)
}

export async function fetchWithToken(input, init = {}, token) {
  const response = await fetch(input, {
    ...init,
    headers: {
      ...(init.headers || {}),
      'Content-Type': 'application/json',
      Authorization: token || Cookies.get('authorization'),
    },
    credentials: 'same-origin',
  })
  return parse(response)
}

export function redirect(ctx, to) {
  if (ctx.res) {
    ctx.res.writeHead(303, { Location: to })
    ctx.res.end()
  } else {
    Router.replace(to)
  }
}

export const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key]
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
    return objectsByKeyValue
  }, {})

export function range(min = 0, max) {
  let arr = []

  for (let i = min; i <= max; i++) {
    arr.push(i)
  }

  return arr
}

export function getPageUrl(asPath) {
  return `https://released.at${asPath}`
}

export function getCookie(source, name) {
  if (!source) return null

  try {
    const matches = source.match(
      new RegExp(
        '(?:^|; )' +
          name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') +
          '=([^;]*)',
      ),
    )
    return matches ? decodeURIComponent(matches[1]) : null
  } catch (e) {
    console.error(e)
    return null
  }
}

export function getYoutubeId(youtubeUrl) {
  if (!/youtu\.?be/.test(youtubeUrl)) {
    console.error(`Incorrect youtube url: ${youtubeUrl} `)
    return null
  }

  const patterns = [
    /youtu\.be\/([^#&?]{11})/,
    /\?v=([^#&?]{11})/,
    /&v=([^#&?]{11})/,
    /embed\/([^#&?]{11})/,
    /\/v\/([^#&?]{11})/,
  ]

  let id = ''

  patterns.forEach(pattern => {
    if (pattern.test(youtubeUrl)) {
      id = pattern.exec(youtubeUrl)[1]
    }
  })

  return id
}

export function releaseAdapter(release, type) {
  const common = {
    release_id: release.release_id,
    released: release.released,
    cover: release.covers.preview,
    title: release.title,
  }

  if (type === 'films' || (release.type && release.type.includes('film'))) {
    return {
      ...common,
      director: release.director,
      ...(release.foreign_ratings
        ? {
            imdb_rating: release.foreign_ratings.imdb_rating,
            kinopoisk_rating: release.foreign_ratings.kinopoisk_rating,
          }
        : {}),
      type: 'films',
      is_digital: release.is_digital,
    }
  }

  if (type === 'games' || (release.type && release.type.includes('game'))) {
    return {
      ...common,
      platforms: release.platforms,
      type: 'games',
    }
  }

  if (type === 'series' || (release.type && release.type.includes('series'))) {
    return {
      ...common,
      season: release.season,
      ...(release.foreign_ratings
        ? {
            imdb_rating: release.foreign_ratings.imdb_rating,
            kinopoisk_rating: release.foreign_ratings.kinopoisk_rating,
          }
        : {}),
      type: 'series',
    }
  }

  console.error(`I can't prepare release ${release.title}`)

  return release
}

export function releaseWithDetailsAdapter(release) {
  const streamingServices = [
    {
      type: 'netflix',
      icon: '/icons/streaming-services/netflix.svg',
      event: analyticEvents.CLICK_ON_NETFLIX,
      title: 'Netflix',
    },
    {
      type: 'kinopoisk_hd',
      icon: '/icons/streaming-services/kinopoisk-hd.svg',
      event: analyticEvents.CLICK_ON_KINOPOISKHD,
      title: 'Kinopoisk HD',
    },
    {
      type: 'okko',
      icon: '/icons/streaming-services/okko.svg',
      event: analyticEvents.CLICK_ON_OKKO,
      title: 'Okko',
    },
    {
      type: 'amediateka',
      icon: '/icons/streaming-services/amediateka.svg',
      event: analyticEvents.CLICK_ON_AMEDIATEKA,
      title: 'Amediateka',
    },
    {
      type: 'ivi',
      icon: '/icons/streaming-services/ivi.svg',
      event: analyticEvents.CLICK_ON_IVI,
      title: 'ivi',
    },
    {
      type: 'more_tv',
      icon: '/icons/streaming-services/more-tv.svg',
      event: analyticEvents.CLICK_ON_MORETV,
      title: 'more.tv',
    },
    {
      type: 'apple_tv_plus',
      icon: '/icons/streaming-services/apple-tv-plus.svg',
      event: analyticEvents.CLICK_ON_APPLE_TV_PLUS,
      title: 'Apple TV+',
    },
    {
      type: 'amazon_prime',
      icon: '/icons/streaming-services/amazon-prime.svg',
      event: analyticEvents.CLICK_ON_AMAZON_PRIME,
      title: 'Amazon Prime',
    },
    {
      type: 'disney_plus',
      icon: '/icons/streaming-services/disney-plus.svg',
      event: analyticEvents.CLICK_ON_DISNEY_PLUS,
      title: 'Disney+',
    },
    {
      type: 'hulu',
      icon: '/icons/streaming-services/hulu.svg',
      event: analyticEvents.CLICK_ON_HULU,
      title: 'Hulu',
    },
  ]

  const common = {
    id: release.id,
    release_id: release.release_id,
    released: release.released,
    cover: release.covers.default,
    title: release.title,
    trailer: release.trailer_url,
    description: release.description,
    ...(release.related_articles
      ? { related_articles: release.related_articles }
      : {}),
  }

  if (release.type === 'movie') {
    return {
      ...common,
      type: 'films',
      original_title: release.original_title,
      director: release.director,
      kinopoisk_url: release.kinopoisk_url,
      imdb_url: release.imdb_url,
      streaming_services:
        release.streaming_services && release.streaming_services.length > 0
          ? release.streaming_services.map(service => ({
              ...streamingServices.find(ss => ss.type === service.type),
              link: service.link,
            }))
          : [],
      ...(release.foreign_ratings
        ? {
            imdb_rating: release.foreign_ratings.imdb_rating,
            kinopoisk_rating: release.foreign_ratings.kinopoisk_rating,
          }
        : {}),
    }
  }

  if (release.type === 'game') {
    return {
      ...common,
      type: 'games',
      platforms: release.platforms,
      stores: release.stores,
      genres:
        release.rawg_io_fields && release.rawg_io_fields.genres
          ? release.rawg_io_fields.genres.map(genre => genre.name)
          : [],
      ratings: release.rawg_io_fields
        ? release.rawg_io_fields.metacritic_platforms || null
        : null,
    }
  }

  if (release.type === 'serial') {
    return {
      ...common,
      type: 'series',
      season: release.season,
      kinopoisk_url: release.kinopoisk_url,
      imdb_url: release.imdb_url,
      streaming_services:
        release.streaming_services && release.streaming_services.length > 0
          ? release.streaming_services.map(service => ({
              ...streamingServices.find(ss => ss.type === service.type),
              link: service.link,
            }))
          : [],
      ...(release.foreign_ratings
        ? {
            imdb_rating: release.foreign_ratings.imdb_rating,
            kinopoisk_rating: release.foreign_ratings.kinopoisk_rating,
          }
        : {}),
    }
  }

  return release
}
