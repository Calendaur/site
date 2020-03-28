function onAuthListener(firebase, next, fallback) {
  const db = firebase.database()
  const auth = firebase.auth()

  return auth.onAuthStateChanged(authUser => {
    if (authUser) {
      db.ref(`users/${authUser.uid}`)
        .once('value')
        .then(snapshot => {
          const dbUser = snapshot.val()

          let providerData = {}

          if (
            Array.isArray(authUser.providerData) &&
            authUser.providerData[0]
          ) {
            providerData = { ...authUser.providerData[0] }
          }

          authUser = {
            uid: authUser.uid,
            email: authUser.email,
            emailVerified: authUser.emailVerified,
            providerData,
            ...dbUser,
          }

          next(authUser)
        })
    } else {
      fallback()
    }
  })
}

export default onAuthListener
