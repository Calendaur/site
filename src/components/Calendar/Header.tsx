import { useRouter } from 'next/router'
import { months, monthsDict } from 'shared/constants'
import Title from '../Title'

import styles from './styles.module.css'

const currentMonth = new Date().getMonth()
const currentYear = new Date().getFullYear()

const typesDict = {
  films: 'кино',
  games: 'игр',
  series: 'сериалов',
}

function Header() {
  const { asPath } = useRouter()

  const clearAsPath = asPath.replace('?' + asPath.split('?')[1], '')

  const isIndex = clearAsPath === '/'
  let [, type, date] = clearAsPath.split('/')

  let title = ''

  if (isIndex) {
    type = 'films'
    title = `Новинки кино за ${months[currentMonth].rus}`
  } else {
    const [m, y] = date.split('-')
    const mIndex = monthsDict[m] - 1

    title = `Новинки ${typesDict[type]} за ${months[mIndex].rus}${
      currentYear === +y ? '' : ` ${y}`
    }`
  }

  return (
    <div className={styles.Header}>
      <Title>{title}</Title>
    </div>
  )
}

export default Header
