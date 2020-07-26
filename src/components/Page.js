import React from 'react'
import styled from '@emotion/styled'
import Meta from './Meta'
import Header from './Header'
import Footer from './Footer'

const Section = styled.section`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: ${props =>
    `${props.hasHeader ? 'auto' : ''} 1fr ${props.hasFooter ? 'auto' : ''}`};
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
      <Section aria-label="page" hasHeader={hasHeader} hasFooter={hasFooter}>
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
