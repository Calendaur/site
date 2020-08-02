import useSWR from 'swr'
import { endpoints } from 'core/api'

export function useUser() {
  const { data, error } = useSWR(endpoints.PROFILE)

  return {
    user: data && data.current_user,
    isLoading: !error && !data,
    isError: error,
  }
}
