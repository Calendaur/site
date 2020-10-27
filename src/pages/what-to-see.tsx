
import { GetServerSideProps } from 'next'
import shuffle from 'lodash.shuffle'
import WhatToSeeScreen from 'screens/what-to-see'
import * as api from 'shared/api'
import { Film } from 'types/releases'

interface Props {
  films: Film[]
}

const WhatToSeePage = ({ films }: Props) => {
  return <WhatToSeeScreen films={films} />
}

export const getServerSideProps: GetServerSideProps<{
  films: Film[]
}> = async () => {
  const films: Film[] = await api.films()

  return {
    props: {
      films: shuffle(films),
    },
  }
}

export default WhatToSeePage
