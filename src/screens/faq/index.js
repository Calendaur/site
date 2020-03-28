import React from 'react'
import Head from 'next/head'
import { Header, Footer } from '../../components'
import { withRedux } from '../../lib'

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
      <Header />
      <div className={styles.Wrapper}>
        <div>
          <h2 className={styles.Question}>
            Почему я&nbsp;должен пользоваться вашим календарем,
            а&nbsp;не&nbsp;calendar_name?
          </h2>
          <p className={styles.Answer}>
            Потому что мы&nbsp;показываем ТОЛЬКО список выходящих релизов
            в&nbsp;удобном формате, без лишних отвлекающих функций.
            В&nbsp;будущем мы&nbsp;планируем добавить подписки
            на&nbsp;интересующие релизы, настройку календаря под себя,
            интеграцию с&nbsp;афишами для покупки билетов/игры, другие типы
            релизов (цифровые релизы фильмов, сериалы, возможно книги
            и&nbsp;комиксы). Сейчас подобного приложения на&nbsp;рынке нет.
          </p>
        </div>
        <div>
          <h2 className={styles.Question}>Будет ли мобильное приложение?</h2>
          <p className={styles.Answer}>
            Да, будем. Когда? Неизвестно, предположительно к&nbsp;лету,
            а&nbsp;пока вы&nbsp;можете использовать{' '}
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
            Почему в календаре нет release_name?
          </h2>
          <p className={styles.Answer}>
            Все релизы мы&nbsp;заполняем вручную, следовательно{' '}
            <nobr>что-то</nobr> можем элементарно пропустить.{' '}
            <nobr>Какие-то</nobr> малоизвестные релизы мы&nbsp;можем
            не&nbsp;добавить, чтобы не&nbsp;перегружать календарь. Также
            мы&nbsp;не&nbsp;постим слухи, всё, что вы&nbsp;видите
            в&nbsp;календаре имеет официальную дату релиза.
          </p>
        </div>
        <div>
          <h2 className={styles.Question}>
            Будут ли цифровые релизы/сериалы и т.п.?
          </h2>
          <p className={styles.Answer}>
            Будут. Когда? В&nbsp;ближайшие 1&ndash;2&nbsp;месяца.
          </p>
        </div>
        <div>
          <h2 className={styles.Question}>
            У&nbsp;меня есть для вас предложение. Как с&nbsp;вами связаться?
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
            <p>
              <span>Дизайнер:</span>{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://tele.click/jdavydko"
              >
                Роман Давыдко
              </a>
            </p>
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default withRedux(Faq)
