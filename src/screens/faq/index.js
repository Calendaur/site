import React from 'react'
import Head from 'next/head'
import { Header, Footer } from '../../components'

import styles from './styles.module.css'

function Faq() {
  return (
    <>
      <Head>
        <title>Calendaur | F.A.Q.</title>
        <meta
          name="description"
          content="График релизов игр, график релизов кино"
        />
      </Head>
      <Header hasBack />
      <div className={styles.Wrapper}>
        <div>
          <h2 className={styles.Question}>
            Почему я&nbsp;должен пользоваться именно вашим календарем?
          </h2>
          <p className={styles.Answer}>
            Потому что мы&nbsp;показываем только СПИСОК релизов в&nbsp;удобном
            формате, без лишних функций. В&nbsp;будущем планируем добавить
            подписки на&nbsp;интересующие релизы, настройку календаря под себя,
            интеграцию с&nbsp;афишами для покупки билетов/игр, другие типы
            развлечений (цифровые релизы фильмов, возможно, книги
            и&nbsp;комиксы). Сейчас подобного приложения на&nbsp;рынке нет.
          </p>
        </div>
        <div>
          <h2 className={styles.Question}>Будет ли мобильное приложение?</h2>
          <p className={styles.Answer}>
            Да, предположительно к&nbsp;лету, а&nbsp;пока вы&nbsp;можете
            использовать{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://ru.wikipedia.org/wiki/%D0%9F%D1%80%D0%BE%D0%B3%D1%80%D0%B5%D1%81%D1%81%D0%B8%D0%B2%D0%BD%D0%BE%D0%B5_%D0%B2%D0%B5%D0%B1-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5"
            >
              PWA
            </a>
            .
          </p>
        </div>
        <div>
          <h2 className={styles.Question}>
            Почему в&nbsp;календаре нет <nobr>какого-то</nobr> релиза?
          </h2>
          <p className={styles.Answer}>
            Календари заполняются вручную, поэтому <nobr>что-то</nobr>{' '}
            мы&nbsp;можем пропустить, а&nbsp;некоторые нишевые релизы
            не&nbsp;добавляем, чтобы не&nbsp;перегружать календарь.
          </p>
        </div>
        <div>
          <h2 className={styles.Question}>
            У&nbsp;меня есть для вас предложение, как с&nbsp;вами связаться?
          </h2>
          <p className={styles.Answer}>
            <p>
              <span>Эл. почта:</span>{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:deaddinocalendar@gmail.com"
              >
                deaddinocalendar@gmail.com
              </a>
            </p>
            <p>
              <span>Разработчик:</span>{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://tele.click/shashkov0"
              >
                Данил Шашков
              </a>
            </p>
            <p>
              <span>Контент-мейкер:</span>{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://tele.click/YuriyYagupov"
              >
                Юрий Ягупов
              </a>
            </p>
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Faq
