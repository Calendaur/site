import useSWR from 'swr'
import Cookies from 'js-cookie'
import { endpoints } from 'shared/constants'
import { fetchWithToken } from 'shared/utils'

export function useUser(initial?: any) {
  const token = Cookies.get('authorization')
  const { data, error, mutate } = useSWR(
    token ? [endpoints.PROFILE, token] : null,
    fetchWithToken,
    initial ? { initialData: initial } : undefined,
  )

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
