import { fetchJSON } from './helpers'

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/api'

const monthsForAPI = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
}

const currentMonth = new Date().getMonth() + 1
const currentYear = new Date().getFullYear()

export const endpoints = {
  HOMEPAGE_RELEASED: `${API_URL}/movies?date=${currentMonth}-${currentYear}`,
  RELEASES: (type, date) => {
    const [month, year] = date.split('-')
    return `${API_URL}/${type}?date=${monthsForAPI[month]}-${year}`
  },
  RELEASE: id => `${API_URL}/releases/${id}`,
  NOW: `${API_URL}/releases/now`,
  USERS: `${API_URL}/users`,
  TOKENS: `${API_URL}/tokens`,
  PROFILE: `${API_URL}/profile`,
}

/* Releases */
// Possibly type: movies, games, serials
// Date format example: 01-2020
export const homePageReleases = () => fetchJSON(endpoints.HOMEPAGE_RELEASED)
export const releases = (type, date) =>
  fetchJSON(endpoints.RELEASES(type, date))
export const release = id => fetchJSON(endpoints.RELEASE(id))
export const now = () => fetchJSON(endpoints.NOW)

/* Auth */
export const sendConfirmCode = email =>
  fetchJSON(endpoints.USERS, {
    method: 'post',
    body: JSON.stringify({ email }),
  })
export const confirm = (email, code) =>
  fetchJSON(endpoints.TOKENS, {
    method: 'post',
    body: JSON.stringify({ email, otp: code }),
  })
export const logout = () =>
  fetchJSON(endpoints.TOKENS, {
    method: 'delete',
  })
export const me = token =>
  fetchJSON(endpoints.PROFILE, {
    headers: {
      Authorization: token,
    },
  })

export async function fetcher(...args) {
  try {
    const response = await fetch(...args)

    // if the server replies, there's always some data in json
    // if there's a network error, it will throw at the previous line
    const data = await response.json()

    if (response.ok) {
      return data
    }

    const error = new Error(response.statusText)
    error.response = response
    error.data = data
    throw error
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message }
    }
    throw error
  }
}
