import { useState, useEffect } from 'react'
import onAuthListener from './onAuthListener'

function useAuthorization() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const listener = onAuthListener(
      authUser => {
        if (!Boolean(authUser)) {
          setUser(null)
        } else {
          setUser(authUser)
        }
      },
      () => setUser(null),
    )

    return function cleanup() {
      listener()
    }
  }, []) // eslint-disable-line

  return user
}

export default useAuthorization
