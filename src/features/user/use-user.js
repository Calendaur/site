import useSWR from 'swr'
import Cookies from 'js-cookie'
import { endpoints, cookies } from 'shared/constants'
import { fetchWithToken } from 'shared/utils'

export function useUser(initial) {
  const token = Cookies.get(cookies.AUTHORIZATION)
  const { data, error, mutate } = useSWR(
    token ? [endpoints.PROFILE, token] : null,
    fetchWithToken,
    initial ? { initialData: initial } : undefined,
  )

  if (token && error && !data) {
    Cookies.remove(cookies.AUTHORIZATION)
  }

  if (!token) {
    return {
      user: undefined,
      isLoading: undefined,
      isError: true,
    }
  }

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutateUser: mutate,
    token,
  }
}
