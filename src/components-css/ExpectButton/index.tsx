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
      <img width="16" height="16" src={`/icons/bookmark-${onOff}.svg`} alt="" />
    )
  }

  return (
    <button
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
