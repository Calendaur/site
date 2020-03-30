import format from 'date-fns/format'
import startOfMonth from 'date-fns/startOfMonth'
import firebase from './firebase'

const v2 = firebase.database().ref('v2') // API v2
const endpoints = {
  releases: 'releases',
  backgrounds: 'backgrounds',
  users: 'users',
  subscribers: 'subscribers',
}

const toArray = obj => {
  if (Array.isArray(obj)) return obj

  if (obj && typeof obj === 'object') return Object.values(obj)

  return []
}

export const fetchReleases = () => {
  return v2
    .child(endpoints.releases)
    .once('value')
    .then(snapshot => toArray(snapshot.val()))
}

export const fetchBackgrounds = date => {
  const d = new Date(date)
  return v2
    .child(endpoints.backgrounds)
    .orderByChild('date')
    .startAt(format(startOfMonth(d), 'yyyy-MM-dd'))
    .limitToFirst(3)
    .once('value')
    .then(snapshot => toArray(snapshot.val()))
}

export const fetchSubscribers = () => {
  return v2
    .child(endpoints.subscribers)
    .once('value')
    .then(snapshot => toArray(snapshot.val()))
}
