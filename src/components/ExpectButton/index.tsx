import cx from 'classnames'
import compareAsc from 'date-fns/compareAsc'
import { useExpect } from 'features/releases/use-expect'
import { ReleaseInList, ReleaseWithDetails } from 'types/common'

import styles from './styles.module.css'

interface Props {
  release: ReleaseInList | ReleaseWithDetails
  className?: string
  withText?: boolean
}

function ExpectButton({ release, className, withText = false }: Props) {
  const isActual = compareAsc(new Date(), new Date(release.released)) <= 0
  const { expect, isExpected } = useExpect(release, isActual, styles.Toast)

  function renderIcon() {
    const onOff = isExpected ? 'on' : 'off'

    if (isActual) {
      return (
        <img width="20" height="20" src={`/icons/fire-${onOff}.svg`} alt="" />
      )
    }

    return (
      <img width="20" height="20" src={`/icons/star-${onOff}.svg`} alt="" />
    )
  }

  function renderTooltip() {
    if (isActual) {
      return isExpected ? 'Отписаться от релиза' : 'Следить за релизом'
    }

    return isExpected ? 'Удалить из избранного' : 'Добавить в избранное'
  }

  return (
    <button
      aria-label={renderTooltip()}
      className={cx(
        styles.Button,
        {
          [styles.withText]: withText,
        },
        className,
      )}
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        ;(window as any).plausible('Expect button clicked')
        expect()
      }}
    >
      {renderIcon()} {withText ? renderTooltip() : null}
    </button>
  )
}

export default ExpectButton
