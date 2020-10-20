import { useQuery } from 'react-query'
import { get, remove } from 'js-cookie'
import { endpoints, cookies } from 'shared/constants'

async function fetchWithToken() {
  const token = get(cookies.AUTHORIZATION)

  if (!token) return

  return fetch(endpoints.PROFILE, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(res => res.json())
    .catch(() => {
      remove(cookies.AUTHORIZATION)
    })
}

export function useUser() {
  const { isLoading, error, data } = useQuery(
    endpoints.PROFILE,
    fetchWithToken,
    {
      retry: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
  )

  return {
    isLoading,
    error,
    user: data,
    isLoggedIn: !!data,
  }
}
