import useSWR from 'swr'
import Cookies from 'js-cookie'
import { endpoints } from 'shared/constants'
import { fetchWithToken } from 'shared/utils'

const token = Cookies.get('authorization')

export function useUser() {
  const { data, error } = useSWR(
    token ? [endpoints.PROFILE, token] : null,
    fetchWithToken,
  )

  if (!token) {
    return {
      user: undefined,
      isLoading: undefined,
      isError: true,
    }
  }

  return {
    user: data && data.current_user,
    isLoading: !error && !data,
    isError: error,
  }
}
