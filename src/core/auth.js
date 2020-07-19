import { createContext, useState, useCallback } from 'react'

export const UserContext = createContext()

export const useUser = initial => {
  const [user, setUser] = useState(initial)

  const updateUser = useCallback(user => {
    setUser(user)
  }, [])

  return {
    user,
    updateUser,
  }
}
