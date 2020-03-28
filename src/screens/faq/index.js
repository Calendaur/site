import React from 'react'
import { Header, Footer } from '../../components'

import styles from './styles.module.css'

function Faq() {
  return (
    <>
      <Header />
      <main>
        <div>
          <h2 className={styles.Question}>Будем ли мобильное приложение?</h2>
          <p className={styles.Answer}>
            Да, будем. Когда? Неизвестно, предположительно к лету, а пока вы
            можете использовать PWA
          </p>
        </div>
        <div>
          <h2 className={styles.Question}></h2>
          <p className={styles.Answer}></p>
        </div>
        <div>
          <h2 className={styles.Question}></h2>
          <p className={styles.Answer}></p>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Faq
