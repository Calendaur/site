import React from 'react'
import styled from '@emotion/styled'
import Meta from './Meta'
import Header from './Header'
import Footer from './Footer'

const Section = styled.section`
  display: grid;
  grid-template-columns: 100%;
  width: 100vw;
  min-height: 100vh;

  & > main {
    padding: var(--page-vertical-padding) var(--page-padding);
  }
`

function Page({
  children,
  hasHeader = true,
  hasFooter = true,
  headerProps = {},
  footerProps = {},
}) {
  return (
    <>
      <Meta />
      <Section
        aria-label="page"
        style={{
          gridTemplateRows: `${hasHeader ? 'auto' : ''} 1fr ${
            hasFooter ? 'auto' : ''
          }`,
        }}
      >
        {hasHeader && <Header {...headerProps} />}
        <main role="main" aria-label="content">
          {children}
        </main>
        {hasFooter && <Footer {...footerProps} />}
      </Section>
    </>
  )
}

export default Page
