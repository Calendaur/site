import { PropsWithChildren } from 'react'
import Meta from './Meta'
import Header from '../components-css/Header'
import Footer from './Footer'

function Page({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Meta />
      <section id="page" aria-label="page">
        <Header />
        <main role="main" aria-label="content">
          {children}
        </main>
        <Footer />
      </section>
    </>
  )
}

export default Page
