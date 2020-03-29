import firebase from '../firebase'

function useGoogleAuth() {
  const login = async () => {
    const auth = firebase.auth()
    const db = firebase.database()
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    let token = ''

    try {
      const messaging = firebase.messaging()
      token = await messaging.getToken()
    } catch (e) {
      console.error(e)
    }

    auth.signInWithPopup(googleProvider).then(socialAuthUser =>
      db.ref(`v2/users/${socialAuthUser.user.uid}`).set({
        username: socialAuthUser.user.displayName,
        email: socialAuthUser.user.email,
        notificationToken: token,
      }),
    )
  }
  const logout = () => {
    firebase.auth().signOut()
  }

  return [login, logout]
}

export default useGoogleAuth
