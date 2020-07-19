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
      film,
      game,
      series,
    }
  } catch (e) {
    console.error(e)
    return {
      error: 500,
    }
  }
}

export default MePage
