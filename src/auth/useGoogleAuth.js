import { useContext } from 'react'
import { FirebaseContext } from '../components'

function useGoogleAuth() {
  const firebase = useContext(FirebaseContext)
  const auth = firebase?.auth()

  const login = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider()

    auth.signInWithPopup(googleProvider)
  }
  const logout = () => {
    auth.signOut()
  }

  return [login, logout]
}

export default useGoogleAuth
