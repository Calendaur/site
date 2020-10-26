import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQueryCache, useMutation } from 'react-query'
import { remove } from 'js-cookie'
import compareAsc from 'date-fns/compareAsc'
import { Button, Title, Text } from 'components-css'
import { logout } from 'shared/api'
import { routes, endpoints, cookies } from 'shared/constants'
import { UserProfile, ReleaseInList } from 'types/common'
import ReleasesGrid from './ReleasesGrid'

import styles from './styles.module.css'

function prepareData(
  releases: ReleaseInList[],
): {
  actual: ReleaseInList[]
  nonActual: ReleaseInList[]
} {
  let result = {
    actual: [],
    nonActual: [],
  }

  releases.forEach(release => {
    if (compareAsc(new Date(), new Date(release.released)) <= 0) {
      result.actual.push(release)
    } else {
      result.nonActual.push(release)
    }
  })

  return result
}

interface Props {
  user: UserProfile
}

function Me({ user }: Props) {
  const queryCache = useQueryCache()
  const { push } = useRouter()
  const [signOut] = useMutation(logout, {
    onSuccess: async () => {
      remove(cookies.AUTHORIZATION)
      queryCache.invalidateQueries(endpoints.PROFILE)
      push(routes.HOME)
    },
  })
  const { expected, email } = user

  const films = prepareData(expected.films)
  const games = prepareData(expected.games)
  const series = prepareData(expected.series)

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
          <Title h2>Ожидаемые релизы</Title>
          <ReleasesGrid title="Кино" releases={films.actual} />
          <ReleasesGrid title="Сериалы" releases={series.actual} />
          <ReleasesGrid title="Игры" releases={games.actual} last />
        </section>
      ) : (
        <Text>Нет ожидаемых релизов</Text>
      )}
      {hasNonActual && (
        <section className={styles.Section}>
          <Title h2>Вышедшие релизы</Title>
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
