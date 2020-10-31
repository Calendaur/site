import { GetServerSideProps } from 'next'
import TodayScreen from 'screens/today'
import { today } from 'shared/api'
import { releaseAdapter } from 'shared/utils'
import { ReleaseInList } from 'types/common'

interface Props {
  releases: ReleaseInList[]
}

function TodayPage({ releases }: Props) {
  return <TodayScreen releases={releases} />
}

export const getServerSideProps: GetServerSideProps = async () => {
  const releases = await today()

  return {
    props: {
      releases: releases.length
        ? releases.map(release => releaseAdapter(release))
        : [],
    },
  }
}

export default TodayPage
