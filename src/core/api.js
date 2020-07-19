import { fetchJSON } from './helpers'

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/api'

const endpoints = {
  RELEASES: (type, date) => `${API_URL}/${type}?date=${date}`,
  RELEASE: id => `${API_URL}/releases/${id}`,
  NOW: `${API_URL}/releases/now`,
  USERS: `${API_URL}/users`,
  TOKENS: `${API_URL}/tokens`,
  PROFILE: `${API_URL}/profile`,
}

/* Releases */
// Possibly type: movies, games, serials
// Date format example: 01-2020
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
