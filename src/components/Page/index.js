import React from 'react'
import Meta from '../Meta'
import Header from '../Header'
import Footer from '../Footer'

import styles from './styles.module.css'

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
      <section
        className={styles.Section}
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
      </section>
    </>
  )
}

export default Page
