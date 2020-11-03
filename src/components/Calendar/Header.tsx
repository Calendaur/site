import Link from 'next/link'
import { useParsedUrl } from 'features/releases/use-parsed-url'
import { routes } from 'shared/constants'
import Title from '../Title'
import Text from '../Text'

import styles from './styles.module.css'

const currentYear = new Date().getFullYear()

const typesDict = {
  films: 'кино',
  games: 'игр',
  series: 'сериалов',
}

function Header() {
  const routeData = useParsedUrl()

  if (routeData === null) return null

  const title = routeData.isIndex
    ? `Новинки кино за ${routeData.month.rus}`
    : `Новинки ${typesDict[routeData.type]} за ${routeData.month.rus}${
        currentYear === routeData.year ? '' : ` ${routeData.year}`
      }`

  return (
    <div className={styles.Header}>
      <Title>{title}</Title>
      <Text className={styles.HeaderText}>
        У&nbsp;нас есть{' '}
        <Link href={routes.BLOG}>
          <a
            onClick={() => {
              const w = window as any

              w.plausible('Click on blog link on main page')
            }}
          >
            блог
          </a>
        </Link>{' '}
        с&nbsp;авторскими статьями, подборками, рецензиями. Если хотите держать
        руку на&nbsp;пульсе, подписывайтесь на&nbsp;
        <a
          href="https://t.me/released_at"
          target="_blank"
          rel="noopener noreferrer nofollow"
          onClick={() => {
            const w = window as any

            w.plausible('Click on telegram channel on main page')
          }}
        >
          Телеграм&nbsp;канал
        </a>
        , в&nbsp;котором мы&nbsp;публикуем новости
      </Text>
    </div>
  )
}

export default Header
