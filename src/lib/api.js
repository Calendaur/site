import { getDaysInMonth, format } from 'date-fns'

async function fetchDB() {
  const firebase = await import('firebase/app')
  await import('firebase/database')

  try {
    firebase.initializeApp({
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    })
  } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack)
    }
  }

  return firebase.database().ref('v2') // api version
}

class Api {
  constructor() {
    this.db = fetchDB()
  }

  async getDB() {
    return await this.db()
  }

  async getReleases() {
    const snapshot = await (await this.db).child('releases').once('value')
    return Object.values(snapshot.val())
  }

  async getReleasesByDate(date) {
    const snapshot = await (await this.db)
      .child('releases')
      .orderByChild('date')
      .startAt(format(date, 'yyyy-MM-dd'))
      .limitToFirst(getDaysInMonth(date))
      .once('value')
    return Object.values(snapshot.val())
  }

  async getBackgrounds() {
    const snapshot = await (await this.db).child('backgrounds').once('value')
    return Object.values(snapshot.val())
  }
}

const api = new Api()

export default api
