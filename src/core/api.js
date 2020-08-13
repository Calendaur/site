import Cookies from 'js-cookie'
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
  EXPECT: id => `${API_URL}/releases/${id}/expect`,
}

/* Releases */
// Possibly type: movies, games, serials
// Date format example: 01-2020
export const homePageReleases = () => fetchJSON(endpoints.HOMEPAGE_RELEASED)
export const releases = (type, date) =>
  fetchJSON(endpoints.RELEASES(type, date))
export const release = id => fetchJSON(endpoints.RELEASE(id))
export const now = () => fetchJSON(endpoints.NOW)
export const expect = id =>
  fetchJSON(endpoints.EXPECT(id), {
    method: 'post',
    headers: {
      Authorization: Cookies.get('authorization'),
    },
  })

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

/* User */
export const setPushInfo = ({ endpoint, p256dh, auth }) =>
  fetchJSON(endpoints.PROFILE, {
    method: 'post',
    body: JSON.stringify({
      webpush_endpoint: endpoint,
      webpush_p256dh: p256dh,
      webpush_auth: auth,
    }),
  })
