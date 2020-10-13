import React, { useEffect } from 'react'
import styles from './styles.module.css'

interface Props {
  isShowNav: boolean
  setIsShowNav: (arg: boolean) => void
}

function Float({ isShowNav, setIsShowNav }: Props) {
  useEffect(() => {
    document.body.style.overflow = isShowNav ? 'hidden' : 'inherit'
  }, [isShowNav])

  return (
    <div className={styles.float}>
      <button
        onClick={() => {
          setIsShowNav(!isShowNav)
        }}
      >
        <img
          width="24"
          height="24"
          src={isShowNav ? '/icons/close.svg' : '/icons/menu.svg'}
          alt={isShowNav ? 'Close menu' : 'Open menu'}
        />
      </button>
    </div>
  )
}

export default Float
