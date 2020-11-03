import { useParsedUrl } from 'features/releases/use-parsed-url'
import Title from '../Title'

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
    </div>
  )
}

export default Header
