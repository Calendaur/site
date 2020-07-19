import fetch from 'isomorphic-unfetch'

export function rusType(type) {
  switch (type) {
    case 'series':
      return 'Сериалы'
    case 'films':
      return 'Кино'
    case 'games':
      return 'Игры'
  }
}

export function getRusReleaseType(type, some = false) {
  switch (type) {
    case 'series':
      return `Сериал${some ? 'ы' : ''}`
    case 'films':
      return 'Кино'
    case 'games':
      return `Игр${some ? 'ы' : 'а'}`
  }
}

export function monthString(monthNum) {
  const monthStr = monthNum.toString()

  return monthStr.length === 1 ? `0${monthStr}` : monthStr
}

export function toApiType(type) {
  switch (type) {
    case 'films':
      return 'movies'
    case 'games':
      return 'games'
    case 'series':
      return 'serials'
  }
}

export function getTypeWithoutS(type) {
  switch (type) {
    case 'films':
      return 'film'
    case 'games':
      return 'game'
    case 'series':
    case 'digital':
      return type
    default:
      break
  }
}

export const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key]
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
    return objectsByKeyValue
  }, {})

async function parse(response) {
  if (response.status === 204 || response.statusText === 'No Content') {
    return {
      success: true,
    }
  }

  const text = await response.text()
  let data
  try {
    data = JSON.parse(text)
  } catch (error) {
    throw error
  }
  if (response.ok) {
    return data
  }
  throw data
}

export function fetchJSON(input, init = {}) {
  return fetch(input, {
    ...init,
    headers: {
      ...(init.headers || {}),
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then(parse)
}
