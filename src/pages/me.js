import React from 'react'
import MeScreenComponent from '../screens/me'
import { release } from '../core/api'

const MePage = props => <MeScreenComponent {...props} />

MePage.getInitialProps = async () => {
  try {
    const film = await release('18142')
    const game = await release('18175')
    const series = await release('18115')

    return {
      film: { ...film, release_id: '18142' },
      game: { ...game, release_id: '18175' },
      series: { ...series, release_id: '18115' },
    }
  } catch (e) {
    console.error(e)
    return {
      error: 500,
    }
  }
}

export default MePage