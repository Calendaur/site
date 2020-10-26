import { useMemo } from 'react'
import { useQueryCache, useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { useUser } from 'features/user/use-user2'
import { endpoints, routes } from 'shared/constants'
import * as api from 'shared/api'

function typeAdapter(type) {
  switch (type) {
    case 'films':
    case 'movie':
    case 'movies':
      return 'movies'
    case 'games':
    case 'game':
      return 'games'
    case 'series':
    case 'serial':
    case 'serials':
      return 'serials'
  }
}

export function useExpect(releaseId, frontendType) {
  const { push } = useRouter()
  const cache = useQueryCache()
  const { user } = useUser()
  const { PROFILE } = endpoints
  const backendType = useMemo(() => typeAdapter(frontendType), [frontendType])

  const [expect] = useMutation(api.expect, {
    onMutate: ({ id }) => {
      cache.cancelQueries(PROFILE)

      const prevValue = cache.getQueryData(PROFILE)

      cache.setQueryData(PROFILE, cachedUser => {
        const releaseIdsSet = new Set(
          cachedUser.expected[backendType].map(i => i.release_id),
        )

        const optimisticResponse = {
          ...cachedUser,
          expected: {
            ...cachedUser.expected,
            [type]: releaseIdsSet.has(id)
              ? cachedUser.expected[type].filter(
                  ({ release_id }) => release_id !== id,
                )
              : [...cachedUser.expected[type], release],
          },
        }

        return optimisticResponse
      })

      return prevValue
    },
    onError: (err, variables, previousValue) =>
      cache.setQueryData(PROFILE, previousValue),
    onSettled: () => {
      cache.invalidateQueries(PROFILE)
    },
  })

  const releaseIdsSet = useMemo(() => {
    return new Set(user.expected[backendType].map(i => i.release_id))
  }, [user, backendType])

  return {
    expect: user ? () => expect({ id: releaseId }) : () => push(routes.SIGN_UP),
    isExpected: user ? releaseIdsSet.has(releaseId) : false,
  }
}
