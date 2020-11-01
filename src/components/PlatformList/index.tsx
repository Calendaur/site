import cx from 'classnames'
import { GamePlatform } from 'types/common'
import Tag from '../Tag'

import styles from './styles.module.css'

const platformDict = {
  [GamePlatform.PC]: {
    title: 'PC',
    color: 'var(--primary-text-color)',
    bgColor: 'var(--pc-color)',
    position: 1,
  },
  [GamePlatform.PS4]: {
    title: 'PS4',
    color: 'var(--primary-text-color)',
    bgColor: 'var(--playstation-color)',
    position: 2,
  },
  [GamePlatform.PS5]: {
    title: 'PS5',
    color: 'var(--primary-text-color)',
    bgColor: 'var(--playstation-color)',
    position: 3,
  },
  [GamePlatform.XboxOne]: {
    title: 'Xbox One',
    color: 'var(--secondary-text-color)',
    bgColor: 'var(--xbox-color)',
    position: 4,
  },
  [GamePlatform.XboxSeries]: {
    title: 'Xbox Series',
    color: 'var(--secondary-text-color)',
    bgColor: 'var(--xbox-color)',
    position: 5,
  },
  [GamePlatform.NintendoSwitch]: {
    title: 'Switch',
    color: 'var(--secondary-text-color)',
    bgColor: 'var( --nintendo-switch-color)',
    position: 6,
  },
}

interface Props {
  className?: string
  platforms: GamePlatform[]
}

function PlatformList({ className, platforms }: Props) {
  const preparedPlatforms = platforms
    .map(platform => platformDict[platform])
    .sort((a, b) => a.position - b.position)

  return (
    <div className={cx(styles.Platforms, className)}>
      {preparedPlatforms.map(({ title, color, bgColor }) => {
        return (
          <Tag key={title} color={color} bgColor={bgColor}>
            {title}
          </Tag>
        )
      })}
    </div>
  )
}

export default PlatformList
