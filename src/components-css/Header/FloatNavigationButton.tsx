import React from 'react'

import styles from './styles.module.css'

interface Props {
  isVisibleNavigation: boolean
  toggleNavigation: (arg: boolean) => void
}

function FloatNavigationButton({
  isVisibleNavigation,
  toggleNavigation,
}: Props) {
  return (
    <button
      className={styles.FloatNavigationButton}
      onClick={() => {
        toggleNavigation(!isVisibleNavigation)
      }}
    >
      <img
        width="24"
        height="24"
        src={isVisibleNavigation ? '/icons/close.svg' : '/icons/menu.svg'}
        alt={isVisibleNavigation ? 'Close menu' : 'Open menu'}
      />
    </button>
  )
}

export default FloatNavigationButton
