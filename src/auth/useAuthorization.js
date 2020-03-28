import { useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
import { FirebaseContext } from '../components'
import onAuthListener from './onAuthListener'

function useAuthorization(condition) {
  const firebase = useContext(FirebaseContext)
  const authUser = useSelector(state => state.session.authUser)

  useEffect(() => {
    let listener = () => {}

    if (firebase) {
      listener = onAuthListener(
        firebase,
        authUser => {
          if (!Boolean(authUser)) {
            console.log('unauth')
          }
        },
        () => console.log('unauth'),
      )
    }

    return function cleanup() {
      listener()
    }
  }, [firebase]) // eslint-disable-line

  return authUser
}

export default useAuthorization
