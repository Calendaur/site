import { useEffect } from 'react'
import onAuthListener from './onAuthListener'

function useAuthentication() {
  useEffect(() => {
    const listener = onAuthListener(
      authUser => {
        localStorage.setItem('authUser', JSON.stringify(authUser))
      },
      () => {
        localStorage.removeItem('authUser')
      },
    )
    return function cleanup() {
      listener()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}

export default useAuthentication
