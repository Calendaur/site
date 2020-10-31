import React from 'react'
import { withNextRouter } from 'storybook-addon-next-router'
import Page from 'components-css/Page'

export default { title: 'Page', decorators: [withNextRouter] }

export const page = () => <Page>content</Page>

page.story = {
  parameters: {
    nextRouter: {
      path: '/',
      asPath: '',
      query: {},
    },
  },
}
