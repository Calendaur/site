import React, { useEffect, useState } from 'react'
import FirebaseContext from '../firebase-context'

export const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

function FirebaseProvider({ features, children }) {
  const [firebase, setFirebase] = useState(null)

  useEffect(() => {
    if (!firebase && typeof window !== 'undefined') {
      const app = import('firebase/app')
      const auth = features.auth ? import('firebase/auth') : null
      const database = features.database ? import('firebase/database') : null
      const firestore = features.firestore ? import('firebase/firestore') : null
      const storage = features.storage ? import('firebase/storage') : null
      const messaging = features.messaging ? import('firebase/messaging') : null
      const functions = features.functions ? import('firebase/functions') : null
      const performance = features.performance
        ? import('firebase/performance')
        : null
      const analytics = features.analytics ? import('firebase/analytics') : null

      Promise.all([
        app,
        auth,
        database,
        firestore,
        storage,
        messaging,
        functions,
        performance,
        analytics,
      ]).then(values => {
        const firebaseInstance = values[0]
        if (!firebaseInstance.apps.length) {
          firebaseInstance.initializeApp(config)

          const messaging = firebaseInstance.messaging()
          messaging
            .requestPermission()
            .then(() => messaging.getToken())
            .then(token => console.log(token))
            .catch(error => {
              console.error('Error Occured.', error)
            })

          messaging.onMessage(payload => {
            console.log('onMessage:', payload)
          })
        }
        setFirebase(firebaseInstance)
      })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseProvider
