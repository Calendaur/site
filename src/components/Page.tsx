import React, { PropsWithChildren } from 'react'
import styled from '@emotion/styled'
import Meta from './Meta'
import Header from './Header'
import Footer from './Footer'

const Section = styled.section`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
  width: 100vw;
  min-height: 100vh;

  & > main {
    padding: var(--page-vertical-padding) var(--page-padding);
  }
`

function Page({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Meta />
      <Section aria-label="page">
        <Header />
        <main role="main" aria-label="content">
          {children}
        </main>
        <Footer />
      </Section>
    </>
  )
}

export default Page
