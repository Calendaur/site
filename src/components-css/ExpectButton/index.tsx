import React from 'react'
import cx from 'classnames'
import compareAsc from 'date-fns/compareAsc'
import { useExpect } from 'features/releases/use-expect'
import { ReleaseInList } from 'types/common'

import styles from './styles.module.css'

interface Props {
  release: ReleaseInList
  className?: string
}

function ExpectButton({ release, className }: Props) {
  const { expect, isExpected } = useExpect(release)

  const isActual = compareAsc(new Date(), new Date(release.released)) <= 0

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
      className={cx(styles.Button, className)}
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        expect()
      }}
    >
      {renderIcon()}
    </button>
  )
}

export default ExpectButton
