import React from 'react'
import { withNextRouter } from 'storybook-addon-next-router'
import { FilmsSeriesGames } from 'components-css'

export default { title: 'FilmsSeriesGames', decorators: [withNextRouter] }

export const filmsSeriesGames = () => <FilmsSeriesGames />

filmsSeriesGames.story = {
  parameters: {
    nextRouter: {
      path: '/',
      asPath: '',
      query: {},
    },
  },
}
