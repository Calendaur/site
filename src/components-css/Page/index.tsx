import React, { PropsWithChildren } from 'react'
import Meta from '../Meta'
import Header from '../Header'
import Footer from '../Footer'

import styles from './styles.module.css'

function Page({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Meta />
      <section className={styles.Page}>
        <Header />
        <main>{children}</main>
        <Footer />
      </section>
    </>
  )
}

export default Page
