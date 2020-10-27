import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQueryCache, useMutation } from 'react-query'
import { remove } from 'js-cookie'
import compareAsc from 'date-fns/compareAsc'
import { Button, Title, Text } from 'components-css'
import { useUser } from 'features/user/use-user2'
import { logout } from 'shared/api'
import { releaseAdapter } from 'shared/utils'
import { routes, endpoints, cookies } from 'shared/constants'
import { ReleaseInList } from 'types/common'
import ReleasesGrid from './ReleasesGrid'

import styles from './styles.module.css'

function prepareData(
  releases: ReleaseInList[],
  type: 'films' | 'series' | 'games',
): {
  actual: ReleaseInList[]
  nonActual: ReleaseInList[]
} {
  let result = {
    actual: [],
    nonActual: [],
  }

  releases.forEach(release => {
    const adaptedRelease = releaseAdapter(release, type)

    if (compareAsc(new Date(), new Date(release.released)) <= 0) {
      result.actual.push(adaptedRelease)
    } else {
      result.nonActual.push(adaptedRelease)
    }
  })

  return result
}

function Me() {
  const { user } = useUser()
  const queryCache = useQueryCache()
  const { push } = useRouter()
  const [signOut] = useMutation(logout, {
    onSuccess: async () => {
      remove(cookies.AUTHORIZATION)
      queryCache.invalidateQueries(endpoints.PROFILE)
      push(routes.HOME)
    },
  })
  const {
    current_user: { email },
  } = user

  const expected = {
    films: user.expected.movies,
    series: user.expected.serials,
    games: user.expected.games,
  }

  const films = prepareData(expected.films, 'films')
  const games = prepareData(expected.games, 'games')
  const series = prepareData(expected.series, 'series')

  const hasActual = [...films.actual, games.actual, series.actual].length > 0
  const hasNonActual =
    [...films.nonActual, ...games.nonActual, ...series.nonActual].length > 0

  const noReleases = !hasActual && !hasNonActual

  return (
    <>
      <Head>
        <title>Личный кабинет</title>
      </Head>
      <Title>{email}</Title>
      {noReleases && (
        <Text>
          Сейчас у&nbsp;вас нет ожидаемых релизов. Чтобы их&nbsp;добавить,
          нажмите на&nbsp;кнопку с&nbsp;огнем или с&nbsp;закладкой
          в&nbsp;карточке релиза. В&nbsp;день релиза вы&nbsp;получите
          пуш-уведомление, поэтому не&nbsp;забудьте их&nbsp;включить. Если релиз
          еще не&nbsp;вышел, то&nbsp;он&nbsp;попадет в&nbsp;секцию
          &laquo;Ожидаемые релизы&raquo;, а&nbsp;если уже вышел,
          то&nbsp;в&nbsp;секцию &laquo;Уже вышло&raquo;.
        </Text>
      )}
      {hasActual ? (
        <section className={styles.Section}>
          <Title h2>
            Ожидаемые релизы{' '}
            <img width="24" height="24" src="/icons/fire-on.svg" alt="" />
          </Title>
          <ReleasesGrid title="Кино" releases={films.actual} />
          <ReleasesGrid title="Сериалы" releases={series.actual} />
          <ReleasesGrid title="Игры" releases={games.actual} last />
        </section>
      ) : (
        <Text>Нет ожидаемых релизов</Text>
      )}
      {hasNonActual && (
        <section className={styles.Section}>
          <Title h2>
            Избранное{' '}
            <img width="24" height="24" src="/icons/star-on.svg" alt="" />
          </Title>
          <ReleasesGrid title="Кино" releases={films.nonActual} />
          <ReleasesGrid title="Сериалы" releases={series.nonActual} />
          <ReleasesGrid title="Игры" releases={games.nonActual} last />
        </section>
      )}
      <Button
        secondary
        onClick={() => {
          signOut()
        }}
      >
        Выйти
      </Button>
    </>
  )
}

export default Me
