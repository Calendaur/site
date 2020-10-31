import Head from 'next/head'
import { Title, ChangeLog } from 'components'
import { routes } from 'shared/constants'

const updates = {
  'v9.20': {
    date: new Date('2020-09-01'),
    fixes: [],
    improves: [],
    features: [
      `Сделали <a href="${routes.BLOG}">блог</a> с&nbsp;авторскими статьями`,
      `Сделали <a href="${routes.WHAT_TO_SEE}">тиндер с&nbsp;фильмами</a>`,
      `Добавили <a href="${routes.TODAY}">страницу</a> с сегодняшними релизами`,
    ],
  },
  'v8.20': {
    date: new Date('2020-08-01'),
    fixes: [],
    improves: [
      `Исправили верстку релизов в&nbsp;календаре`,
      `Добавили цены для&nbsp;вышедших релизов`,
    ],
    features: [`Добавили web-push уведомления`],
  },
  'v7.20': {
    date: new Date('2020-07-01'),
    fixes: [
      `Исправили баг перехода на&nbsp;страницу с&nbsp;релизами по&nbsp;прямой ссылке`,
    ],
    improves: [`Улучшили производительность страниц с&nbsp;календарем релизов`],
    features: [
      `Добавили личный кабинет`,
      `Добавили <a href="${routes.ARCHIVE}">архив</a> вышедших релизов`,
      `Добавили цены для&nbsp;игр`,
    ],
  },
  'v6.20': {
    date: new Date('2020-06-01'),
    fixes: [],
    improves: [`Небольшой редизайн`],
    features: [
      `Добавили ссылки на&nbsp;магазины игр (Steam, EGS, GOG, PS Store, Xbox Store, Nintendo Store)`,
    ],
  },
  'v5.20': {
    date: new Date('2020-05-01'),
    fixes: [`Исправили баги, связанные с&nbsp;переходом между страницами`],
    improves: [`Редизайн хэдэра и&nbsp;футэра`],
    features: [`Добавили трейлеры к&nbsp;релизам`],
  },
}

function WhatsNew() {
  return (
    <>
      <Head>
        <title>Обновления проекта</title>
      </Head>
      <div>
        <Title>Обновления проекта</Title>
        <ChangeLog updates={updates} />
      </div>
    </>
  )
}

export default WhatsNew
