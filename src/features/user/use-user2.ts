import { useQuery } from 'react-query'
import { get, remove } from 'js-cookie'
import { endpoints, cookies } from 'shared/constants'
import { me } from 'shared/api'
import { UserResponse } from 'types/common'

async function fetchUser() {
  const token = get(cookies.AUTHORIZATION)

  if (!token) return

  return me(token).catch(e => {
    console.error(e)

    if (e.response && e.response.status && e.response.status >= 400) {
      remove(cookies.AUTHORIZATION)
    }
  })
}

export function useUser(initial?: UserResponse) {
  const { isLoading, error, data } = useQuery<UserResponse>(
    endpoints.PROFILE,
    fetchUser,
    {
      retry: false,
      initialData: initial,
    },
  )

  return {
    isLoading,
    error,
    user: data,
    isLoggedIn: !!data,
  }
}
