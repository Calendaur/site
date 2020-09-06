export const months = [
  { eng: 'january', rus: 'январь', jsNumber: 0, calendarNumber: 1 },
  { eng: 'february', rus: 'февраль', jsNumber: 1, calendarNumber: 2 },
  { eng: 'march', rus: 'март', jsNumber: 2, calendarNumber: 3 },
  { eng: 'april', rus: 'апрель', jsNumber: 3, calendarNumber: 4 },
  { eng: 'may', rus: 'май', jsNumber: 4, calendarNumber: 5 },
  { eng: 'june', rus: 'июнь', jsNumber: 5, calendarNumber: 6 },
  { eng: 'july', rus: 'июль', jsNumber: 6, calendarNumber: 7 },
  { eng: 'august', rus: 'август', jsNumber: 7, calendarNumber: 8 },
  { eng: 'september', rus: 'сентябрь', jsNumber: 8, calendarNumber: 9 },
  { eng: 'october', rus: 'октябрь', jsNumber: 9, calendarNumber: 10 },
  { eng: 'november', rus: 'ноябрь', jsNumber: 10, calendarNumber: 11 },
  { eng: 'december', rus: 'декабрь', jsNumber: 11, calendarNumber: 12 },
]

const isDev = process.env.NODE_ENV === 'development'
const BASE = isDev ? 'http://localhost:3000' : 'https://released.at'
const API_URL = BASE + '/api'

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
  HOMEPAGE_RELEASED: `${API_URL}/films?date=${currentMonth}-${currentYear}`,
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
  POSTS: `${API_URL}/blog_posts`,
  POST: id => `${API_URL}/blog_posts/${id}`,
}

export const routes = {
  HOME: '/',
  AUTH: '/auth',
  WHATS_NEW: '/whats-new',
  ARCHIVE: '/archive',
  RELEASE: '/release',
  FILMS: '/films',
  SERIES: '/series',
  GAMES: '/games',
  ME: '/me',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_OF_USE: '/terms-of-use',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
}

export const IMG_PLACEHOLDER =
  'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

export const cookies = {
  AUTHORIZATION: 'authorization',
  CODE_HAS_BEEN_SENT: 'code_has_been_sent',
  AUTH_ATTEMPTS: 'auth_attempts',
}
