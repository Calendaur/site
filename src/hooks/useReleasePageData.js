import { useContext } from 'react'
import { ReleasePageDataContext } from 'core/providers'

export function useReleasePageData() {
  const data = useContext(ReleasePageDataContext)

  return data
}
