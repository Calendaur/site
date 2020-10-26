import React from 'react'
import Head from 'next/head'
import { Title, ChangeLog } from 'components-css'
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

// import React from 'react'
// import Head from 'next/head'
// import styled from '@emotion/styled'
// import { Emoji, A, Button } from 'components'
// import { routes } from 'shared/constants'

// function WhatsNew() {
//   return (
//     <>
//       <Head>
//         <title>Новости сайта Released</title>
//       </Head>
//       <Donate>
//         <p>Поддержите проект материально и ускорьте его развитие</p>
//         <Button
//           as="a"
//           href="https://www.patreon.com/bePatron?u=40325871"
//           data-patreon-widget-type="become-patron-button"
//           target="_blank"
//           rel="noopener noreferrer"
//           primary
//         >
//           <img src="/icons/patreon.svg" alt="Patreon" />
//           Поддержать
//         </Button>
//         <script
//           async
//           src="https://c6.patreon.com/becomePatronButton.bundle.js"
//         ></script>
//       </Donate>
//     </>
//   )
// }

// const Log = styled.article`
//   margin-bottom: var(--vertical-2);

//   a {
//     text-decoration: underline;
//   }

//   & > ul {
//     padding: 0;
//     font-size: 1rem;
//     line-height: 1.2;
//     list-style-type: none;

//     @media (min-width: 768px) {
//       font-size: 1.375rem;
//       line-height: 1.6;
//     }

//     & > li {
//       max-width: 1200px;
//       margin-bottom: 12px;

//       & > img {
//         position: relative;
//         top: 4px;
//         width: 16px;
//         margin: 0 4px;

//         @media (min-width: 768px) {
//           top: 5px;
//           width: 22px;
//           margin: 0 8px;
//         }
//       }
//     }
//   }
// `

// const Title = styled.h2`
//   margin-bottom: var(--vertical-4);
// `

// const Donate = styled.div`
//   margin-bottom: var(--vertical-2);

//   p {
//     margin: 0;
//     margin-bottom: var(--vertical-6);
//   }

//   a {
//     img {
//       width: 16px;
//       height: 16px;
//       margin-right: var(--horizontal-6);
//     }
//   }
// `

// export default WhatsNew
