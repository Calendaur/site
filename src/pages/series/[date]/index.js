import React from 'react'
import Releases from 'screens/index'
import { getProps } from 'features/releases/next-page-functions'
import { PageDataProvider } from 'features/releases/page-data'

export const config = { amp: 'hybrid' }

function SeriesPage(props) {
  return (
    <PageDataProvider parsedUrl={props.parsedURL}>
      <Releases {...props} />
    </PageDataProvider>
  )
}

export async function getServerSideProps(context) {
  return getProps(context, 'series')
}

export default SeriesPage
