import { fetchJSON, fetchWithToken } from './utils'
import { endpoints } from './constants'

/* Releases */
// Possibly type: movies, games, serials
// Date format example: 01-2020
export const homePageReleases = () => fetchJSON(endpoints.HOMEPAGE_RELEASED)
export const releases = (type, date) =>
  fetchJSON(endpoints.RELEASES(type, date))
export const release = id => fetchJSON(endpoints.RELEASE(id))
export const now = () => fetchJSON(endpoints.NOW)
export const expect = id =>
  fetchWithToken(endpoints.EXPECT(id), {
    method: 'post',
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

/* User */
export const me = token => fetchWithToken(endpoints.PROFILE, {}, token)
export const setPushInfo = ({ endpoint, p256dh, auth }) =>
  fetchWithToken(endpoints.PROFILE, {
    method: 'post',
    body: JSON.stringify({
      webpush_endpoint: endpoint,
      webpush_p256dh: p256dh,
      webpush_auth: auth,
      timezone: -(new Date().getTimezoneOffset() / 60),
    }),
  })
