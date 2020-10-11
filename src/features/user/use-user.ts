import useSWR from 'swr'
import Cookies from 'js-cookie'
import { endpoints, cookies } from 'shared/constants'
import { fetchWithToken } from 'shared/utils'
import { User } from './types'

interface UseUser {
  user: User | undefined
  isLoading: boolean
  isError: any
  mutateUser: (data?: any, shouldRevalidate?: boolean) => Promise<any>
  token: string | undefined
  isLoggedIn: boolean
}

export function useUser(initial?: User): UseUser {
  const token = Cookies.get(cookies.AUTHORIZATION)
  const { data, error, mutate } = useSWR<User>(
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
      mutateUser: mutate,
      token: undefined,
      isLoggedIn: false,
    }
  }

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutateUser: mutate,
    token,
    isLoggedIn: Boolean(data),
  }
}
