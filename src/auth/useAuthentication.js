import { useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux'
// import cookie from 'js-cookie'
import { FirebaseContext } from '../components'
import session from './session'
import onAuthListener from './onAuthListener'

function useAuthentication() {
  const dispatch = useDispatch()
  const firebase = useContext(FirebaseContext)
  const { setAuthUser } = session.actions

  useEffect(() => {
    let listener = () => {}

    if (firebase) {
      listener = onAuthListener(
        firebase,
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser))
          // cookie.set('session', authUser ? authUser.uid : '', {
          //   expires: 7 * 24 * 60 * 60 * 1000,
          // })
          dispatch(setAuthUser(authUser))
        },
        () => {
          localStorage.removeItem('authUser')
          // cookie.remove('session')
          dispatch(setAuthUser(null))
        },
      )
    }
    return function cleanup() {
      listener()
    }
  }, [firebase]) // eslint-disable-line react-hooks/exhaustive-deps
}

export default useAuthentication
