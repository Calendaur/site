import { PropsWithChildren } from 'react'
import { ToastContainer } from 'react-toastify'
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
        <ToastContainer />
      </section>
    </>
  )
}

export default Page
