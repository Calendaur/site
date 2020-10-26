import { useQuery } from 'react-query'
import { get, remove } from 'js-cookie'
import { endpoints, cookies } from 'shared/constants'
import { me } from 'shared/api'

async function fetchUser(url: string, token?: string) {
  if (!token) return

  return me(token).catch(e => {
    console.error(e)

    if (e.response && e.response.status && e.response.status >= 400) {
      remove(cookies.AUTHORIZATION)
    }
  })
}

export function useUser(initial?: any) {
  const token = get(cookies.AUTHORIZATION)
  const { isLoading, error, data } = useQuery(
    [endpoints.PROFILE, token],
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
