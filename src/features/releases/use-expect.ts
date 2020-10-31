import { useMemo } from 'react'
import { useQueryCache, useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { toast, Slide } from 'react-toastify'
import { useUser } from 'features/user/use-user'
import { endpoints, routes } from 'shared/constants'
import * as api from 'shared/api'
import {
  UserResponse,
  ReleaseType,
  BackendReleaseType,
  ReleaseInList,
  ReleaseWithDetails,
} from 'types/common'

function typeAdapter(type: ReleaseType): BackendReleaseType {
  switch (type) {
    case ReleaseType.Films:
      return BackendReleaseType.Films
    case ReleaseType.Games:
      return BackendReleaseType.Games
    case ReleaseType.Series:
      return BackendReleaseType.Series
  }
}

export function useExpect(
  release: ReleaseInList | ReleaseWithDetails,
  isActual: boolean,
  toastClassName: string,
) {
  const { push } = useRouter()
  const cache = useQueryCache()
  const { user } = useUser()
  const { PROFILE } = endpoints
  const backendType = typeAdapter(release.type)

  const [expect] = useMutation(api.expect, {
    onMutate: ({ id }) => {
      cache.cancelQueries(PROFILE)

      const prevValue = cache.getQueryData(PROFILE)

      cache.setQueryData(PROFILE, (cachedUser: UserResponse) => {
        const releaseIdsSet = new Set(
          cachedUser.expected[backendType].map(i => i.release_id),
        )

        const optimisticResponse = {
          ...cachedUser,
          expected: {
            ...cachedUser.expected,
            [backendType]: releaseIdsSet.has(id)
              ? cachedUser.expected[backendType].filter(
                  ({ release_id }) => release_id !== id,
                )
              : [...cachedUser.expected[backendType], release],
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
    if (!user) return new Set()

    return new Set(user.expected[backendType].map(i => i.release_id))
  }, [user, backendType])

  const isExpected = user ? releaseIdsSet.has(release.release_id) : false

  return {
    expect: user
      ? () => {
          function toastMessage() {
            if (isActual) {
              return isExpected
                ? `Вы отписались от «${release.title}»`
                : `Вы подписались на «${release.title}»`
            }

            return isExpected
              ? `Вы удалили «${release.title}» из избранного`
              : `Вы добавили «${release.title}» в избранное`
          }

          expect({ id: release.release_id })
          toast(toastMessage(), {
            autoClose: 2400,
            className: toastClassName,
            transition: Slide,
          })
        }
      : () => push(routes.SIGN_UP),
    isExpected,
  }
}
