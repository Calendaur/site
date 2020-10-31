import React from 'react'
import { withNextRouter } from 'storybook-addon-next-router'
import Header from '../src/components-css/Header'

export default { title: 'Header', decorators: [withNextRouter] }

export const header = () => <Header />

header.story = {
  parameters: {
    nextRouter: {
      path: '/',
      asPath: '',
      query: {},
    },
  },
}
